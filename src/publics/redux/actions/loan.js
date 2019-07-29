import axios from 'axios'

export const getLoan = () => {
    return {
        type: 'GET_LOAN',
        payload: axios.get('http://localhost:2000/loaning')
    }
}

export const addLoan = (data) => {
    return {
        type: 'ADD_LOAN',
        payload: axios.post('http://localhost:2000/loaning', data)
    }
}

export const updateLoan = (loaningid, data) => {
    return {
        type: 'UPDATE_LOAN',
        payload: axios.patch(`http://localhost:2000/loaning/${loaningid}`, data)
    }
}

export const historyLoan = (iduser) => {
    return {
        type: 'HISTORY_LOAN',
        payload: axios.get(`http://localhost:2000/loaning/users/${iduser}`)
    }
}