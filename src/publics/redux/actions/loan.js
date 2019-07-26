import axios from 'axios'

export const getLoan = (token, iduser) => {
    return {
        type: 'GET_LOAN',
        payload: axios.get('http://localhost:2000/loaning', {
            headers: {
                'authorization': 'x-control-app',
                'x-access-token': token,
                'x-control-user': iduser
            }
        })
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

export const historyLoan = (token, iduser) => {
    return {
        type: 'HISTORY_LOAN',
        payload: axios.get(`http://localhost:2000/loaning/users/${iduser}`, {
            headers: {
                'authorization': 'x-control-app',
                'x-access-token': token,
                'x-control-user': iduser
            }
        })
    }
}