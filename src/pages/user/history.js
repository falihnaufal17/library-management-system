import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

import { connect } from 'react-redux'
class History extends Component {

    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h1>History Loan</h1>
                    <div class="container-fluid" style={{ marginTop: "100px" }}>
                        <table className="table table-bordered table-striped">
                            <tr>
                                <th>Title</th>
                                <th>ID Card</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Expired Date</th>
                                <th>Forfeit</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loan: state.loan,
        book: state.book
    }
}

export default connect(mapStateToProps)(History)