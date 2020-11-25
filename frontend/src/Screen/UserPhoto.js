import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { photoUser } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserPhoto = ({ history }) => {

    const [file, setFile] = useState(null)

    const dispatch = useDispatch()

    const userPhoto = useSelector(state => state.userPhoto)
    const { loading, error, success } = userPhoto

    const onChangeHandler = (e) => {
        setFile(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('avatar', file)
        dispatch(photoUser(formData))
    }

    if (success) {
        history.push('/profile')
    }

    return (
        <section className="py-5">
            <div className="container">
                <Link to="/profile" className="btn btn-dark mb-4">Go Back</Link>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        {error && <Message> {error} </Message>}
                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={onChangeHandler} />
                            </div>
                            <button type="submit" className="btn btn-block btn-primary">Upload Photo</button>
                        </form>
                        { loading && <div className="py-2"><Loader /></div> }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserPhoto
