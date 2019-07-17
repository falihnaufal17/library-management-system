import React, { Component } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { connect } from 'react-redux'

// import { getCategories } from '../publics/redux/actions/category'
// import { postBook, getBooks } from '../publics/redux/actions/book'
// import { getLocation } from '../publics/redux/actions/location';
// import { getStatus } from '../publics/redux/actions/status';

// import swal from 'sweetalert2'
class ModalLoaning extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'coconut',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // componentDidMount = async () => {

    // }

    // addBook = async (title, writer, image, description, locationid, categoryid, statusid) => {
    //     await this.props.dispatch(postBook(title, writer, image, description, locationid, categoryid, statusid))
    //     this.setState({
    //         books: this.props.book
    //     })
    //     await swal.fire({
    //         title: 'Add Book',
    //         type: 'success',
    //         text: 'Data added successfully!',
    //     })
    // }

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
                                <select>
                                    <option>ini judul</option>
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">ID Card</Form.Label>
                            <Col sm="10">
                                <Form.Control name="id_card" placeholder="Writer..." onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formUrlImage">
                            <Form.Label column sm="2">Name</Form.Label>
                            <Col sm="10">
                                <Form.Control name="name" placeholder="Url Image..." onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formDescription" as={Row}>
                            <Form.Label column sm="2">Expired Date</Form.Label>
                            <Col sm="10">
                                <input type="date" rows="3" placeholder="Description..." onChange={this.handleInputChange} className="form-control"/>
                            </Col>
                        </Form.Group>

                        <Button style={{
                            backgroundColor: '#F4CF5D', float: 'right', border: 'none', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', width: '90px',
                            height: '40px',
                        }}>
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
// const mapStateToProps = state => {
//     return {
//         category: state.category,
//         location: state.location,
//         status: state.status,
//         book: state.book
//     };
// };
export default ModalLoaning