import axios from 'axios'
import { ADD_COMMENT_FAIL, ADD_COMMENT_REQUEST, ADD_COMMENT_RESET, ADD_COMMENT_SUCCESS, ALL_POST_FAIL, ALL_POST_REQUEST, ALL_POST_SUCCESS, CREATE_POST_FAIL, CREATE_POST_REQUEST, CREATE_POST_RESET, CREATE_POST_SUCCESS, DELETE_COMMENT_FAIL, DELETE_COMMENT_REQUEST, DELETE_COMMENT_RESET, DELETE_COMMENT_SUCCESS, LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_RESET, LIKE_POST_SUCCESS, POST_OF_USER_FAIL, POST_OF_USER_REQUEST, POST_OF_USER_SUCCESS, SINGLE_POST_FAIL, SINGLE_POST_REQUEST, SINGLE_POST_SUCCESS, USER_POST_FAIL, USER_POST_REQUEST, USER_POST_SUCCESS } from './constants'

export const allPosts = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ALL_POST_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get('/api/posts/all', config)
        dispatch({
            type: ALL_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_POST_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const postCreate = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_POST_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.post('/api/posts', datas, config)
        dispatch({ type: CREATE_POST_SUCCESS })
        dispatch({ type: CREATE_POST_RESET })
    } catch (error) {
        dispatch({
            type: CREATE_POST_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const postsUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_POST_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get('/api/posts', config)
        dispatch({ 
            type: USER_POST_SUCCESS,
            payload: data
         })
    } catch (error) {
        dispatch({
            type: USER_POST_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const postSingle = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SINGLE_POST_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get(`/api/posts/${id}`, config)
        dispatch({ 
            type: SINGLE_POST_SUCCESS,
            payload: data
         })
    } catch (error) {
        dispatch({
            type: SINGLE_POST_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const postLike = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: LIKE_POST_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.put(`/api/posts/like/${id}`, {}, config)
        dispatch({ type: LIKE_POST_SUCCESS })
        dispatch({ type: LIKE_POST_RESET })
    } catch (error) {
        dispatch({
            type: LIKE_POST_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const commentAdd = (id, datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_COMMENT_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.put(`/api/posts/comment/${id}`, datas, config)
        dispatch({ type: ADD_COMMENT_SUCCESS })
        dispatch({ type: ADD_COMMENT_RESET })
    } catch (error) {
        dispatch({
            type: ADD_COMMENT_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const userOfPost = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: POST_OF_USER_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get(`/api/posts/all/${id}`, config)
        dispatch({ 
            type: POST_OF_USER_SUCCESS,
            payload: data
        
        })
    } catch (error) {
        dispatch({
            type: POST_OF_USER_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const commentDelete = (id, commentId) => async (dispatch, getState) => {
    try {
        dispatch({ type: DELETE_COMMENT_REQUEST })
        const  { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        await axios.delete(`/api/posts/comment/${id}/${commentId}`, config)
        dispatch({ type: DELETE_COMMENT_SUCCESS })
        dispatch({ type: DELETE_COMMENT_RESET })
    } catch (error) {
        dispatch({
            type: DELETE_COMMENT_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

