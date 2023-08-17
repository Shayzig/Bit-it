import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import { bitcoinService } from '../services/bitcoin.service'

export default function User() {

    const [user, setUser] = useState(null)
    const [bitcoinRate, setBitcoinRate] = useState(null)

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) loadBitcoinRate()
    }, [user])

    function getUser() {
        const currUser = contactService.getUser()
        setUser(currUser)
    }

    async function loadBitcoinRate() {
        try {
            const userBitcoinRate = await bitcoinService.getBitcoinRate(user.coins)
            setBitcoinRate(userBitcoinRate)
        } catch (error) {
            console.log(error);
        }
    }

    if (!user) return

    return (
        <section className="user-container full">
            <div className="user">
                <img className='avatar' src={user.img} alt="" />
                <h2 className='name'>Hello, {user.name}</h2>
                <h2 className='coins'>Current Coins</h2>
                <div className="user-coins">{user.coins}</div>
                <h2 className='btc'>Bitcoin rate</h2>
                <div className="rate"> {bitcoinRate}</div>
            </div>

        </section>

    )
}
