import axios from 'axios'

export const getLoan = () =>{
    return {
        type: 'GET_LOAN',
        payload: axios.get('http://localhost:2000/loaning')
    }
}

export const addLoan = (data) =>{
    return {
        type: 'GET_LOAN',
        payload: axios.post('http://localhost:2000/loaning', data)
    }
}