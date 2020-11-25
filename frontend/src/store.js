import { combineReducers, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLogin, passwordUpdate, userUpdate, userDetails, userProfile, userFollow, userUnfollow, userPhoto } from './reducers/user'
import { getPosts, deleteComment, postOfUsers, addComment, likePost, createPost, userPosts, singlePosts } from './reducers/post'

const reducer = combineReducers({
    userLogin,
    userDetails,
    getPosts,
    createPost,
    userProfile,
    userFollow,
    userUnfollow,
    userPosts,
    singlePosts,
    likePost,
    addComment,
    postOfUsers,
    userPhoto,
    userUpdate,
    passwordUpdate,
    deleteComment
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store