import axios from 'axios'

export const getLocation = () => {
    return {
        type: 'GET_LOCATION',
        payload: axios.get('http://localhost:2000/location')
    }
}