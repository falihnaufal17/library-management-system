import React, { Component } from 'react';
import { Modal, Form, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux'

import { getCategories } from '../publics/redux/actions/category'
import {detailBook, updateBook } from '../publics/redux/actions/book'
import { getLocation } from '../publics/redux/actions/location';
import { getStatus } from '../publics/redux/actions/status';

import { Link } from 'react-router-dom'

import swal from 'sweetalert2'

class ModalUpdate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            locations: [],
            statuss: [],
            books: [],
            title: this.props.book.bookList.title,
            writer: this.props.book.bookList.writer,
            image: this.props.book.bookList.image,
            description: this.props.book.bookList.description,
            locationid: this.props.book.bookList.locationid,
            categoryid: this.props.book.bookList.categoryid,
            statusid: this.props.book.bookList.statusid,

            value: '',
        }

        this.updateBook = this.updateBook.bind(this)
    }

    componentDidMount = async () => {
        await this.props.dispatch(detailBook(this.props.data ? this.props.data.bookid : ''))
        await this.props.dispatch(getCategories())
        await this.props.dispatch(getLocation())
        await this.props.dispatch(getStatus())
        this.setState({
            categories: this.props.category,
            locations: this.props.location,
            statuss: this.props.status,
            books: this.props.book.bookList,
        })
    }

    handleChange = (e) => {
        const name = e.currentTarget.name
        const val = e.currentTarget.value
        this.state.books[name] = val

        this.setState({
            books: this.state.books
        })
    }

    updateBook = async (bookid, data) => {
        await this.props.dispatch(updateBook(bookid, data))

        await swal.fire({
            type: 'success',
            title: 'Update Book',
            text: 'Book updated successfully!'
        })

        this.setState({
            books: this.props.book
        })
    }

    render() {
        const { locationid, categoryid, statusid, categories, locations, statuss, books } = this.state

        const cat = categories.categoryList
        const loc = locations.locationList
        const stat = statuss.statusList
        const list = books.bookList

        console.log(cat, loc, stat, list)
        const bookid = this.state.books.bookid
        let data = {
            title: this.state.books.title,
            writer: this.state.books.writer,
            image: this.state.books.image,
            description: this.state.books.description,
            locationid: this.state.books.locationid,
            categoryid: this.state.books.categoryid,
            statusid: this.state.books.statusid
        }

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-title-vcenter">
                        Update Data
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle" as={Row}>
                            <Form.Label column sm="2">Title</Form.Label>
                            <Col sm="10">
                                <Form.Control name="title" placeholder="Title..." value={this.state.books.title} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">Writer</Form.Label>
                            <Col sm="10">
                                <Form.Control name="writer" placeholder="Writer..." value={this.state.books.writer} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formUrlImage">
                            <Form.Label column sm="2">Url Image</Form.Label>
                            <Col sm="10">
                                <Form.Control name="image" placeholder="Url Image..." value={this.state.books.image} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formDescription" as={Row}>
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control name="description" as="textarea" rows="3" placeholder="Description..." value={this.state.books.description} onChange={this.handleChange} />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formLocationid" as={Row}>
                            <Form.Label column sm="2">Location</Form.Label>
                            <Col sm="10">
                                <select name="locationid" value={locationid} onChange={this.handleChange}>
                                    {
                                        loc && loc.result.length > 0 && loc.result.map((item, key) => {
                                            return (
                                                <option key={key} value={item.locationid}>{item.location}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formCategoryid" as={Row}>
                            <Form.Label column sm="2">Category</Form.Label>
                            <Col sm="10">
                                <select name="categoryid" value={categoryid} onChange={this.handleChange}
                                >
                                    {
                                        cat && cat.result.length > 0 && cat.result.map((item, key) => {
                                            return (
                                                <option key={key} value={item.categoryid}>{item.category}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formStatusid" as={Row}>
                            <Form.Label column sm="2">Status</Form.Label>
                            <Col sm="10">
                                <select name="statusid" value={statusid} onChange={this.handleChange}>
                                    {
                                        stat && stat.result.length > 0 && stat.result.map((item, key) => {
                                            return (
                                                <option key={key} value={item.statusid}>{item.status}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Form.Group>

                        <Link to={'/'}>
                        <Button style={{
                            backgroundColor: '#F4CF5D', float: 'right', border: 'none', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', width: '90px',
                            height: '40px',
                        }} onClick={() => { this.updateBook(bookid, data) }}>
                            Save
                        </Button>
                        </Link>
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
export default connect(mapStateToProps)(ModalUpdate)