import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { connect } from 'react-redux'
import { getLoan, updateLoan } from '../publics/redux/actions/loan'
import { getBooks } from '../publics/redux/actions/book'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import ModalLoan from '../components/modalAdminLoan';
let getToken = localStorage.token
let iduser = localStorage.number
class Loaning extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loans: [],
            books: [],
            bookid: 0,
            id_card: 0,
            name: '',
            modalLoanShow: false,
        }

        this.updateLoan = this.updateLoan.bind(this)
    }

    componentDidMount = async () => {
        await this.props.dispatch(getLoan(getToken, iduser))
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

        let modalClose = () => this.setState({
            modalLoanShow: false,
        });

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
                <div class="container-fluid mt-5">
                    <h1 className="float-left">Loaning Page</h1>
                    <button className="btn btn-outline-success float-right btn-md" onClick={() => {
                        this.setState({ modalLoanShow: true })
                    }}>
                        Add Loan
                    </button>

                    <ModalLoan
                        show={this.state.modalLoanShow}
                        onHide={modalClose}
                    />

                    <table className="table table-bordered table-striped">
                        <tr>
                            <th>Title</th>
                            <th>ID Card</th>
                            <th>Name</th>
                            <th>Created At</th>
                            <th>Expired Date</th>
                            <th>Forfeit</th>
                            <th>Is Verify</th>
                            <th>Action</th>
                        </tr>
                        {
                            list &&
                            list.length > 0 &&
                            list.map((item, key) => {
                                let tgl = new Date()
                                let hitung = 0
                                let tanggal = tgl.getDate()
                                let bulan = tgl.getMonth() + 1
                                let expired = item.expired_date.split('-')
                                let jmlHari = 0

                                if (parseInt(bulan) > parseInt(expired[1])) {
                                    hitung += (parseInt(bulan) - parseInt(expired[1])) * 5000 * 30
                                    jmlHari += (parseInt(bulan) - parseInt(expired[1]) * 30)
                                } else if (parseInt(bulan) === parseInt(expired[1]) && parseInt(tanggal) > parseInt(expired[2])) {
                                    hitung += (parseInt(tanggal) - parseInt(expired[2])) * 5000
                                    jmlHari += parseInt(tanggal) - parseInt(expired[2])

                                }

                                let data = {
                                    bookid: item.bookid,
                                    id_card: item.id_card,
                                    forfeit: hitung
                                }
                                return (
                                    <tr key={key}>
                                        <td>{item.title}</td>
                                        <td>{item.id_card}</td>
                                        <td>{item.name}</td>
                                        <td>{formatDate(item.created_at)}</td>
                                        <td>{formatDate(item.expired_date)}</td>
                                        <td>{item.forfeit}</td>
                                        <td>{item.isverify}</td>
                                        <td>
                                            <Link to={`/loaning/verify/${item.loaningid}`}>
                                                <button className="btn btn-success" disabled={item ? item.isverify === "true" : "false"} onClick={() => { this.updateLoan(item.loaningid, data) }}>Verify</button>
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