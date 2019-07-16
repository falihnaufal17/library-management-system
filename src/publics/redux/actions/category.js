import axios from 'axios';

export const getCategories = () => {
    return {
        type: 'GET_CATEGORY',
        payload: axios.get('http://localhost:2000/category')
    }
}