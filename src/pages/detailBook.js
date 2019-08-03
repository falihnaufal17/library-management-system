import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailBook, deleteBook } from '../publics/redux/actions/book';
import 'bootstrap/dist/css/bootstrap.min.css'
import ModalLoaning from '../components/modalLoaning'

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import ModalUpdate from '../components/modalUpdate';

const localdata = JSON.parse(localStorage.getItem('data')) || ''
class DetailBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalDeleteShow: false,
            modalEditShow: false,
            modalLoanShow: false,
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

        await Swal.fire({
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
            textIndent: '1.5em',
            textAlign: 'justify',

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

        function text(text) {
            if (text.length > 34) {
                let textSplit = text.substr(0, 30)
                return `${textSplit} \n`
            } else {
                let textSplit = text
                return `${textSplit}`
            }
        }

        function validateText(str) {
            var tarea = str;
            if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
                // do something here
                return false
            } else {
                return true
            }
        }

        console.log(typeof list)

        let modalClose = () => this.setState({
            modalEditShow: false,
            modalLoanShow: false,
        });
        return (
            <div>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '454px',
                    left: '0px',
                    top: '0px',

                    backgroundImage: `url(${validateText(list ? list.image : '') ? `https://api-libraryku.herokuapp.com/${list ? list.image : ''}` : list ? list.image : ''})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                    {
                        localdata.namerole === 'admin'
                            ?
                            <div>
                                <div
                                    style={btnEdit}
                                    onClick={() => this.setState({ modalEditShow: true })}
                                >Edit</div>
                                <ModalUpdate
                                    show={this.state.modalEditShow}
                                    onHide={modalClose}
                                    data={list}
                                />

                                <Link to={'/'}>
                                    <div
                                        onClick={this.deleteBook.bind(this)}
                                        style={btnDelete}
                                    >Delete</div>
                                </Link>
                            </div>
                            :
                            ''
                    }


                    <div style={{
                        position: 'absolute',
                        width: '200px',
                        height: '288.81px',
                        left: '1100px',
                        top: '253px',

                        background: `url(${validateText(list ? list.image : '') ? `https://api-libraryku.herokuapp.com/${list ? list.image : ''}` : list ? list.image : ''})`,
                        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
                        borderRadius: '15px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        objectFit: 'cover'
                    }} />

                    <div>
                        <h1 style={titleBook}>{text(list ? list.title : '')}</h1>
                        <p style={date}>{formatDate(list ? list.updated_at : '')}</p>

                        <p className="badge badge-primary"
                            style={{
                                position: 'absolute',
                                width: 'auto',
                                height: 'auto',
                                left: '109px',
                                top: '580px',

                                fontFamily: 'Open Sans',
                                fontStyle: 'normal',
                                fontSize: '14px',
                                lineHeight: '27px',

                                color: '#ffffff',
                            }}>{list ? list.category : ''}</p>

                        <p className="badge badge-secondary"
                            style={{
                                position: 'absolute',
                                width: 'auto',
                                height: 'auto',
                                left: '205px',
                                top: '580px',

                                fontFamily: 'Open Sans',
                                fontStyle: 'normal',
                                fontSize: '14px',
                                lineHeight: '27px',

                                color: '#ffffff',
                            }}>{list ? list.location : ''}</p>

                        <p className="badge badge-success"
                            style={{
                                position: 'absolute',
                                width: 'auto',
                                height: 'auto',
                                left: '290px',
                                top: '580px',

                                fontFamily: 'Open Sans',
                                fontStyle: 'normal',
                                fontSize: '14px',
                                lineHeight: '27px',

                                color: '#ffffff',
                            }}>{list ? list.status : ''}</p>
                        {
                            localdata.namerole === 'admin' ?
                                <button
                                    className="btn btn-outline-success btn-sm"
                                    style={{
                                        position: 'absolute',
                                        width: 'auto',
                                        height: 'auto',
                                        left: '865px',
                                        top: '575px',

                                        fontFamily: 'Open Sans',
                                        fontStyle: 'normal',
                                        fontSize: '14px',
                                        lineHeight: '27px',
                                    }}
                                    onClick={() => {
                                        this.setState({ modalLoanShow: true })
                                    }} disabled={list ? list.status === 'Tidak Tersedia' : 'Tersedia'}>
                                    Pinjam
                                </button>
                                :
                                localdata.namerole === 'user' && localdata.isverify === 'true' ?
                                    <button
                                        className="btn btn-outline-success btn-sm"
                                        style={{
                                            position: 'absolute',
                                            width: 'auto',
                                            height: 'auto',
                                            left: '865px',
                                            top: '575px',

                                            fontFamily: 'Open Sans',
                                            fontStyle: 'normal',
                                            fontSize: '14px',
                                            lineHeight: '27px',
                                        }}
                                        onClick={() => {
                                            this.setState({ modalLoanShow: true })
                                        }} disabled={list ? list.status === 'Tidak Tersedia' : 'Tersedia'}>
                                        Pinjam
                                    </button>
                                    :
                                    localdata.namerole === 'user' && localdata.isverify === 'false' ?
                                        <p style={{
                                            position: 'absolute',
                                            width: 'auto',
                                            height: 'auto',
                                            left: '650px',
                                            top: '575px',
                                            fontWeight: 'bold',
                                            color: '#ff5555',

                                            fontFamily: 'Open Sans',
                                            fontStyle: 'normal',
                                            fontSize: '14px',
                                            lineHeight: '27px',
                                        }}>Akun belum diverifikasi! Silahkan hubungi admin!</p>
                                        :
                                        ''
                        }

                        <ModalLoaning
                            show={this.state.modalLoanShow}
                            onHide={modalClose}
                            data={list}
                        />
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