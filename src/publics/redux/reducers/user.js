const initializeState = {
    userList: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false
}

const user = (state = initializeState, action) => {
    switch (action.type) {
        case 'GET_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'GET_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: action.payload.data.result
            }
        case 'REGISTER_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'REGISTER_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'REGISTER_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: [state.userList, action.payload.data[0]]
            }
        case 'LOGIN_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'LOGIN_USER_REJECTED':
            localStorage.setItem('error', 'Wrong email or password')
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'LOGIN_USER_FULFILLED':
            localStorage.setItem('token', 'bearer ' + action.payload.data.result.token)
            localStorage.setItem('number', action.payload.data.result.iduser)
            localStorage.setItem('data', JSON.stringify(action.payload.data.result))
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: action.payload.data.result
            }
        case 'LOGOUT_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'LOGOUT_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'LOGOUT_USER_FULFILLED':
            localStorage.clear()
            localStorage.setItem('data', JSON.stringify(action.payload.data.result))
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: action.payload.data.result
            }
        case 'VERIFY_USER_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'VERIFY_USER_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'VERIFY_USER_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                userList: [state.userList, action.payload.data[0]]
            }
        default:
            return state
    }
}

export default user