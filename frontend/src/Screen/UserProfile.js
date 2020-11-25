import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { USER_FOLLOW_RESET, USER_UNFOLLOW_RESET } from '../actions/constants'
import { followUser, profileUser, unfollowUser } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userOfPost } from '../actions/post'
import { Link } from 'react-router-dom'

const UserProfile = ({ match, history }) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userProfile = useSelector(state => state.userProfile)
    const { profile, loading, error } = userProfile

    const userFollow = useSelector(state => state.userFollow)
    const { success } = userFollow

    const userUnfollow = useSelector(state => state.userUnfollow)
    const { success:successUnfollow } = userUnfollow

    const postOfUsers = useSelector(state => state.postOfUsers)
    const { posts, loading:loadingPost } = postOfUsers

    useEffect(() => {
        dispatch(profileUser(match.params.id))
        dispatch(userOfPost(match.params.id))
        if (success) {
            dispatch({ type: USER_FOLLOW_RESET })
        } else if (successUnfollow) {
            dispatch({ type: USER_UNFOLLOW_RESET })
        }
    }, [dispatch, match, success, successUnfollow])

    if (match.params.id === userInfo.user._id) {
        history.push('/profile')
    }

    return loading ? <div className="py-5"> <Loader /></div> : error ? <Message> {error} </Message> : (
        <>
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <img src={`/${profile.avatar}`} className="img-fluid rounded-circle w-100" style={{ height: "10rem" }} />
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-8 align-self-center mb-4">
                                <span className="lead" style={{ fontSize: "2rem" }}> {profile.name} </span>
                                {profile.followers.find(x => x.user === userInfo.user._id) ? <span><button onClick={() => dispatch(unfollowUser(match.params.id))} className="btn btn-light mb-2 mx-2 btn-sm">UnFollow</button></span> : <span><button onClick={() => dispatch(followUser(match.params.id))} className="btn btn-primary mb-2 mx-2 btn-sm">Follow</button></span>}
                                <span></span>
                                <p className="lead my-2"> {profile.email} </p>
                                <div className="row my-4">
                                    <div className="col-3 btn"><strong> {posts.length} </strong>Posts</div>
                                    <div className="col-3 mr-3 btn" data-toggle="modal" data-target="#followersModal"> <strong> {profile.followers.length} </strong> Followers</div>
                                    <div className="col-3 btn" data-toggle="modal" data-target="#followingModal"> <strong> {profile.following.length} </strong> Following</div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h3 className="lead text-center" style={{ fontSize: "2rem" }}>Posts</h3>
                        {loadingPost && <Loader />}
                        <div className="row no-gutters">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <div className="col-md-4">
                                        <Link to={`/post/${post._id}`}>
                                        {post.photo ?  <img src={`/${post.photo}`} className="img-fluid w-100" style={{ height: '15rem' }} /> : <p className="mx-4"> {post.text} </p>}
                                        </Link>
                                    </div>
                                ))
                            ) : <p className="lead text-center col-12">No Posts</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>



        <div className="modal fade" id="followingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Following Users</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="card card-body">
                        {profile.following.length > 0 ?
                        profile.following.map(x => (
                            <div className="row my-2" key={x._id}>
                                <div className="col-12">
                                    <Link to={`/profile/${x.user}`} className="link">
                                    <img src={`/${x.avatar}`} className="img-fluid rounded-circle mr-3" width="75" style={{ height: "5rem" }} />
                                    <span> {x.name} </span>
                                    </Link>
                                    <Link to={`/profile/${x.user}`} className="btn btn-secondary float-right">Details</Link>
                                </div>
                            </div>
                        )) : <p className="text-center">No One Following You</p>}
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="modal fade" id="followersModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Following Users</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="card card-body">
                        {profile.followers.length > 0 ?
                        profile.followers.map(x => (
                            <div className="row my-2" key={x._id}>
                                <div className="col-12">
                                    <Link to={`/profile/${x.user}`} className="link">
                                    <img src={`/${x.avatar}`} className="img-fluid rounded-circle mr-3" width="75" style={{ height: "5rem" }} />
                                    <span> {x.name} </span>
                                    </Link>
                                    <Link to={`/profile/${x.user}`} className="btn btn-secondary float-right">Details</Link>
                                </div>
                            </div>
                        )) : <p className="text-center">No One Following You</p>}
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default UserProfile
