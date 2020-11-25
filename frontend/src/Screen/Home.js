import React, { useEffect, useState } from 'react'
import phonePhoto from '../img/phone-image.jpg'
import { loginUser, registerUser } from '../actions/user'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const Home = ({ history }) => {

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [display, toggle] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin

    const loginSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    const registerSubmitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Make sure your both password are correct')
        } else {
            dispatch(registerUser({ name, email, password }))
        }
    }

    if (userInfo) {
        history.push('/newsfeeds')
    }

    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="card card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src={phonePhoto} className="img-fluid w-100" style={{ height: "25rem" }} />
                                </div>
                                <div className="col-md-6 align-self-center">
                                    {error && <Message variant="danger"> {error} </Message>}
                                    {message && <Message variant="danger"> {message} </Message>}
                                    {display ? (
                                        <>
                                        <h3 className="register mb-3">Register</h3>
                                        <form onSubmit={registerSubmitHandler}>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <input type="password" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                                            </div>
                                            <button type="submit" className='btn btn-primary btn-block'>Register</button>
                                        </form>
                                        <p>if you already have an account<Link className="ml-2" onClick={() => toggle(!display)}>Login</Link></p>
                                        </>
                                    ) : (
                                        <>
                                        <h3 className="login mb-3">Login</h3>
                                    <form onSubmit={loginSubmitHandler}>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        <button type="submit" className='btn btn-primary btn-block'>Login</button>
                                    </form>
                                    <p>if you dont have an account?<Link className="ml-2" onClick={() => toggle(!display)}>Register</Link></p>
                                        </>
                                    )}
                                    <div className="mt-2">
                                    {loading && <Loader />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
