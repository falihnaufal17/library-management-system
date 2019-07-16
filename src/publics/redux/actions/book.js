import axios from 'axios'

export const getBooks = () => {
    return {
        type: 'GET_BOOK',
        payload: axios.get('http://localhost:2000/books')
    }
}

export const postBook = (title, writer, image, description, locationid, categoryid, statusid) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post('http://localhost:2000/books', { title: title, writer: writer, image: image, description: description, locationid: locationid, categoryid: categoryid, statusid: statusid })
    }
}