import axios from 'axios'
import { storageService } from './storageService.js'
const MARKET_KEY = 'market_db'
const TRADE_KEY = 'trade_db'

export const bitcoinService = {
    getBitcoinRate,
    getBitcoinRateG,
    getMarketPrice,
    getConfirmedTransactions
}


async function getBitcoinRate(coins) {
    const url = `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    const { data } = await axios.get(url)
    return data
}
async function getBitcoinRateG() {
    const url = `https://blockchain.info/tobtc?currency=USD&value=1`
    const { data } = await axios.get(url)
    return data
}

async function getMarketPrice() {
    let marketData = storageService.load(MARKET_KEY) || []
    if (marketData.length > 0) {
        console.log('from cash')
        return Promise.resolve(marketData)
    }
    const url = `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    const res = await axios.get(url)
    marketData = res.data.values
    storageService.store(MARKET_KEY, marketData)
    return marketData
}

async function getConfirmedTransactions() {

    let marketTrade = storageService.load(TRADE_KEY) || []
    if (marketTrade.length > 0) {
        console.log('from cash')
        return Promise.resolve(marketTrade)
    }

    const url = `https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`
    const res = await axios.get(url)
    marketTrade = res.data.values
    storageService.store(TRADE_KEY, marketTrade)
    return marketTrade

}