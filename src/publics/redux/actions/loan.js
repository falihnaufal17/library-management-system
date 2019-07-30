import axios from 'axios'

export const getLoan = () => {
    return {
        type: 'GET_LOAN',
        payload: axios.get('https://api-libraryku.herokuapp.com/loaning')
    }
}

export const addLoan = (data) => {
    return {
        type: 'ADD_LOAN',
        payload: axios.post('https://api-libraryku.herokuapp.com/loaning', data)
    }
}

export const updateLoan = (loaningid, data) => {
    return {
        type: 'UPDATE_LOAN',
        payload: axios.patch(`https://api-libraryku.herokuapp.com/loaning/${loaningid}`, data)
    }
}

export const historyLoan = (iduser) => {
    return {
        type: 'HISTORY_LOAN',
        payload: axios.get(`https://api-libraryku.herokuapp.com/loaning/users/${iduser}`)
    }
}