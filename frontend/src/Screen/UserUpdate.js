import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { updateUser, detailsUser } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserUpdate = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { profile } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading, error, success } = userUpdate

    useEffect(() => {
        if (!profile.name) {
            dispatch(detailsUser())
        } else {
            setName(profile.name)
            setEmail(profile.email)
        }
    }, [dispatch, profile])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!password) {
            setMessage('Please Enter Password')
        } else {
            dispatch(updateUser({ name, email, password }))
        }
    }

    if (success) {
        history.push('/profile')
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
                            {message && <Message variant="danger"> {message} </Message>}
                        { error && <Message variant="danger"> {error} </Message> }
                        <h2 className="mb-4 text-primary">Update Details</h2>
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                            <label>Email</label>
                                <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group">
                            <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
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

export default UserUpdate
