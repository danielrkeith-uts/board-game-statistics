import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap"
import { apiLogin } from "../../utils/api/account-api-utils";

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [hasInvalidCridentials, setHasInvalidCridentials] = useState(false);

    const login = () => {
        apiLogin(email, password).then(isLoggedIn => {
            if (isLoggedIn) {
                window.location.replace("/");
            } else {
                setHasInvalidCridentials(true);
                setPassword("");
            }
        })
    }

    const handleSubmission = (event: React.FormEvent) => {
        event.preventDefault();
        login()
    }

    return (
        <Container fluid>
            <h1 className="mb-3 text-center">Login</h1>
            <Form onSubmit={handleSubmission}>
                <Form.Group className="mb-3" controlId="loginForm.email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => {
                        setEmail(e.target.value);
                        setHasInvalidCridentials(false);
                    }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginForm.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value);
                        setHasInvalidCridentials(false);
                    }}/>
                </Form.Group>
                {hasInvalidCridentials && (
                    <p className="text-danger">Invalid login cridentials</p>
                )}
                <Button type="submit">Log in</Button>
            </Form>
        </Container>
    )
}

export default LoginView;