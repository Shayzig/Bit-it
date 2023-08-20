import { makeId } from './utilService.js'
import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    getEmptyUser,
    updateUser
}

window.userService = userService

function getUsers() {
    return storageService.query('user')
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.name === userCred.name)
    if (user) {
        return saveLocalUser(user)
    }
    return user
}

async function signup(userCred) {
    const users = await storageService.query('user')
    const userCheck = users.find(user => user.name === userCred.name)
    if (userCheck) return

    if (!userCred.img) userCred.img = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { _id: user._id, name: user.name, img: user.img, coins: user.coins, moves: user.moves }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyUser() {
    return {
        name: '',
        coins: '',
        img: '',
        moves: [],
        coins: 100,

    }
}

async function updateUser(userToSave) {
    try {
        const user = await storageService.put('user', userToSave)
        saveLocalUser(userToSave)
        return user
    } catch (error) {
        console.log(error);
    }

}

// Initial data
// ;(async ()=>{
//     await userService.signup({ name: 'Moshe', coins: 10000, moves: [], img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80' })
//     await userService.signup({ name: 'Shay', coins: 10000, moves: [], img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80' })
// })()

