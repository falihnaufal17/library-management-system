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
        case 'POST_BOOK_PENDING': // in case when loading post data
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'POST_BOOK_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_BOOK_FULFILLED': // in case successfuly post data
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: [state.bookList, action.payload.data[0]],
            }
        case 'DETAIL_BOOK_PENDING': // in case when loading post data
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'DETAIL_BOOK_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'DETAIL_BOOK_FULFILLED': // in case successfuly post data
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data.result,
            }
        case 'DELETE_BOOK_PENDING': // in case when loading post data
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'DELETE_BOOK_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'DELETE_BOOK_FULFILLED': // in case successfuly post data
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: [state.bookList, action.payload.data[0]],
            }
        case 'UPDATE_BOOK_PENDING': // in case when loading post data
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'UPDATE_BOOK_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'UPDATE_BOOK_FULFILLED': // in case successfuly post data
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: [state.bookList, action.payload.data[0]],
            }
        case 'SEARCH_BOOK_PENDING': // in case when loading post data
            return {
                ...state,
                isLoading: true,
                isFulFilled: false,
                isRejected: false
            }
        case 'SEARCH_BOOK_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'SEARCH_BOOK_FULFILLED': // in case successfuly post data
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                bookList: action.payload.data.result,
            }
        default:
            return state
    }
}

export default book