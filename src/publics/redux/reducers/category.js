const initialState = {
    categoryList: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false,
}
const categories = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_PENDING': // in case when loading get data
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'GET_CATEGORY_REJECTED': // in case error network/else
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_CATEGORY_FULFILLED': // in case successfuly get data
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                categoryList: action.payload.data,
            }
        default:
            return state
    }
}

export default categories