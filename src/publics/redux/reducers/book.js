const initialState = {
    bookList: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false,
}

const book = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'GET_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_BOOK_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data
            }
        default:
            return state
    }
}

export default book