import axios from 'axios'

export const getUsers = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://localhost:2000/users`)
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

export const verifyUser = (iduser, data) => {
    return {
        type: 'VERIFY_USER',
        payload: axios.patch(`http://localhost:2000/users/verify/${iduser}`, data)
    }
}

