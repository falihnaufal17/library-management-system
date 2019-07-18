const initializeState = {
    loanList: [],
    isLoading: false,
    isRejected: false,
    isFulFilled: false
}

const loan = (state = initializeState, action) => {
    switch (action.type) {
        case 'GET_LOAN_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'GET_LOAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_LOAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                loanList: action.payload.data.result
            }
        case 'ADD_LOAN_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'ADD_LOAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'ADD_LOAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                loanList: [state.loanList, action.payload.data[0]]
            }
        case 'UPDATE_LOAN_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'UPDATE_LOAN_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'UPDATE_LOAN_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                loanList: [state.loanList, action.payload.data[0]]
            }
        default:
            return state
    }
}

export default loan