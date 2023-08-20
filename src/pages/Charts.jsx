import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

import { bitcoinService } from '../services/bitcoin.service'
import { useParams } from 'react-router-dom'

export default function Charts() {
  const [marketPrice, setMarketPrice] = useState(null)
  const [tradeVol, setTradeVol] = useState(null)

  useEffect(() => {
    getMarketPrice()
    getConfirmedTransactions()
  }, [])

  function formatTime(time) {
    const newTime = new Date(time * 1000)
    const day = newTime.getDate()
    const month = newTime.getMonth() + 1
    const year = newTime.getFullYear()

    return `${day}.${month}.${year}`
  }

  function formatToUSD(amount) {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return formatter.format(amount)
  }

  if (!tradeVol) return
  const formattedTradeData = tradeVol.map(item => ({
    x: formatTime(item.x),
    price: item.y,
    formattedPrice: formatToUSD(item.y),
  }))

  if (!marketPrice) return
  const formattedMarketData = marketPrice.map(item => ({
    x: formatTime(item.x),
    price: item.y,
    formattedPrice: formatToUSD(item.y),
  }))

  async function getMarketPrice() {
    try {
      const res = await bitcoinService.getMarketPrice()
      setMarketPrice(res)
    } catch (error) {
      console.log(error)
    }
  }

  async function getConfirmedTransactions() {
    try {
      const res = await bitcoinService.getConfirmedTransactions()
      console.log(res)
      setTradeVol(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="charts-container">
      <h2 className='trade-title'>Exchange Trade Volume (USD)</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={800} height={600} data={formattedTradeData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Line type="monotone" dataKey="price" stroke="#aeff5a" />
            <CartesianGrid stroke="#ffffff30" strokeDasharray="5 5" />
            <XAxis
              stroke="white"
              dataKey="x"
              angle={-45}
              height={80}
              textAnchor="end"
            />
            <YAxis
              stroke="white"
              width={135}
              tickFormatter={value => formatToUSD(value)}
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #ccc', color: "white" }}
              formatter={(value) => formattedTradeData.find(item => item.price === value)?.formattedPrice} />
          </LineChart>
        </ResponsiveContainer>

        {/* <div className="market-container">
        <h2>Market</h2>
        <LineChart width={800} height={600} data={formattedMarketData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Line type="monotone" dataKey="price" stroke="#aeff5a" />
          <CartesianGrid stroke="#ffffff48" strokeDasharray="5 5" />
          <XAxis
            stroke="white"
            dataKey="x"
            angle={-45}
            height={80}
            textAnchor="end"
          />
          <YAxis
            stroke="white"
            width={78}
            tickFormatter={value => formatToUSD(value)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #ccc', color: "white" }}
            formatter={(value) => formattedMarketData.find(item => item.price === value)?.formattedPrice} />
        </LineChart>
      </div> */}


      </div >
    </>
  )
}
