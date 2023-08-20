import { faMaximize } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { bitcoinService } from '../services/bitcoin.service'

export default function MoveList({ contactLastMoves, loggedInUser }) {

  useEffect(() => {
    if (loggedInUser) loadBitcoinRate()
  }, [loggedInUser])

  const [bitcoinRate, setBitcoinRate] = useState(null)

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
      const bitcoinRate = await bitcoinService.getBitcoinRateG()
      setBitcoinRate(bitcoinRate)
    } catch (error) {
      console.log(error)
    }
  }

  function formatBitCoin(amount) {
    return (amount * bitcoinRate).toFixed(5)
  }

  return (
    <div className='moves-container'>
      {contactLastMoves && (
        <section className="moves-list">
          {contactLastMoves.map((move, index) => (
            <div className="move-preview" key={index}>
              <h2 className='move-to'>{move.to}</h2>
              <p className='amount'> <span className='bitcoin'> <span><img src="../../src/assets/imgs/bit-icon.png" alt="" /></span> {formatBitCoin(move.amount)}</span>
                <span>|</span> {formatToUSD(move.amount)}</p>
              <p className='move-at'>{move.at}</p>
            </div>
          ))}
        </section>
      )}

      {loggedInUser && (
        <>
          <div className="title">
            <FontAwesomeIcon icon={faMaximize} style={{ color: "#c6e6f0" }} />
            <h3>Last 5 moves</h3>
          </div>
          <section className="moves-list">
            {loggedInUser.moves.slice(-5).reverse().map((move, index) => (
              <div className="move-preview" key={index}>
                <h2 className='move-to'>To {move.to}</h2>
                <div className="amount">
                  <div className="bitcoin-icon">
                    {/* <img src="../../src/assets/imgs/bit-icon.png" alt="" /> */}
                  </div>
                  <h5 className='bitcoin-amount'>B {formatBitCoin(move.amount)}</h5>
                  <span>|</span>
                  <h5 className='us-amount'>{formatToUSD(move.amount)}</h5>
                </div>
                <p className='move-at'>{move.at}</p>
              </div>
            ))}
          </section>
        </>

      )}
    </div>
  )
}
