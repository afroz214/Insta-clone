import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { commentAdd, postLike, postSingle, commentDelete } from '../actions/post'
import Loader from '../components/Loader'
import Message from '../components/Message'

const SinglePost = ({ match }) => {

    const [text, setText] = useState('')

    const dispatch = useDispatch()

    const singlePosts = useSelector(state => state.singlePosts)
    const { loading, error, post } = singlePosts

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const likePost = useSelector(state => state.likePost)
    const { success } = likePost

    const deleteComment = useSelector(state => state.deleteComment)
    const { success:successDeleteComment } = deleteComment

    const addComment = useSelector(state => state.addComment)
    const { success:successComment, loading:loadingComment, error:errorComment } = addComment

    useEffect(() => {
        dispatch(postSingle(match.params.id))
    }, [dispatch, match, success, successComment, successDeleteComment])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(commentAdd(match.params.id, { text }))
        setText('')
    }

    return loading ? <div className="py-5"> <Loader /> </div> : error ? <Message> {error} </Message> : (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                <Link to="/newsfeeds" className="btn btn-dark mb-3">NewsFeeds</Link>
                        <div className="row no-gutters">
                            <div className="col-md-7 card">
                                <img src={`/${post.photo}`} className="img-fluid w-100" style={{ height: '35rem' }} />
                            </div>
                            <div className="col-md-5 h-100">
                                <div className="card">
                                <div className="row">
                                    <div className="col-12 my-2">
                                        <Link to={`/profile/${post.user._id}`} className="link">
                                        <img src={`/${post.user.avatar}`} className="img-fluid rounded-circle ml-2" width="50" style={{ height: '3rem' }} /> <span className="ml-2"> {post.user.name} </span>
                                        </Link>
                                    </div>
                                    <hr />
                                    <div className="col-12">
                                        {post.comments.length > 0 ? (
                                            post.comments.map(comment => (
                                                <div className="mx-3 py-1" key={comment._id}>
                                                    
                                                    <h6>
                                                    <Link to={`/profile/${comment.user}`} className="link">
                                                        <strong> {comment.name}:</strong>
                                                    </Link>
                                                         {comment.user.toString() === userInfo.user._id && <span onClick={() => dispatch(commentDelete(post._id, comment._id))} className="float-right comment-delete"><i className="fas fa-trash text-danger "></i></span>}
                                                          </h6>
                                                    
                                                    <p> {comment.text} </p>
                                                </div>
                                            ))
                                        ) : <p className="text-center my-4">No Comments</p>}
                                    </div>
                                </div>
                                </div>
                                <div>
                                <span className="ml-3"><strong> {post.likes.length} likes</strong> </span>
                                {post.likes.find(x => x.user.toString() === userInfo.user._id) ? (<span className="btn" onClick={() => dispatch(postLike(post._id))}><i className="fas fa-heart text-danger mr-3" style={{ fontSize: '2rem' }}></i></span>) : (<span className="btn" onClick={() => dispatch(postLike(post._id))}><i className="fas fa-heart mr-3" style={{ fontSize: '2rem' }}></i></span>)}
                                </div>
                                <form onSubmit={submitHandler} className="row no-gutters">
                                    { errorComment && <Message> {errorComment} </Message> }
                                    <div className="col-11">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="Add a comment..." value={text} onChange={e => setText(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-1 mt-1">
                                        <button type="submit" className="btn btn-primary btn-sm">Post</button>
                                    </div>
                                </form>
                                { loadingComment && <Loader /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SinglePost
