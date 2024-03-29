import React, { Component } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'

import { addLoan, getLoan } from '../publics/redux/actions/loan'

import swal from 'sweetalert2'
const localdata = JSON.parse(localStorage.getItem('data')) || ''
class ModalLoaning extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loans: [],
            bookid: 0,
            id_card: 0,
            name: '',
            value: 'coconut',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addLoan = this.addLoan.bind(this)
    }

    componentDidMount = async () => {
        await this.props.dispatch((getLoan()))
        this.setState({
            loans: this.props.loan
        })
    }

    addLoan = async (data) => {
        await this.props.dispatch(addLoan(data))

        await swal.fire({
            title: 'Add loans',
            type: 'success',
            text: 'Data added successfully!'
        })

        this.setState({
            loans: this.props.loan
        })


    }

    handleInputChange(e) {
        const target = e.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value,
        })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        const { loans, bookid } = this.state
        let list = loans.loanList
        console.log(list)

        let data = {
            bookid: this.props.data ? this.props.data.bookid : '',
            id_card: localdata.iduser,
            forfeit: 0,
            isverify: 0,
        }

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-title-vcenter">
                        Add loaning
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle" as={Row}>
                            <Form.Label column sm="2">Title Book</Form.Label>
                            <Col sm="10">
                                <ul className="list-unstyled">
                                    <li value={bookid}>{this.props.data ? this.props.data.title : ''}</li>
                                </ul>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">ID Card</Form.Label>
                            <Col sm="10">
                                <ul className="list-unstyled">
                                    <li>{localdata.id_card}</li>
                                </ul>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formUrlImage">
                            <Form.Label column sm="2">Name</Form.Label>
                            <Col sm="10">
                                <ul className="list-unstyled">
                                    <li>{localdata.name}</li>
                                </ul>
                            </Col>
                        </Form.Group>

                        <Button style={{
                            backgroundColor: '#F4CF5D', float: 'right', border: 'none', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', width: '90px',
                            height: '40px',
                        }} onClick={() => { this.addLoan(data) }}>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal >
        )
    }
}
const mapStateToProps = state => {
    return {
        loan: state.loan
    };
};
export default connect(mapStateToProps)(ModalLoaning)