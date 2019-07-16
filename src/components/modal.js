import React, { Component } from 'react';
import { Modal, Form, Button, Col, Row, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux'
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
            statuss: []
        }
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

    render() {
        const { categories, locations, statuss } = this.state
        const cat = categories.categoryList
        const loc = locations.locationList
        const stat = statuss.statusList
        console.log(cat, loc, stat)
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
                                <Form.Control placeholder="Title..." />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formWriter" as={Row}>
                            <Form.Label column sm="2">Writer</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Writer..." />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formUrlImage">
                            <Form.Label column sm="2">Url Image</Form.Label>
                            <Col sm="10">
                                <Form.Control placeholder="Url Image..." />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formDescription" as={Row}>
                            <Form.Label column sm="2">Description</Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" rows="3" placeholder="Description..." />
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formLocationid" as={Row}>
                            <Form.Label column sm="2">Location</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select">
                                    {
                                        loc && loc.result.length > 0 && loc.result.map((item, key) => {
                                            return (
                                                <option key={key}>{item.location}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formCategoryid" as={Row}>
                            <Form.Label column sm="2">Category</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select">
                                    {
                                        cat && cat.result.length > 0 && cat.result.map((item, key) => {
                                            return (
                                                <option key={key}>{item.category}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group controlId="formStatusid" as={Row}>
                            <Form.Label column sm="2">Status</Form.Label>
                            <Col sm="10">
                                <Form.Control as="select">
                                    {
                                        stat && stat.result.length > 0 && stat.result.map((item, key) => {
                                            return (
                                                <option key={key}>{item.status}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Button style={{
                            backgroundColor: '#F4CF5D', float: 'right', border: 'none', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)', width: '90px',
                            height: '40px',
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
        status: state.status
    };
};
export default connect(mapStateToProps)(ModalForm)