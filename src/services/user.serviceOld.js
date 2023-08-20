import { storageService } from './storageService.js'
import { makeId } from './utilService.js'

export const userService = {
    getLoggedInUser,
    logIn,
    signUp,
    query,
    getEmptyUser,
    saveUser
}

const USERS = 'users'
const LOGGED_IN_USER = 'loggedInUser'

const gDefaultUsers = [
    { _id:"a123" ,name: 'Moshe', coins: 100, moves: [], img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80' },
    { _id:"a124" ,name: 'Shay', coins: 100, moves: [], img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80' },
    { _id:"a125", name: 'Puki', coins: 100, moves: [
            { to: "Faulkner Flores", at: new Date().toLocaleString(), amount: 3 + 'coins' },
            { to: "Faulkner Flores", at: new Date().toLocaleString(), amount: 3 + 'coins' },
            { to: "Dominique Soto", at: new Date().toLocaleString(), amount: 3 + 'coins' },
            { to: "Faulkner Flores", at: new Date().toLocaleString(), amount: 3 + 'coins' },
        ], img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
    }
]

var gUsers = _loadUsers()

function logIn(u) {
    const user = gUsers.find(user => user.name === u.name)
    if (!user) return
    storageService.store(LOGGED_IN_USER, user)
}

function signUp(user) {
    user._id = makeId()
    user.coins = 100
    
    gUsers.push(user)
    storageService.store(USERS, gUsers)
    signIn(user)
}

function getLoggedInUser() {
    const loggedInUser = storageService.load(LOGGED_IN_USER)
    return loggedInUser
}

function query() {
    return gUsers
}

function getById(id) {
    const user = gUsers.find(user => user._id === id)
    return user
}

function remove(id) {
    const idx = gUsers.findIndex(user => user._id === id)
    gUsers.splice(idx, 1)
    if (!gUsers.length) gUsers = gUsers.slice()
    storageService.store(USERS, gUsers)
}

function getEmptyUser() {
    return {
        name: '',
        coins: '',
        img: ''
    }
}

function _loadUsers() {
    let users = storageService.load(USERS)
    if (!users || !users.length) users = gDefaultUsers
    storageService.store(USERS, users)
    return users
}

function saveUser(userToSave) {
    if (userToSave._id) {
        const idx = gUsers.findIndex(user => user._id === userToSave._id)
        gUsers.splice(idx, 1, userToSave)
    } else {
        userToSave._id = makeId()
        gUsers.push(userToSave)
    }
    storageService.store(USERS, gUsers)
}

