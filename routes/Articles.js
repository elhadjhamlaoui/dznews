import express from 'express'
import { mongoose } from '../app.js'

import ArticleSchema from '../schema/Article.js'

const router = express.Router()

const Article = mongoose.model('article', ArticleSchema, 'articles')
const Breaking = mongoose.model('breaking', ArticleSchema, 'breakings')

router.get('/', (req, res) => {
  const page = req.query.page > 1 ? req.query.page : 0
  Article.find((err, result) => {
    /*const used = process.memoryUsage()
    let out = ''
    for (let key in used) {
      out += `Memory: ${key} ${
        Math.round((used[key] / 1024 / 1024) * 100) / 100
      } MB`
    }*/

    const response = {
      articles: result,
    }
    res.send(response)
  })

    .sort({ _id: -1 })
    .skip(page * 10)
    .limit(10)
})

router.get('/breaking', (req, res) => {
  const page = req.query.page > 1 ? req.query.page : 0
  Breaking.find((err, result) => {
    const response = {
      articles: result,
    }
    res.send(response)
  })
    .sort({ _id: -1 })
    .skip(page * 10)
    .limit(10)
})

router.get('/corona', (req, res) => {
  const page = req.query.page > 1 ? req.query.page : 0

  Article.find({ topic: 'corona' })
    .sort({ _id: -1 })
    .exec((err, result) => {
      const response = {
        articles: result,
      }
      res.send(response)
    })
})

export default router
