import React, { useEffect, useState } from 'react'
import { userService } from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { login, logout, signup } from '../store/actions/user.actions';

export default function LoginSignUp() {
    const navigate = useNavigate()

    const [isSignUp, setIsSignUp] = useState(false)
    const [userToLogin, setUser] = useState(userService.getEmptyUser())

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
        // setUser(loggedInUser)
    }, [loggedInUser])


    async function onLogin(ev) {
        try {
            ev.preventDefault()
            if (!userToLogin) return
            login(userToLogin)
            setIsSignUp(false)
            navigate('/')

        } catch (error) {
            console.log(error);
        }
    }
    console.log(loggedInUser);

    async function onSignUp(ev) {
        try {
            ev.preventDefault()
            signup(userToLogin)
            if (!userToLogin) return
            navigate('/')

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

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setUser(prevContact => ({
            ...prevContact,
            [field]: value
        }))
    }
    

    if (!userToLogin) return
    const { name } = userToLogin

    return (
        <div className="login-page">
            {!isSignUp && !loggedInUser &&
                <form onSubmit={onLogin} className='login-user' >
                    <h2>Sign in</h2>
                    <input onChange={handleChange} value={name} type="text" name="name" id="name" placeholder='Enter full name' />
                    <button className='save-btn'>Log in</button>
                    <br />
                    <br />
                    <br />

                </form>
            }

            {loggedInUser && <div className="user-name"> Welcom {loggedInUser.name} !</div>}
            <br />
            {loggedInUser && <div className="signout" onClick={onLogout}>Sign Out</div>}


            <br />

            {!isSignUp && !loggedInUser && <h2 onClick={() => setIsSignUp(true)}>Not a member? sign up here!</h2>}


            {isSignUp &&
                <form onSubmit={onSignUp} className='sign-up-user' >
                    <h2>Sign up</h2>
                    <input onChange={handleChange} value={name} type="text" name="name" id="name" placeholder='Enter full name' />
                    <button className='save-btn'>Sign Up</button>
                </form>}
            <br />
            <br />
            {isSignUp && <h2 onClick={() => setIsSignUp(false)}>Return sign in</h2>}
        </div>

    )
}
