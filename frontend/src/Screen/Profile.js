import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { postsUser } from '../actions/post'
import { detailsUser, followUser, unfollowUser } from '../actions/user'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Profile = () => {

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, profile } = userDetails

    const userPosts = useSelector(state => state.userPosts)
    const { loading:loadingPost, error:errorPost, posts } = userPosts

    const userUnfollow = useSelector(state => state.userUnfollow)
    const { success } = userUnfollow

    const userFollow = useSelector(state => state.userFollow)
    const { success:successFollow } = userFollow

    useEffect(() => {
        dispatch(detailsUser())
        dispatch(postsUser())
    }, [dispatch, success, successFollow])

    return loading ? <div className="py-5"> <Loader /> </div> : error ? <Message> {error} </Message> : (
        <>
        <section className="py-5 profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <img src={profile.avatar} className="img-fluid rounded-circle w-100" style={{ height: "10rem" }} alt="No-pic" />
                                <div>
                                <Link to="/edit-photo" className="btn btn-danger btn-sm my-2">Update Photo</Link>
                                </div>
                                <div>
                                <Link to="/create-post" className="btn btn-primary btn-sm">Create Post</Link>
                                </div>
                            </div>
                            <div className="col-md-1"></div>
                            <div className="col-md-8 align-self-center mb-4">
                                <span className="lead" style={{ fontSize: "2rem" }}> {profile.name} </span>
                                <span><Link to="/edit-profile" className="btn btn-light border mb-2 btn-sm">Edit Profile</Link></span>
                                <span></span>
                                <p className="lead my-2"> {profile.email} </p>
                                <div className="row my-4">
                                    <div className="col-12">
                                        <span className="btn"><strong> {posts.length} </strong>Posts</span>
                                        <span type="button" className="btn" data-toggle="modal" data-target="#followersModal"><strong> {profile.followers.length} </strong>Followers</span>
                                        <span type="button" className="btn" data-toggle="modal" data-target="#followingModal"><strong> {profile.following.length} </strong>Following</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h3 className="lead text-center mb-5" style={{ fontSize: "2rem" }}>Posts</h3>
                        {loadingPost && <Loader />}
                        <div className="row no-gutters">
                            {posts.length > 0 ? (
                                posts.map(post => (
                                    <div className="col-md-4" key={post._id}>
                                    <Link to={`/post/${post._id}`}>
                                        {post.photo ?  <img src={post.photo} className="img-fluid w-100" style={{ height: '15rem' }} /> : <p className="mx-4"> {post.text} </p>}
                                       
                                    </Link>
                                    </div>
                                ))
                            ) : <p className="lead text-center col-12">No Posts</p>}
                        </div>
                    </div>
                </div>
            </div>
        </section>

            <div className="modal fade" id="followingModal" >
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Following Users</h5>
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
                                    <span onClick={() => dispatch(unfollowUser(x.user))} className="btn btn-light float-right">Unfollow</span>
                                </div>
                            </div>
                        )) : <p className="text-center">No One Following You</p>}
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="modal fade" id="followersModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Followers</h5>
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
                        )) : <p className="text-center">No Followers</p>}
                    </div>
                </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default Profile
