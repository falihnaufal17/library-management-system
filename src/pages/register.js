import React, { Component } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

import { connect } from 'react-redux'
import { register } from '../publics/redux/actions/user'

import Swal from 'sweetalert2';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            id_card: '',
            name: '',
            email: '',
            password: '',
            role: 2,

            value: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    register = async (data) => {
        if (this.state.id_card === '' || this.state.name === '' || this.state.email === '' || this.state.password === '') {
            Swal.fire({
                title: 'Register Failed!',
                type: 'warning',
                text: 'Please fill the form correctly!'
            })
            this.setState({
                id_card: '',
                name: '',
                email: '',
                password: '',
            })
        } else {
            await this.props.dispatch(register(data)).then(() => {
                Swal.fire({
                    title: 'Register User',
                    type: 'success',
                    text: 'Registration Successfully!'
                })
                this.setState({
                    users: this.props.user,
                    id_card: '',
                    name: '',
                    email: '',
                    password: '',
                })
            })
                .catch(() => {
                    Swal.fire({
                        title: 'Registration Failed',
                        type: 'warning',
                        text: 'Email sudah terdaftar!'
                    })
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
        const { id_card, name, email, password, role } = this.state

        let data = {
            id_card: id_card,
            name: name,
            email: email,
            password: password,
            idrole: role
        }
        return (
            <div>
                <Card className="mt-3" style={{ margin: 'auto', width: '50%' }}>
                    <Card.Header>
                        <Card.Title>Register Form</Card.Title>
                        <Card.Subtitle>Fill the blank form below</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>ID Card:</Form.Label>
                                <Form.Control type="Text" name="id_card" placeholder="Enter id card... (number)" value={id_card} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control type="Text" placeholder="Enter name..."
                                    name="name" value={name} onChange={this.handleInputChange} />
                            </Form.Group>
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
                            <input type="hidden" value={role} />
                            <Button variant="success" onClick={() => {
                                this.register(data)
                            }}>
                                Register!
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

export default connect(mapStateToProps)(Register)