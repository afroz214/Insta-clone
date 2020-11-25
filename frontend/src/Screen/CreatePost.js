import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postCreate } from '../actions/post'
import axios from 'axios'
import { CREATE_POST_RESET } from '../actions/constants'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const CreatePost = ({ history }) => {
    const [text, setText] = useState('')
    const [photo, setPhoto] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const createPost = useSelector(state => state.createPost)
    const { loading, error, success } = createPost

    const uploadHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('photo', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/posts/uploadphoto', formData, config)
            setPhoto(data)
            setUploading(false)
        } catch (error) {
            console.log('Error')
            setUploading(false)
        }

    }

    useEffect(() => {
        if (success) {
            dispatch({ type: CREATE_POST_RESET })
            history.push('/profile')
        }
    }, [dispatch, success, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(postCreate({ text, photo }))
    }



    return (
        <section className="py-5">
            <div className="container">
            <Link to="/profile" className="btn btn-dark mb-4">Go Back</Link>
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        { error && <Message variant="danger"> {error} </Message> }
                        <div className="card card-body">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <input type="file" className="form-control" onChange={uploadHandler} />
                                </div>
                                <div className="form-group">
                                    <textarea type="text" className="form-control" placeholder="Say something..." value={text} onChange={e => setText(e.target.value)}></textarea>
                                    { uploading && <Loader /> }
                                </div>
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </form>
                        </div>
                        { loading && <Loader /> }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreatePost
