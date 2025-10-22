package com.asd.board_game_statistics_api.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @GetMapping("/hello-world")
    public String helloWorld() {
        return "Hello, world!";
    }

    @GetMapping("/admin/hello-world")
    public String adminHelloWorld() {
        return "Hello, admin!";
    }

}
