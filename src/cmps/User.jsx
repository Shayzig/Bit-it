import React, { useEffect, useState } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons'

export default function User({ loggedInUser }) {

    const [bitcoinRate, setBitcoinRate] = useState(null)

    useEffect(() => {
        if (loggedInUser) loadBitcoinRate()
    }, [loggedInUser])

    const formatToUSD = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }


    async function loadBitcoinRate() {
        try {
            const userBitcoinRate = await bitcoinService.getBitcoinRate(loggedInUser.coins)
            setBitcoinRate(userBitcoinRate)
        } catch (error) {
            console.log(error)
        }
    }

    if (!loggedInUser) return
    return (
        <section className="user-container">
            <div className="user">
                <img className='avatar' src={loggedInUser.img} alt="" />
                <h2 className='name'>Hello, {loggedInUser.name}</h2>
                <h2 className='coins'>USD</h2>
                <div className="user-coins">{formatToUSD(loggedInUser.coins)}</div>
                <h2 className='btc'>BIT</h2>
                <div className="rate"><FontAwesomeIcon icon={faBitcoinSign} style={{ color: "#71b20f", fontSize:"0.9em" }} /> {bitcoinRate}</div>
            </div>
        </section>

    )
}
