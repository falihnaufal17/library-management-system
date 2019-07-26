import React, { Component } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'

import { addLoan, getLoan } from '../publics/redux/actions/loan'
import { getUsers } from '../publics/redux/actions/user'
import { getBookByStatus } from '../publics/redux/actions/book'

import swal from 'sweetalert2'
import { type } from 'os';
const localdata = JSON.parse(localStorage.getItem('data')) || ''
let getToken = localStorage.token
let iduser = localStorage.number
class ModalAdminLoan extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loans: [],
            books: [],
            users: [],
            bookid: 0,
            id_card: 0,

            value: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentDidMount = async () => {
        // await this.props.dispatch(getLoan(getToken, iduser))
        await this.props.dispatch(getBookByStatus())
        await this.props.dispatch(getUsers(getToken, iduser))
        this.setState({
            // loans: this.props.loan,
            books: this.props.book,
            users: this.props.user
        })
    }

    addLoan = async (data) => {
        await this.props.dispatch(addLoan(data))
        await swal.fire({
            title: 'Add Loan',
            type: 'success',
            text: 'Add loan successfully!'
        })
        await this.setState({
            books: this.props.book
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

    render() {
        const { loans, books, users, bookid, id_card } = this.state
        // const listloan = loans.loanList
        const listbook = books.bookList
        const listuser = users.userList
        console.log(listbook, listuser)

        let data = {
            bookid: bookid,
            id_card: id_card,
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
                                <select name="bookid" className="form-control" value={bookid} onChange={this.handleInputChange}>
                                    {
                                        listbook && listbook.result.length > 0 && listbook.result.map((item, key) => {
                                            return (
                                                <option key={key} value={item.bookid}>{item.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">Member</Form.Label>
                            <Col sm="10">
                                <select name="id_card" className="form-control" value={id_card} onChange={this.handleInputChange}>
                                    {
                                        listuser && listuser.length > 0 && listuser.map((item, key) => {
                                            return (
                                                <option key={key} value={item.iduser}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">Catatan:</Form.Label>
                            <Col sm="10">
                                <Form.Label>Masa berlaku peminjaman buku 5 hari setelah lebih dari 5 hari maka akan dikenakan denda sebesar Rp. 5000 berturut-turut</Form.Label>
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
        // loan: state.loan,
        book: state.book,
        user: state.user
    }
}
export default connect(mapStateToProps)(ModalAdminLoan)