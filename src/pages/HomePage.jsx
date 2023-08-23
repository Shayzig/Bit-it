import React, { useEffect } from 'react'
import User from '../cmps/User'
import Charts from '../pages/Charts'
import MoveList from '../cmps/MoveList'
import { useSelector } from 'react-redux'
import { loadLoggedInUser } from '../store/actions/user.actions'

export default function HomePage() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
    }, [loggedInUser])
    console.log('home-user', loggedInUser);

    return (
        <>
            <div className="main-content">
                <User loggedInUser={loggedInUser} />
                <MoveList loggedInUser={loggedInUser} />
            </div>
            {/* <Charts /> */}
        </>

    )
}
