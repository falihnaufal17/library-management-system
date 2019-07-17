import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailBook, deleteBook } from '../publics/redux/actions/book';

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

class DetailBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalDeleteShow: false,
            modalEditShow: false,
            books: [],
        };
    }

    componentDidMount = async () => {
        await this.props.dispatch(detailBook(this.props.match.params.bookid))
        this.setState({
            books: this.props.book
        })
    }

    deleteBook = async () => {

        await this.props.dispatch(deleteBook(this.props.match.params.bookid))
        this.setState({
            books: this.props.book
        })
        Swal.fire({
            type: 'success',
            title: 'Berhasil menghapus',
            text: `Data berhasil dihapus`
        })
    }

    render() {

        const { books } = this.state

        const list = books.bookList
        console.log(list)

        const titleBook = {
            position: 'absolute',
            width: '',
            height: '114px',
            left: '104px',
            top: '478px',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '50px',
            lineHeight: '68px',

            color: '#000000'
        }

        const date = {
            position: 'absolute',
            width: '414px',
            height: '58px',
            left: '109px',
            top: '543px',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '20px',
            lineHeight: '27px',

            color: '#000000',
        }

        const description = {
            position: 'absolute',
            width: '824px',
            height: '342px',
            left: '104px',
            top: '632px',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '20px',
            lineHeight: '27px',

            color: '#000000',
        }

        const btnEdit = {
            position: 'absolute',
            width: '61px',
            height: '45px',
            left: '48px',
            top: '37px',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '30px',
            lineHeight: '41px',

            cursor: 'pointer',
            color: '#FFFFFF',
        }

        const btnDelete = {
            position: 'absolute',
            width: '314px',
            height: '82px',
            left: '128px',
            top: '37px',

            fontFamily: 'Open Sans',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '30px',
            lineHeight: '41px',

            cursor: 'pointer',
            color: '#FFFFFF',
        }
        function formatDate(date) {
            let data = Date.parse(date);
            let newDate = new Date(data);
            let day = newDate.getDate();
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let month = months[newDate.getMonth()];
            let year = newDate.getFullYear();
            return `${day} ${month} ${year}`
        }

        console.log(typeof list)

        return (
            <div>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '454px',
                    left: '0px',
                    top: '0px',

                    backgroundImage: `url(${list ? list.image : ''})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                    <div
                        style={btnEdit}
                        onClick={() => this.setState({ modalEditShow: true })}
                    >Edit</div>

                    <Link to={'/'} onClick={this.deleteBook.bind(this)}>
                        <div

                            style={btnDelete}
                        >Delete</div>
                    </Link>

                    <div style={{
                        position: 'absolute',
                        width: '200px',
                        height: '288.81px',
                        left: '1100px',
                        top: '253px',

                        background: `url(${list ? list.image : ''})`,
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
                        borderRadius: '15px',
                        backgroundSize: 'cover'
                    }} />

                    <div>
                        <h1 style={titleBook}>{list ? list.title : ''}</h1>
                        <p style={date}>{formatDate(list ? list.updated_at : '')}</p>
                    </div>
                    <div>
                        <p style={description}>
                            {list ? list.description : ''}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        book: state.book,
    };
};
export default connect(mapStateToProps)(DetailBook);