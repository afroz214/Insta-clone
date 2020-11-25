import axios from 'axios'
import { LOGOUT, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_FOLLOW_FAIL, USER_FOLLOW_REQUEST, USER_FOLLOW_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_PASSWORD_FAIL, USER_PASSWORD_REQUEST, USER_PASSWORD_RESET, USER_PASSWORD_SUCCESS, USER_PHOTO_FAIL, USER_PHOTO_REQUEST, USER_PHOTO_RESET, USER_PHOTO_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_UNFOLLOW_FAIL, USER_UNFOLLOW_REQUEST, USER_UNFOLLOW_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from './constants'

export const loginUser = (datas) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login', datas, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
} 
export const registerUser = (datas) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/register', datas, config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
} 

export const detailsUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get('/api/users', config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
} 

export const profileUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
} 

export const followUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_FOLLOW_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        await axios.put(`/api/users/follow/${id}`, {}, config)
        dispatch({ type: USER_FOLLOW_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_FOLLOW_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
} 

export const unfollowUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UNFOLLOW_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        await axios.delete(`/api/users/unfollow/${id}`, config)
        dispatch({ type: USER_UNFOLLOW_SUCCESS })
    } catch (error) {
        dispatch({
            type: USER_UNFOLLOW_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
} 

export const photoUser = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PHOTO_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                jwtToken: userInfo.token
            }
        }
        await axios.put('/api/users/photo', datas, config)
        dispatch({ type: USER_PHOTO_SUCCESS })
        dispatch({ type: USER_PHOTO_RESET })
    } catch (error) {
        dispatch({
            type: USER_PHOTO_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const updateUser = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.put('/api/users', datas, config)
        dispatch({ type: USER_UPDATE_SUCCESS })
        dispatch({ type: USER_UPDATE_RESET })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const passwordUpdateUser = (datas) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_PASSWORD_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                jwtToken: userInfo.token
            }
        }
        await axios.put('/api/users/changepassword', datas, config)
        dispatch({ type: USER_PASSWORD_SUCCESS })
        dispatch({ type: USER_PASSWORD_RESET })
    } catch (error) {
        dispatch({
            type: USER_PASSWORD_FAIL,
            payload:
              error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: LOGOUT })
}