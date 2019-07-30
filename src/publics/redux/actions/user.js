import axios from 'axios'

export const getUsers = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`https://api-libraryku.herokuapp.com/users`)
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER_USER',
        payload: axios.post(`https://api-libraryku.herokuapp.com/users/register`, data)
    }
}

export const login = (data) => {
    return {
        type: 'LOGIN_USER',
        payload: axios.post(`https://api-libraryku.herokuapp.com/users/login`, data)
    }
}

export const logout = (iduser) => {
    return {
        type: 'LOGOUT_USER',
        payload: axios.patch(`https://api-libraryku.herokuapp.com/users/logout/${iduser}`)
    }
}

export const verifyUser = (iduser, data) => {
    return {
        type: 'VERIFY_USER',
        payload: axios.patch(`https://api-libraryku.herokuapp.com/users/verify/${iduser}`, data)
    }
}

