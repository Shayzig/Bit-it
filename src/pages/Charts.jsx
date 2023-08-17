import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import { bitcoinService } from '../services/bitcoin.service'

export default function Charts() {
  const [marketPrice, setMarketPrice] = useState(null)
  const [tradeVol, setTradeVol] = useState(null)

  useEffect(() => {
    getMarketPrice()
    getConfirmedTransactions()
  }, [])

  function formatTime(time) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ]

    const newTime = new Date(time * 1000)
    const year = newTime.getFullYear()
    const month = monthNames[newTime.getMonth()] // Get the month name from the array

    return year + ' ' + month
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
      setTradeVol(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="charts-container">
      <LineChart width={800} height={600} data={formattedTradeData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="price" stroke="#aeff5a" />
        <CartesianGrid stroke="#ffffff48" strokeDasharray="5 5" />
        <XAxis
          stroke="white"
          dataKey="x" />
        <YAxis
          stroke="white"
          tickFormatter={value => formatToUSD(value)}
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #ccc', color: "white" }}
          formatter={(value) => formattedTradeData.find(item => item.price === value)?.formattedPrice} />
      </LineChart>

      <LineChart width={800} height={600} data={formattedMarketData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="price" stroke="#aeff5a" />
        <CartesianGrid stroke="#ffffff48" strokeDasharray="5 5" />
        <XAxis
          stroke="white"
          dataKey="x" />
        <YAxis
          stroke="white"
          tickFormatter={value => formatToUSD(value)}
        />
        <Tooltip
          contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid #ccc', color: "white" }}
          formatter={(value) => formattedMarketData.find(item => item.price === value)?.formattedPrice} />
      </LineChart>


    </div>
  )
}
