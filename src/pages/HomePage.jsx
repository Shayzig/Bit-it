import React, { useEffect } from 'react'
import User from '../cmps/User'
import Charts from '../pages/Charts'
import MoveList from '../cmps/MoveList'
import { useSelector } from 'react-redux'

export default function HomePage() {

    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    useEffect(() => {
    }, [])


    return (
        <>
            <User loggedInUser={loggedInUser} />
            <Charts />
            <MoveList loggedInUser={loggedInUser} />
        </>

    )
}
