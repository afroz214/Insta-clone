import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { passwordUpdateUser } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ChangePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const passwordUpdate = useSelector(state => state.passwordUpdate)
    const { loading, error, success } = passwordUpdate

    if (success) {
        history.push('/profile')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!oldPassword || !newPassword) {
            setMessage('please enter both passwords')
        } else {
            dispatch(passwordUpdateUser({ oldPassword, newPassword }))
        }
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="row no-gutters">
                    <div className="col-md-4 h-100">
                        <div className="card card-body">
                            <NavLink to="/edit-profile" className="nav-link link">Edit Profile</NavLink>
                            <NavLink to="/change-password" className="nav-link link">Change Password</NavLink>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card card-body">
                        { error && <Message variant="danger"> {error} </Message> }
                        { message && <Message variant='danger'> {message} </Message> }
                        <h2 className="mb-4 text-primary">Change Password</h2>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Current Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Update</button>
                        </form>
                        { loading && <div className="mt-3"> <Loader /> </div> }
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
        </section>
    )
}

export default ChangePassword
