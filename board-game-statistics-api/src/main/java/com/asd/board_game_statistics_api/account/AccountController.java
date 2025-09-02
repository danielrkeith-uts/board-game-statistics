package com.asd.board_game_statistics_api.account;

import com.asd.board_game_statistics_api.account.dto.LoginRequest;
import com.asd.board_game_statistics_api.account.dto.CreateAccountRequest;
import com.asd.board_game_statistics_api.account.dto.MeResponse;
import com.asd.board_game_statistics_api.account.dto.UpdateAccountRequest;
import com.asd.board_game_statistics_api.account.dto.ChangePasswordRequest;
import com.asd.board_game_statistics_api.model.Account;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private IAccountService accountService;

    @PostMapping("/create")
    public ResponseEntity<?> createAccount(@RequestBody CreateAccountRequest createAccountRequest) {
        accountService.createAccount(createAccountRequest.email(), createAccountRequest.password(), createAccountRequest.firstName(), createAccountRequest.lastName());
        return ResponseEntity.ok("Account created");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password());

        Authentication authentication = authenticationManager.authenticate(authToken);

        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authentication);
        SecurityContextHolder.setContext(context);

        request.getSession(true)
                .setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, context);

        return ResponseEntity.ok("Login successful");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok("Logged out");
    }

    @GetMapping("/me")
    public ResponseEntity<MeResponse> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        Account account = accountService.account(userDetails.getUsername());
        return ResponseEntity.ok(new MeResponse(account.firstName(), account.lastName(), account.email()));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAccount(@RequestBody UpdateAccountRequest updateRequest, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            accountService.updateAccount(userDetails.getUsername(), updateRequest.firstName(), updateRequest.lastName(), updateRequest.email());
            return ResponseEntity.ok("Account updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to update account: " + e.getMessage());
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest, @AuthenticationPrincipal UserDetails userDetails) {
        try {
            accountService.changePassword(userDetails.getUsername(), changePasswordRequest.currentPassword(), changePasswordRequest.newPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to change password: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@AuthenticationPrincipal UserDetails userDetails, HttpServletRequest request) {
        try {
            accountService.deleteAccount(userDetails.getUsername());
            request.getSession().invalidate();
            SecurityContextHolder.clearContext();
            return ResponseEntity.ok("Account deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete account: " + e.getMessage());
        }
    }

}