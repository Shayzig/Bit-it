import { userService } from "../../services/user.service"
import { REMOVE_USER, SET_USERS, SET_USER, UPDATE_USER, SET_LOGGEDIN_USER } from "../reducers/user.reducer";
import { store } from "../store";

export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        const actionSet = {
            type: SET_USERS,
            users: users
        }
        store.dispatch(actionSet)
    } catch (error) {
        console.log('error:', error)
    }
}

export async function removeUser(userId) {
    try {
        await userService.deleteUser(userId)
        const action = {
            type: REMOVE_USER,
            userId
        }
        store.dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export async function loadLoggedInUser() {
    try {
        const user = await userService.getLoggedinUser()
        const action = {
            type: SET_USER,
            user
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}

export async function logout() {
    try {
        const user = await userService.logout()
        const action = {
            type: SET_LOGGEDIN_USER,
            loggedUser: ''
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}

export async function login(userName) {
    try {
        const user = await userService.login(userName)
        const action = {
            type: SET_LOGGEDIN_USER,
            loggedUser: user
        }
        store.dispatch(action)
    } catch (error) {
        console.log(error);
    }
}

export async function signup(userCred) {
    try {
        const loggedUser = await userService.signup(userCred)
        const action = {
            type: SET_LOGGEDIN_USER,
            loggedUser: loggedUser
        }
        store.dispatch(action)
    } catch (error) {
        console.log(error);
    }
}

export async function updateUser(user) {
    try {
        const updatedUser = await userService.updateUser(user)
        const action = {
            type: UPDATE_USER,
            updatedUser: updatedUser
        }
        login(updatedUser.name)
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }

}


//FILTER BY IN STORE

