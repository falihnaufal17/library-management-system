import axios from 'axios'

export const getStatus = () => {
    return {
        type: 'GET_STATUS',
        payload: axios.get('http://localhost:2000/status')
    }
}