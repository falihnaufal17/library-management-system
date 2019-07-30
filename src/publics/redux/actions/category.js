import axios from 'axios';

export const getCategories = () => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get('https://api-libraryku.herokuapp.com/category')
    }
}