import { mongoose } from '../app.js'
import { getNews as ennaharNews } from '../sources/ennahar.js'
import { getNews as echoroukNews } from '../sources/echourouk.js'
import { getNews as elbiladNews } from '../sources/elbilad.js'
import { getNews as dzayerinfoNews } from '../sources/dzayerinfo.js'
import { getBreakingNews as elbiladBreaking } from '../sources/elbilad.js'
import { getBreakingNews as echoroukBreaking } from '../sources/echourouk.js'
import { getBreakingNews as ennaharBreaking } from '../sources/ennahar.js'
import { getBreakingNews as dzayerinfoBreaking } from '../sources/dzayerinfo.js'

import { getCoronaNews } from '../sources/skynews.js'

import ArticleSchema from '../schema/Article.js'

import sendNotofication from './sendNotofication.js'

const Article = mongoose.model('article', ArticleSchema, 'articles')
const Breaking = mongoose.model('breaking', ArticleSchema, 'breakings')

const notifiedArticles = []

export const fetchNews = async () => {
  const articles = []

  const result = []

  try {
    result.push(await getCoronaNews())
    result.push((await ennaharNews(1)).concat(await ennaharNews(2)))
    result.push((await elbiladNews(1)).concat(await elbiladNews(2)))
    result.push((await echoroukNews(1)).concat(await echoroukNews(2)))
    result.push((await dzayerinfoNews(1)).concat(await dzayerinfoNews(2)))

    const maxSize = Math.max(
      result[0].length,
      result[1].length,
      result[2].length,
      result[3].length,
      result[4].length
    )

    let index = 0
    while (index < maxSize) {
      result.forEach((source, i) => {
        if (source[index]) {
          const article = new Article(source[index])
          articles.push(article)

          if (index == 0) {
            const found = notifiedArticles.find(
              (value) => article.title === value.title
            )
            if (!found) {
              notifiedArticles.push(article)
              setTimeout(() => {
                sendNotofication(article)
              }, i * 60 * 1000)
            }
          }
        }
      })
      index++
    }

    Article.create(articles).catch((error) => {})
  } catch (error) {}
}

export const fetchBreaking = async () => {
  const articles = []

  const result = []

  try {
    result.push(await ennaharBreaking())
    result.push(await elbiladBreaking())
    result.push(await echoroukBreaking())
    result.push(await dzayerinfoBreaking())

    const maxSize = Math.max(
      result[0].length,
      result[1].length,
      result[2].length,
      result[3].length
    )

    let index = 0
    while (index < maxSize) {
      result.forEach((source) => {
        if (source[index]) articles.push(new Breaking(source[index]))
      })
      index++
    }

    Breaking.create(articles).catch((error) => {})
  } catch (error) {}
}
