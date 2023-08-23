import React, { useEffect, useState } from 'react'
import { userService } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login, logout, signup } from '../store/actions/user.actions';

export default function LoginSignUp() {
    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState(false)
    const [userName, setUserName] = useState('')
    const [emptyUser, setEmptyUser] = useState(userService.getEmptyUser())
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
    }, [loggedInUser])

    console.log('login-sign-user',loggedInUser);

    async function onLogin(ev) {
        try {
            ev.preventDefault()
            if (!userName) return
            login(userName)
            setIsSignUp(false)
            // navigate('/home')
        } catch (error) {
            console.log(error);
        }
    }

    async function onSignUp(ev) {
        try {
            ev.preventDefault()
            signup(emptyUser)
            if (!emptyUser) return
            // navigate('/home')

        } catch (error) {
            console.log(error);
        }
    }

    async function onLogout() {
        logout()
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        if (isSignUp) {
            setEmptyUser(prevEmptyUser => ({
                ...prevEmptyUser,
                [field]: value
            }))
        }
        setUserName(value)

    }

    const { name } = emptyUser
    return (
        <div className="login-container">

            {loggedInUser &&
                <div className="user-logged">
                    <div className="greet-user"> Welcom {loggedInUser.name} ! </div>
                    <div className="signout-btn" onClick={onLogout}>Sign Out</div>
                </div>}

            {!loggedInUser &&
                <form onSubmit={isSignUp ? onSignUp : onLogin} className={`user-input ${isSignUp ? "active" : ''}`} >
                    <h2 className='input-title'>{isSignUp ? 'Sign Up for free' : 'Sign in'}</h2>
                    <input onChange={handleChange} value={!isSignUp ? userName : name} type="text" name="name" id="name" placeholder='Enter guest' />
                    <div className="actions">
                        <button className='submit-btn' onClick={() => login(setUserName('Guest'))}>Guest mode</button>
                        <button className='submit-btn'>{isSignUp ? 'Sign up' : 'Login'}</button>
                    </div>
                    <div className="signup-action" onClick={() => setIsSignUp(!isSignUp)}>
                        {!isSignUp ? 'Not a member? sign up here!' : 'Back to Login'}</div>
                </form>}
        </div >

    )
}
