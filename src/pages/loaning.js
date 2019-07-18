import React, { Component } from 'react'
import Navbar from '../components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

import { connect } from 'react-redux'
import { getLoan, updateLoan } from '../publics/redux/actions/loan'
import { getBooks } from '../publics/redux/actions/book'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
class Loaning extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loans: [],
            books: [],
            bookid: 0,
            id_card: 0,
            name: ''
        }

        this.updateLoan = this.updateLoan.bind(this)
    }

    componentDidMount = async () => {
        await this.props.dispatch(getLoan())
        await this.props.dispatch(getBooks())
        this.setState({
            loans: this.props.loan,
            books: this.props.book
        })
    }

    updateLoan = async (loaningid, data) => {
        await this.props.dispatch(updateLoan(loaningid, data))
        this.setState({
            loans: this.props.loan
        })

        Swal.fire({
            type: 'success',
            title: 'Verify Loan',
            text: 'Book returned success!'
        })
    }

    render() {

        const { loans, books } = this.state
        const listbook = books.bookList
        const list = loans.loanList
        console.log(list, listbook)
        function formatDate(date) {
            let data = Date.parse(date);
            let newDate = new Date(data);
            let day = newDate.getDate();
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let month = months[newDate.getMonth()];
            let year = newDate.getFullYear();
            return `${day} ${month} ${year}`
        }
        return (
            <div>
                <Navbar></Navbar>
                <div class="container-fluid" style={{ marginTop: "100px" }}>

                    <h1>Loaning Page</h1>
                    <table className="table table-bordered table-striped">
                        <tr>
                            <th>Title</th>
                            <th>ID Card</th>
                            <th>Name</th>
                            <th>Expired Date</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                        {
                            list &&
                            list.length > 0 &&
                            list.map((item, key) => {
                                let status = listbook && listbook.result.length > 0 && listbook.result.find(itm => itm.bookid === item.bookid)
                                let data = {
                                    bookid: item.bookid,
                                    id_card: item.id_card,
                                    name: item.name
                                }
                                return (
                                    <tr key={key}>
                                        <td>{item.title}</td>
                                        <td>{item.id_card}</td>
                                        <td>{item.name}</td>
                                        <td>{formatDate(item.expired_date)}</td>
                                        <td>{formatDate(item.created_at)}</td>
                                        <td>
                                            <Link to={`/loaning/verify/${item.loaningid}`}>
                                                <button className="btn btn-success" disabled={status ? status.status === "Tersedia" : "Tidak Tersedia"} onClick={() => { this.updateLoan(item.loaningid, data) }}>Verify</button>
                                            </Link></td>
                                    </tr>
                                )
                            })
                        }
                    </table>
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

export default connect(mapStateToProps)(Loaning)