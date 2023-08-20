import { userService } from "../../services/user.service"

export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const ADD_USER = 'ADD_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_LOGGEDIN_USER = 'SET_LOGGEDIN_USER'

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    users: null,
    user: userService.getEmptyUser(),
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_LOGGEDIN_USER:
            return {
                ...state,
                loggedInUser: action.loggedUser
            }
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.user]
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user._id === action.updatedUser._id ? action.updatedUser : user)
            }
        default:
            return state;
    }
}

//FILTER BY IN STORE