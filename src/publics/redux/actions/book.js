import axios from 'axios'

export const getBookByStatus = () => {
    return {
        type: 'GET_BOOKSTATUS',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books/bookstatus`)
    }
}

export const getBooks = (page) => {
    console.log()
    return {
        type: 'GET_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books?page=${page}`)
    }
}

export const searchBook = (search) => {
    console.log('Search: ' + search)
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books?search=${search}`)
    }
}

export const postBook = (data) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post('https://api-libraryku.herokuapp.com/books', data)
    }
}

export const detailBook = (bookid) => {
    console.log("book id: " + bookid)
    return {
        type: 'DETAIL_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books/${bookid}`)
    }
}

export const deleteBook = (bookid) => {
    console.log("book id: " + bookid)
    return {
        type: 'DELETE_BOOK',
        payload: axios.delete(`https://api-libraryku.herokuapp.com/books/${bookid}`)
    }
}

export const updateBook = (bookid, data) => {
    console.log("book id: " + bookid)
    return {
        type: 'UPDATE_BOOK',
        payload: axios.patch(`https://api-libraryku.herokuapp.com/books/${bookid}`, data)
    }
}