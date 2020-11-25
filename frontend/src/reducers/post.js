import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_RESET, ADD_COMMENT_SUCCESS, ALL_POST_FAIL, ALL_POST_REQUEST, ALL_POST_SUCCESS, CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_RESET, DELETE_COMMENT_SUCCESS, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_RESET, LIKE_POST_SUCCESS, POST_OF_USER_FAIL, POST_OF_USER_REQUEST, POST_OF_USER_SUCCESS, SINGLE_POST_FAIL, SINGLE_POST_REQUEST, SINGLE_POST_SUCCESS, USER_POST_FAIL, USER_POST_REQUEST, USER_POST_SUCCESS } from "../actions/constants"

export const getPosts = (state = { posts: [] }, action) => {
    const { type, payload } = action
    switch(type) {
        case ALL_POST_REQUEST:
            return { loading: true, posts: [] }
        case ALL_POST_SUCCESS:
            return { loading: false, posts: payload }
        case ALL_POST_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
}

export const createPost = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case CREATE_POST_REQUEST:
            return { loading: true }
        case CREATE_POST_SUCCESS:
            return { loading: false, success: true }
        case CREATE_POST_FAIL:
            return { loading: false, error: payload }
        case CREATE_POST_RESET:
            return {}    
        default:    
            return state            
    }
}

export const userPosts = (state = { posts: [] }, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_POST_REQUEST:
            return { loading: true, posts: [] }
        case USER_POST_SUCCESS:
            return { loading: false, posts: payload }
        case USER_POST_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
} 

export const singlePosts = (state = { post: { user: {}, likes: [], comments: [] } }, action) => {
    const { type, payload } = action
    switch(type) {
        case SINGLE_POST_REQUEST:
            return { ...state, loading: true }
        case SINGLE_POST_SUCCESS:
            return { loading: false, post: payload }
        case SINGLE_POST_FAIL:
            return { loading: false, error: payload }
        default:
            return state            
    }
}

export const likePost = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case LIKE_POST_REQUEST:
            return { loading: true }
        case LIKE_POST_SUCCESS:
            return { loading: false, success: true }
        case LIKE_POST_FAIL:
            return { loading: false, error: payload }
        case LIKE_POST_RESET:
            return {}
        default:
            return state                
    }
}

export const addComment = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case ADD_COMMENT_REQUEST:
            return { loading: true }
        case ADD_COMMENT_SUCCESS:
            return { loading: false, success: true }
        case ADD_COMMENT_FAIL:
            return { loading: false, error: payload }
        case ADD_COMMENT_RESET:
            return {}
        default:
            return state                
    }
}

export const postOfUsers = (state = { posts: [] }, action) => {
    const { type, payload } = action
    switch(type) {
        case POST_OF_USER_REQUEST:
            return { loading: true, posts: [] }
        case POST_OF_USER_SUCCESS:
            return { loading: false, posts: payload }
        case POST_OF_USER_FAIL:
            return { loading: false, error: payload }
        default:
            return state                
    }
}

export const deleteComment = (state = { }, action) => {
    const { type, payload } = action
    switch(type) {
        case DELETE_COMMENT_REQUEST:
            return { loading: true }
        case DELETE_COMMENT_SUCCESS:
            return { loading: false, success: true }
        case DELETE_COMMENT_FAIL:
            return { loading: false, error: payload }
        case DELETE_COMMENT_RESET:
            return {}    
        default:
            return state                
    }
}

