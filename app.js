import mongoose from 'mongoose'
import puppeteer from 'puppeteer'

import { getNews as ennaharNews } from './sources/ennahar.js'
import { getNews as echoroukNews } from './sources/echourouk.js'
import { getNews as elbiladNews } from './sources/elbilad.js'
import { getNews as dzayerinfoNews } from './sources/dzayerinfo.js'
import { getBreakingNews as elbiladBreaking } from './sources/elbilad.js'
import { getBreakingNews as echoroukBreaking } from './sources/echourouk.js'
import { getBreakingNews as ennaharBreaking } from './sources/ennahar.js'
import { getBreakingNews as dzayerinfoBreaking } from './sources/dzayerinfo.js'

import ArticleSchema from './schema/Article.js'

export let page = null

mongoose.connect('mongodb://localhost/dznews', { useNewUrlParser: true })
const db = mongoose.connection

const sources = ['ennahar', 'elbilad', 'echorouk', 'dzayerinfo']

const Article = mongoose.model('article', ArticleSchema, 'articles')

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected')
  initializeBrowser()

  Article.find((err, res) => {
    // console.log(res)
  }).limit(10)
})

const initializeBrowser = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true })
    page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 926 })
    combineSources()
  } catch (error) {
    console.log(error)
  }
}

const combineSources = async () => {
  const articles = []

  const result = []

  result.push((await ennaharNews(1)).concat(await ennaharNews(2)))
  result.push((await elbiladNews(1)).concat(await elbiladNews(2)))
  result.push((await echoroukNews(1)).concat(await echoroukNews(2)))
  result.push((await dzayerinfoNews(1)).concat(await dzayerinfoNews(2)))

  const maxSize = Math.max(
    result[0].length,
    result[1].length,
    result[2].length,
    result[3].length
  )

  let index = 0
  while (index < maxSize) {
    result.forEach((source) => {
      if (source[index]) articles.push(new Article(source[index]))
    })
    index++
  }

  try {
    Article.create(articles)
  } catch (error) {}
  //console.log(articles)
}
