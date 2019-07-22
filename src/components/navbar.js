import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar className="shadow" bg="light">
                    <Navbar.Brand><Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold', fontSize: '30px' }}>Library</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link><Link to="/login" style={{ color: '#000000', textDecoration: 'none' }}>Login</Link></Nav.Link>
                            <Nav.Link><Link to="/register" style={{ color: '#000000', textDecoration: 'none' }}>Register</Link></Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link><Link to="/loaning" style={{ color: '#000000', textDecoration: 'none' }}>Loan List</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation;