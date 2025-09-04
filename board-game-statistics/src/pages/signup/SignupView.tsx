import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { apiCreateAccount, apiLogin } from "../../utils/api/account-api-utils";

const SignupView = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [hasError, setHasError] = useState(false);

  const signup = () => {
    if (password !== confirm) {
      setHasError(true);
      setConfirm("");
      return;
    }

    apiCreateAccount(email, firstName, lastName, password).then((created) => {
      if (created) {
        apiLogin(email, password).then((isLoggedIn) => {
          if (isLoggedIn) {
            window.location.replace("/");
          } else {
            setHasError(true);
          }
        });
      } else {
        setHasError(true);
        setPassword("");
        setConfirm("");
      }
    });
  };

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    setHasError(false);
    signup();
  };

  return (
    <Container fluid>
      <h1 className="mb-3 text-center">Create account</h1>
      <Form onSubmit={handleSubmission}>
        <Form.Group className="mb-3" controlId="signupForm.email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setHasError(false);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupForm.firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            placeholder="Ray"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              setHasError(false);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupForm.lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            placeholder="Kinjo"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setHasError(false);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupForm.password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setHasError(false);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="signupForm.confirm">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={confirm}
            onChange={(e) => {
              setConfirm(e.target.value);
              setHasError(false);
            }}
          />
        </Form.Group>

        {hasError && (
          <p className="text-danger">
            Couldn’t create account. Check your details and try again.
          </p>
        )}

        <Button type="submit">Sign up</Button>
      </Form>
    </Container>
  );
};

export default SignupView;
