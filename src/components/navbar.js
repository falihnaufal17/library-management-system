import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { logout } from '../publics/redux/actions/user';
import { connect } from 'react-redux';
let iduser = localStorage.number
class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
        }
        this.logout = this.logout.bind(this)
    }

    logout = async () => {
        await this.props.dispatch(logout(iduser))
        this.setState({
            users: this.props.user
        })
    }

    render() {
        return (
            <div>
                {
                    this.props.userid && this.props.role === 'admin'
                        ?
                        <Navbar className="shadow" bg="light">
                            <Navbar.Brand><Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold', fontSize: '30px' }}>Library</Link></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <NavDropdown title={this.props.username} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => {
                                            this.logout()
                                        }}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                <Nav className="ml-auto">
                                    <Nav.Link><Link to="/loaning" style={{ color: '#000000', textDecoration: 'none' }}>Loan List</Link></Nav.Link>
                                    <Nav.Link><Link to="/userlist" style={{ color: '#000000', textDecoration: 'none' }}>User List</Link></Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        :
                        this.props.userid && this.props.role === 'user'
                            ?
                            <Navbar className="shadow" bg="light">
                                <Navbar.Brand><Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold', fontSize: '30px' }}>Library</Link></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <NavDropdown title={this.props.username} id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={() => {
                                                this.logout()
                                            }
                                            }>Logout</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    <Nav className="ml-auto">
                                        <Nav.Link><Link to={`/history/${iduser}`}>History Loan</Link></Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            :
                            <Navbar className="shadow" bg="light">
                                <Navbar.Brand><Link to="/" style={{ color: '#000000', textDecoration: 'none', fontWeight: 'bold', fontSize: '30px' }}>Library</Link></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="ml-auto">
                                        <Nav.Link><Link to="/login" style={{ color: '#000000', textDecoration: 'none' }}>Login</Link></Nav.Link>
                                        <Nav.Link><Link to="/register" style={{ color: '#000000', textDecoration: 'none' }}>Register</Link></Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                }

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps)(Navigation);