const initializeState = {
    locationList: [],
    isLoading: false,
    isFulFilled: false,
    isRejected: false
}

const location = (state = initializeState, action) => {
    switch (action.type) {
        case 'GET_LOCATION_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulFilled: false
            }
        case 'GET_LOCATION_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_LOCATION_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulFilled: true,
                locationList: action.payload.data
            }
        default:
            return state
    }
}

export default location