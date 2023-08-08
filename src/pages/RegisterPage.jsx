import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import BrandExample from "../components/Navbar";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // your Register logic here
    if (email === "user@example.com" && password === "password") {
      console.log("Logged in successfully");
      setShowError(false);
    } else {
      console.log("Register failed");
      setShowError(true);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <h2 className="text-center">Register</h2>
            {showError && (
              <Alert variant="danger">Invalid email or password.</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="text-center m-3">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
