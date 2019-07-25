import React, { Component } from 'react'
import { getUsers } from '../publics/redux/actions/user';
import { connect } from 'react-redux';
let getToken = localStorage.token
let iduser = localStorage.number
class UserList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getUsers(getToken, iduser))
        this.setState({
            users: this.props.user
        })
    }

    render() {
        const { users } = this.state

        const list = users.userList
        console.log(list)
        return (
            <div className="container mt-5">
                <h1>User List</h1>
                <div className="table-responsive">
                    <table className="table table-striped table-borderless">
                        <tr>
                            <th>ID Card</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Role</th>
                        </tr>
                        {
                            list &&
                                list.length > 0 ?
                                list.map((item, key) => {
                                    return (
                                        <tr>
                                            <td>{item.id_card}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.status
                                                ?
                                                <div className="badge badge-success">Online</div>
                                                : <div className="badge badge-secondary">Offline</div>}</td>
                                            <td>{item.namerole}</td>
                                        </tr>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan="5">You UNAUTHORIZED!</td>
                                </tr>
                        }
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserList)