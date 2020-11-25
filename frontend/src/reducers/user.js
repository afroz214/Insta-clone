import { USER_DETAILS_FAIL, USER_PHOTO_RESET, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, LOGOUT, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_RESET, USER_FOLLOW_REQUEST, USER_FOLLOW_SUCCESS, USER_FOLLOW_FAIL, USER_FOLLOW_RESET, USER_UNFOLLOW_REQUEST, USER_UNFOLLOW_SUCCESS, USER_UNFOLLOW_FAIL, USER_UNFOLLOW_RESET, USER_PHOTO_REQUEST, USER_PHOTO_SUCCESS, USER_PHOTO_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET, USER_PASSWORD_REQUEST, USER_PASSWORD_SUCCESS, USER_PASSWORD_FAIL, USER_PASSWORD_RESET } from "../actions/constants"

export const userLogin = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: payload }
        case LOGOUT:
            return {}
        default:
            return state                
    }
}

export const userDetails = (state = { profile: { following: [], followers: [] } }, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, profile: payload }
        case USER_DETAILS_FAIL:
            return { loading: false, error: payload }
        default:
            return state                
    }
}

export const userProfile = (state = { profile: { following: [], followers: [] } }, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_PROFILE_REQUEST:
            return { loading: true }
        case USER_PROFILE_SUCCESS:
            return { loading: false, profile: payload }
        case USER_PROFILE_FAIL:
            return { loading: false, error: payload }
        case USER_PROFILE_RESET:
            return { profile: {} }
        default:
            return state                
    }
}

export const userFollow = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_FOLLOW_REQUEST:
            return { loading: true }
        case USER_FOLLOW_SUCCESS:
            return { loading: false, success: true }
        case USER_FOLLOW_FAIL:
            return { loading: false, error: payload }
        case USER_FOLLOW_RESET:
            return {}
        default:
            return state                
    }
}

export const userUnfollow = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_UNFOLLOW_REQUEST:
            return { loading: true }
        case USER_UNFOLLOW_SUCCESS:
            return { loading: false, success: true }
        case USER_UNFOLLOW_FAIL:
            return { loading: false, error: payload }
        case USER_UNFOLLOW_RESET:
            return {}
        default:
            return state                
    }
}

export const userPhoto = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_PHOTO_REQUEST:
            return { loading: true }
        case USER_PHOTO_SUCCESS:
            return { loading: false, success: true }
        case USER_PHOTO_FAIL:
            return { loading: false, error: payload }
        case USER_PHOTO_RESET:
            return {}
        default:
            return state                
    }
}

export const userUpdate = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case USER_UPDATE_FAIL:
            return { loading: false, error: payload }
        case USER_UPDATE_RESET:
            return {}
        default:
            return state                
    }
}

export const passwordUpdate = (state = {}, action) => {
    const { type, payload } = action
    switch(type) {
        case USER_PASSWORD_REQUEST:
            return { loading: true }
        case USER_PASSWORD_SUCCESS:
            return { loading: false, success: true }
        case USER_PASSWORD_FAIL:
            return { loading: false, error: payload }
        case USER_PASSWORD_RESET:
            return {}
        default:
            return state                
    }
}



