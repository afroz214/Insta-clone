import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LIKE_POST_RESET } from '../actions/constants'
import { allPosts, postLike } from '../actions/post'
import Loader from '../components/Loader'
import Message from '../components/Message'

const NewsFeeds = () => {

    const dispatch = useDispatch()

    const getPosts = useSelector(state => state.getPosts)
    const { loading, error, posts } = getPosts

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const likePost = useSelector(state => state.likePost)
    const { success } = likePost

    useEffect(() => {
        dispatch(allPosts())
        if (success) {
            dispatch({ type: LIKE_POST_RESET })
        }
    }, [dispatch, success])

    return loading ? <div className="py-5"> <Loader /> </div> : error ? <Message> {error} </Message> : (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <p className="display-4">NewsFeeds</p>
                        <hr />
                        {posts.map(post => (
                            <div className="card card-body" key={post._id}>
                                <div className="row">
                                    <div className="col-12">
                                        <Link to={`/profile/${post.user._id}`} className="link">
                                        <img src={post.user.avatar} className="img-fluid rounded-circle mr-2" width="50" style={{ height: "3rem" }} />
                                        <span> {post.user.name} </span>
                                        </Link>
                                    </div>
                                    <div className="col-12">
                                        <p className="py-2"> {post.text} </p>
                                        {post.photo ? <img src={post.photo} className="img-fluid w-100 my-2" style={{ height: '30rem' }} alt="No-pic" /> : null}
                                    </div>
                                    <div className="col-12">
                                        {post.likes.find(x => x.user.toString() === userInfo.user._id) ? (<span className="btn" onClick={() => dispatch(postLike(post._id))}><i className="fas fa-heart text-danger mr-3" style={{ fontSize: '2rem' }}></i></span>) : (<span className="btn" onClick={() => dispatch(postLike(post._id))}><i className="fas fa-heart mr-3" style={{ fontSize: '2rem' }}></i></span>)}
                                        <Link to={`/post/${post._id}`} className="btn link"><i className="far fa-comment" style={{ fontSize: '2rem' }}></i></Link>
                                    </div>
                                    <div className="col-12 py-2">
                                        <span className="mx-3"> {post.likes.length} likes </span>
                                        <Link to={`/post/${post._id}`} className="link btn btn-light"> Comments <span className="badge badge-primary"> {post.comments.length} </span> </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsFeeds
