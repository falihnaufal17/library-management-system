import axios from 'axios'

export const getBooks = () => {
    return {
        type: 'GET_BOOK',
        payload: axios.get('http://localhost:2000/books')
    }
}

export const postBook = (title, image, description) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post('http://localhost:2000/books', { title: title, image: image, description: description })
    }
}