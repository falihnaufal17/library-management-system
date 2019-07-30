import axios from 'axios'

export const getBookByStatus = () => {
    return {
        type: 'GET_BOOKSTATUS',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books/bookstatus`)
    }
}

export const getBooks = () => {
    console.log()
    return {
        type: 'GET_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books`)
    }
}

export const searchBook = (search) => {
    console.log('Search: ' + search)
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`https://api-libraryku.herokuapp.com/books?search=${search}`)
    }
}

export const postBook = (title, writer, image, description, locationid, categoryid, statusid) => {
    console.log("desc: " + description)
    console.log("locationid " + locationid)
    console.log("categoryid: " + categoryid)
    console.log("statusid: " + statusid)
    return {
        type: 'POST_BOOK',
        payload: axios.post('https://api-libraryku.herokuapp.com/books', { title: title, writer: writer, image: image, description: description, locationid: locationid, categoryid: categoryid, statusid: statusid })
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