import axios from 'axios'

export const getStatus = () => {
    return {
        type: 'GET_STATUS',
        payload: axios.get('https://api-libraryku.herokuapp.com/status')
    }
}