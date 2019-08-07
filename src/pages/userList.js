import React, { Component } from 'react'
import { getUsers, verifyUser } from '../publics/redux/actions/user';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
let localdata = JSON.parse(localStorage.getItem('data')) || ''
class UserList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            isverify: 'true',
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getUsers())
        this.setState({
            users: this.props.user
        })
    }

    verifyUser = async (userid, data) => {
        await this.props.dispatch(verifyUser(userid, data))
            .then(() => {
                Swal.fire({
                    type: 'success',
                    title: 'Verify Successfully',
                })
                this.setState({
                    users: this.props.user
                })
            })
            .catch(()=>{
                Swal.fire({
                    type: 'error',
                    title: 'Verify Failed',
                    text: 'Oops Something wrong with server :('
                })
            })
    }

    render() {
        const { users, isverify } = this.state

        const data = {
            isverify: isverify,
            updated_at: new Date()
        }
        const list = users.userList
        console.log(list)
        return (
            <div>
                {
                    localdata.namerole === 'admin'
                        ?
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
                                        <th>Is Verify</th>
                                        <th>Action</th>
                                    </tr>
                                    {
                                        list &&
                                            list.length > 0 ?
                                            list.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{item.id_card}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.status
                                                            ?
                                                            <div className="badge badge-success">Online</div>
                                                            : <div className="badge badge-secondary">Offline</div>}</td>
                                                        <td>{item.namerole}</td>
                                                        <td>{item.isverify}</td>
                                                        <td><Button onClick={() => {
                                                            this.verifyUser(item.iduser, data)
                                                        }} className="btn btn-sm btn-success" disabled={item ? item.isverify === 'true' : 'false'}>Verify</Button></td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan="7" align="center">You UNAUTHORIZED!</td>
                                            </tr>
                                    }
                                </table>
                            </div>
                        </div>
                        :
                        <div className="container mt-5 text-center">
                            <h6>Oops Something Wrong with you :v</h6>
                        </div>
                }
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