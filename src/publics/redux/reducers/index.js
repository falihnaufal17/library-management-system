import { combineReducers } from 'redux';

import book from './book';
import category from './category'
import location from './location'
import status from './status'

const appReducer = combineReducers({
    book,
    category,
    location,
    status
})

export default appReducer