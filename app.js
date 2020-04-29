import mongoose from 'mongoose'
import puppeteer from 'puppeteer'
import express from 'express'

import articlesRouter from './routes/Articles.js'
import { fetchNews, fetchBreaking } from './utils/fetchNews.js'
import { getCoronaNews } from './sources/skynews.js'

let page = null
let pageBreaking = null

const app = express()

app.use('/api/articles', articlesRouter)

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/dznews', { useNewUrlParser: true })
const db = mongoose.connection

const sources = ['ennahar', 'elbilad', 'echorouk', 'dzayerinfo']

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected')
  initializeBrowser()
  app.listen(port, () => console.log(`started listening at port ${port} ...`))
})

const initializeBrowser = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 926 })
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    )

    pageBreaking = await browser.newPage()
    await pageBreaking.setViewport({ width: 1920, height: 926 })
    await pageBreaking.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    )

    startNewsFetching()
    startBreakingFetching()
  } catch (error) {
    console.log(error)
  }
}

const startNewsFetching = () => {
  fetchNews()
  setInterval(() => {
    fetchNews()
  }, 1000 * 60 * 10)
}

const startBreakingFetching = () => {
  fetchBreaking()

  setInterval(() => {
    fetchBreaking()
  }, 1000 * 60 * 5)
}

export { mongoose, page, pageBreaking }
