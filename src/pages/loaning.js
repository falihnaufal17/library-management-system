import React, { Component } from 'react'
import Navbar from '../components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
export default class Loaning extends Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div class="container-fluid" style={{marginTop: "100px"}}>

                    <h1>Loaning Page</h1>
                    <table class="table table-bordered table-info">
                        <tr>
                            <th>Title</th>
                            <th>ID Card</th>
                            <th>Name</th>
                            <th>Expired Date</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}