import React, { Component } from 'react'
import Navbar from '../../components/navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import { historyLoan } from '../../publics/redux/actions/loan'
import { getBooks } from '../../publics/redux/actions/book'
import { connect } from 'react-redux'
import { Card } from 'react-bootstrap';
let iduser = localStorage.number
const localdata = JSON.parse(localStorage.getItem('data'))
class History extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loans: [],
            books: [],
            bookid: 0,
            id_card: 0,
            name: ''
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(historyLoan(iduser))
        await this.props.dispatch(getBooks())
        this.setState({
            loans: this.props.loan,
            books: this.props.book
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
                <div className="container mt-5">
                    <h1>History Loan</h1>
                    <Card className=" w-50 mt-3 shadow-sm">
                        <Card.Header>
                            <Card.Title style={{ textTransform: 'capitalize' }}>{localdata.name} Detail</Card.Title>
                            <Card.Subtitle>
                                {localdata.status
                                    ?
                                    <div className="badge badge-secondary">Offline</div>
                                    :
                                    <div className="badge badge-success ">Online</div>
                                }
                            </Card.Subtitle>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>Email : {localdata.email}</Card.Text>

                        </Card.Body>
                    </Card>
                    <div class="container-fluid mt-5">
                        <table className="table table-striped">
                            <tr>
                                <th>Title</th>
                                <th>Created At</th>
                                <th>Expired Date</th>
                                <th>Forfeit</th>
                                <th>Is Return</th>
                            </tr>
                            {
                                list &&
                                    list.length > 0 ?
                                    list.map((item, key) => {
                                        return (
                                            <tr>
                                                <td>{item.title}</td>
                                                <td>{formatDate(item.created_at)}</td>
                                                <td>{formatDate(item.expired_date)}</td>
                                                <td>{item.forfeit}</td>
                                                <td>{item.isverify}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <tr>
                                        <td colSpan="7" align="center">Kamu belum meminjam buku</td>
                                    </tr>

                            }

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