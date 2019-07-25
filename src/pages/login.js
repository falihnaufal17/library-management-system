import React, { Component } from 'react';
import { Form, Button, Card, Navbar, Nav } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../publics/redux/actions/user'
import Swal from 'sweetalert2';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userList: [],
            email: '',
            password: '',

            value: ''

        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    login = async (data) => {
        if (this.state.email === '' || this.state.password === '') {
            await Swal.fire({
                type: 'warning',
                title: 'Login Failed',
                text: 'Please fill data correctly!'
            })
        } else if (!this.state.email === data.email || !this.state.password === data.password) {
            await Swal.fire({
                type: 'warning',
                title: 'Login Failed',
                text: 'Wrong email or password!'
            })
        } else {
            await this.props.dispatch(login(data))
            this.setState({
                users: this.props.user
            })
        }
    }

    handleInputChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }
    render() {
        const { email, password } = this.state

        let data = {
            email: email,
            password: password
        }
        return (
            <div>
                <Card className="mt-3" style={{ margin: 'auto', width: '50%' }}>
                    <Card.Header>
                        <Card.Title>Login Form</Card.Title>
                        <Card.Subtitle>Fill the blank form below</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter email..." name="email" value={email} onChange={this.handleInputChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" placeholder="Password..." name="password" value={password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Button variant="success" onClick={() => {
                                this.login(data)
                            }}>
                                Login!
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Login)