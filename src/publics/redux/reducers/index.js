import { combineReducers } from 'redux';

import book from './book';
import category from './category'
import location from './location'
import status from './status'
import loan from './loan'
import user from './user'

const appReducer = combineReducers({
    book,
    category,
    location,
    status,
    loan,
    user
})

export default appReducer