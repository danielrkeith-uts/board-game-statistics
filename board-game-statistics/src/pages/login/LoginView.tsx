import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap"

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container fluid>
            <h1 className="mb-3 text-center">Login</h1>
            <Form>
                <Form.Group className="mb-3" controlId="loginForm.email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="loginForm.password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button type="submit">Log in</Button>
            </Form>
        </Container>
    )
}

export { LoginView }