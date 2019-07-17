import React, { Component } from 'react';
import { Modal, Form, Button, Col, Row, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getCategories } from '../publics/redux/actions/category'
import { postBook } from '../publics/redux/actions/book'
import { getLocation } from '../publics/redux/actions/location';
import { getStatus } from '../publics/redux/actions/status';

import book from '../data/books';

import swal from 'sweetalert2'
class ModalForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            locations: [],
            statuss: [],
            books: [],

            title: '',
            writer: '',
            image: '',
            description: '',
            locationid: 1,
            categoryid: 1,
            statusid: 1,

            value: 'coconut',
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount = async () => {
        await this.props.dispatch(getCategories())
        await this.props.dispatch(getLocation())
        await this.props.dispatch(getStatus())
        this.setState({
            categories: this.props.category,
            locations: this.props.location,
            statuss: this.props.status
        })
    }

    addBook = async (title, writer, image, description, locationid, categoryid, statusid) => {
        await this.props.dispatch(postBook(title, writer, image, description, locationid, categoryid, statusid))
        this.setState({
            books: this.props.book
        })
        await swal.fire({
            title: 'Add Book',
            type: 'success',
            text: 'Data added successfully!',
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
        const { title, writer, image, description, locationid, categoryid, statusid, categories, locations, statuss, setShow, show } = this.state
        const cat = categories.categoryList
        const loc = locations.locationList
        const stat = statuss.statusList
        console.log(cat, loc, stat)

        console.log(this.state.description)
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-title-vcenter">
                        Add Data
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle" as={Row}>
                            <Form.Label column sm="2">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control name="title" placeholder="Title..." onChange={this.handleInputChange} value={title} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">Writer</Form.Label>
                            <Col sm="10">
                                <Form.Control name="writer" placeholder="Writer..." onChange={this.handleInputChange} value={writer} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formUrlImage">
                            <Form.Label column sm="2">Url Image</Form.Label>
                            <Col sm="10">
                                <Form.Control name="image" placeholder="Url Image..." onChange={this.handleInputChange} value={image} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formDescription" as={Row}>
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control name="description" as="textarea" rows="3" placeholder="Description..." onChange={this.handleInputChange} value={description} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formLocationid" as={Row}>
                            <Form.Label column sm="2">Location</Form.Label>
                            <Col sm="10">
                                <select name="locationid" value={locationid} onChange={this.handleInputChange}>
                                    {
                                        loc && loc.result.length > 0 && loc.result.map((item, key) => {
                                            return (
                                                <option value={item.locationid}>{item.location}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formCategoryid" as={Row}>
                            <Form.Label column sm="2">Category</Form.Label>
                            <Col sm="10">
                                <select name="categoryid" value={categoryid} onChange={this.handleInputChange}>
                                    {
                                        cat && cat.result.length > 0 && cat.result.map((item, key) => {
                                            return (
                                                <option value={item.categoryid}>{item.category}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formStatusid" as={Row}>
                            <Form.Label column sm="2">Status</Form.Label>
                            <Col sm="10">
                                <select name="statusid" value={statusid} onChange={this.handleInputChange}>
                                    {
                                        stat && stat.result.length > 0 && stat.result.map((item, key) => {
                                            return (
                                                <option value={item.statusid}>{item.status}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>
                        <Button style={{
                            backgroundColor: '#F4CF5D', float: 'right', border: 'none', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', width: '90px',
                            height: '40px',
                        }} onClick={() => {
                            this.addBook(this.state.title, this.state.writer, this.state.image, this.state.description, this.state.locationid, this.state.categoryid, this.state.statusid)
                        }}>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}
const mapStateToProps = state => {
    return {
        category: state.category,
        location: state.location,
        status: state.status,
        book: state.book
    };
};
export default connect(mapStateToProps)(ModalForm)