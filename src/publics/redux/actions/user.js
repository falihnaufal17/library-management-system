import axios from 'axios'

export const getUsers = (token, iduser) => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://localhost:2000/users`, {
            headers: {
                'authorization': 'x-control-app',
                'x-access-token': token,
                'x-control-user': iduser
            }
        })
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER_USER',
        payload: axios.post(`http://localhost:2000/users/register`, data)
    }
}

export const login = (data) => {
    return {
        type: 'LOGIN_USER',
        payload: axios.post(`http://localhost:2000/users/login`, data)
    }
}

export const logout = (iduser) => {
    return {
        type: 'LOGOUT_USER',
        payload: axios.patch(`http://localhost:2000/users/logout/${iduser}`)
    }
}

