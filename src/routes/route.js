import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Books from '../pages/books';
import BookDetail from '../pages/detailBook';
import Loaning from '../pages/loaning';

import { Provider } from 'react-redux';
import store from '../publics/redux/store'

class Routing extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path='/' component={Books} />
                    <Route exact path='/bookdetail/:bookid' component={BookDetail} />
                    <Route exact path='/loaning' component={Loaning} />
                </Router>
            </Provider>
        )
    }
}

export default Routing;