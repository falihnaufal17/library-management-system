import axios from 'axios'

export const getLocation = () => {
    return {
        type: 'GET_LOCATION',
        payload: axios.get('https://api-libraryku.herokuapp.com/location')
    }
}