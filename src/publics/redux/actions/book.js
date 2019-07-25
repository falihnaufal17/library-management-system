import axios from 'axios'

export const getBooks = (token, iduser) => {
    console.log()
    return {
        type: 'GET_BOOK',
        payload: axios.get(`http://localhost:2000/books`, {
            headers: {
                'authorization': 'x-control-app',
                'x-access-token': token,
                'x-control-user': iduser
            }
        })
    }
}

export const searchBook = (search,token, iduser) => {
    console.log('Search: ' + search)
    return {
        type: 'SEARCH_BOOK',
        payload: axios.get(`http://localhost:2000/books?search=${search}`,{
            headers: {
                'authorization': 'x-control-app',
                'x-access-token': token,
                'x-control-user': iduser
            }
        })
    }
}

export const postBook = (title, writer, image, description, locationid, categoryid, statusid) => {
    console.log("desc: " + description)
    console.log("locationid " + locationid)
    console.log("categoryid: " + categoryid)
    console.log("statusid: " + statusid)
    return {
        type: 'POST_BOOK',
        payload: axios.post('http://localhost:2000/books', { title: title, writer: writer, image: image, description: description, locationid: locationid, categoryid: categoryid, statusid: statusid })
    }
}

export const detailBook = (bookid) => {
    console.log("book id: " + bookid)
    return {
        type: 'DETAIL_BOOK',
        payload: axios.get(`http://localhost:2000/books/${bookid}`)
    }
}

export const deleteBook = (bookid) => {
    console.log("book id: " + bookid)
    return {
        type: 'DELETE_BOOK',
        payload: axios.delete(`http://localhost:2000/books/${bookid}`)
    }
}

export const updateBook = (bookid, data) => {
    console.log("book id: " + bookid)
    return {
        type: 'UPDATE_BOOK',
        payload: axios.patch(`http://localhost:2000/books/${bookid}`, data)
    }
}