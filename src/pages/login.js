import React, { Component } from 'react';
import { Form, Button, Card, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <div>
                <Navbar className="shadow" bg="light">
                    <Navbar.Brand><Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold', fontSize: '30px' }}>Library</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link><Link to="/login" style={{ color: '#000000', textDecoration: 'none'}}>Login</Link></Nav.Link>
                            <Nav.Link><Link to="/register" style={{ color: '#000000', textDecoration: 'none'}}>Register</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Card className="mt-3" style={{ margin: 'auto', width: '50%' }}>
                    <Card.Header>
                        <Card.Title>Login Form</Card.Title>
                        <Card.Subtitle>Fill the blank form below</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email..." />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password..." />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login!
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}