import React, { Component } from 'react';
import Routing from './routes/route';
import axios from 'axios'
const getToken = localStorage.token
const iduser = localStorage.number
class App extends Component {
  render() {
    axios.defaults.headers.common['authorization'] = 'x-control-app'
    axios.defaults.headers.common['x-access-token'] = getToken
    axios.defaults.headers.common['x-control-user'] = iduser
    return (
      <div>
        <Routing />
      </div>
    )
  }
}

export default App;
