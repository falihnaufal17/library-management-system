import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks, searchBook } from '../publics/redux/actions/book';
import ModalForm from '../components/modal';
import { Link } from 'react-router-dom';

let getToken = localStorage.token
let iduser = localStorage.number
const localdata = JSON.parse(localStorage.getItem('data')) || ''
class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            books: [],
            resultSearch: [],
            search: ''
        };

        this.searchBook = this.searchBook.bind(this)
        // this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount = async () => {

        await this.props.dispatch(getBooks())
        this.setState({
            books: this.props.book
        })
    }

    searchBook = async (search) => {
        await this.props.dispatch(searchBook(search))
        this.setState({
            resultSearch: this.props.book
        })
    }

    render() {
        function text(text) {
            if (text.length > 34) {
                let textSplit = text.substr(0, 30)
                return `${textSplit} ...`
            } else {
                let textSplit = text
                return `${textSplit}`
            }
        }
        const { books, search, resultSearch } = this.state
        const result = resultSearch.bookList
        const list = books.bookList
        console.log(list, result)

        let modalClose = () => this.setState({ modalShow: false });
        const searchBar = {
            position: 'absolute',
            width: '70%',
            height: '60px',
            left: '200px',
            top: '140px',
            padding: '14px 40px',
            fontSize: '18px',

            border: 'none',
            background: '#FFFFFF',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
            borderRadius: '50px',
        }

        const container = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 0
        }

        const btnAdd = {
            position: 'absolute',
            width: '90px',
            height: '40px',
            left: '1120px',
            top: '250px',
            border: 'none',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',

            background: '#F4CF5D',
            borderRadius: '10px',
            color: '#FFFFFF',
            cursor: 'pointer'

        }

        const flexContainer = {
            display: 'flex',
            flexWrap: 'wrap',
            marginLeft: '90px',
            marginTop: '340px'
        }

        const card = {
            width: '180px',
            height: '280px',
            marginTop: '20px',
            marginLeft: '100px',

            background: '#FFFFFF',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.25)',
            borderRadius: '15px',
        }

        const cardContainer = {
            padding: '2px 16px',
            color: 'black',
        }

        const cardImage = {
            width: '180px',
            height: '200px',
            borderRadius: '15px'
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
        return (

            <div style={container}>
                <form onChange={() => { this.searchBook(search) }}>
                    <input type="text" value={search} style={searchBar} placeholder="Search Book..." onChange={(e) => {
                        this.setState({ search: e.target.value })
                    }} />
                </form>
                {
                    localdata.namerole === 'admin'
                        ?
                        <button style={btnAdd} onClick={() => this.setState({ modalShow: true })}>ADD</button>
                        :
                        localdata.namerole === 'user'
                            ?
                            <button disabled style={btnAdd} onClick={() => this.setState({ modalShow: true })}>ADD</button>
                            :
                            ''
                }


                <ModalForm
                    show={this.state.modalShow}
                    onHide={modalClose} />


                <div style={flexContainer}>
                    {
                        result
                            ?
                            result && result.length > 0 &&
                            result.map((item, index) => {
                                return (
                                    <Link to={`/bookdetail/${item.bookid}`} key={index}>
                                        <div style={card}>
                                            <img src={validateText(item.image) ? `https://api-libraryku.herokuapp.com/${item.image}` : item.image} style={cardImage} alt="hey" />
                                            <div style={cardContainer}>
                                                <h5>{text(item.title)}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                            :
                            list && list.result.length > 0 &&
                            list.result.map((item, index) => {
                                return (
                                    <Link to={`/bookdetail/${item.bookid}`} key={index}>
                                        <div style={card}>
                                            <img src={validateText(item.image) ? `https://api-libraryku.herokuapp.com/${item.image}` : item.image} style={cardImage} alt="hey" />
                                            <div style={cardContainer}>
                                                <h5>{text(item.title)}</h5>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                    }
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
export default connect(mapStateToProps)(Books);