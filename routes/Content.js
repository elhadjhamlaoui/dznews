import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  const page = req.query.page > 1 ? req.query.page : 0
  Article.find((err, result) => {
    const response = {
      articles: result,
    }
    res.send(response)
  })

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
    .sort({ created_at: -1 })

    .skip(page * 10)
    .limit(10)
})

export default router
