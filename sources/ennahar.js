import { page, pageBreaking } from '../app.js'
import url from 'url'

export const getNews = async (num) => {
  const urlString = url.parse(
    'https://www.ennaharonline.com/الأخبار-المميزة/page/' + num
  )

  await page.goto(urlString, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })
  let articles = []
  try {
    articles = await page.evaluate(() => {
      let articles = []
      // get the hotel elements
      let articleElms = document.querySelectorAll('article[class="article"]')
      // get the hotel data
      articleElms.forEach((element) => {
        let article = {}
        try {
          article.source = 'ennahar'
          article.sourceAr = 'النهار'

          article.image =
            element
              .querySelector('div[class~="article__image"] > a')
              .getAttribute('data-bg') ||
            element
              .querySelector('div[class~="article__image"] > a')
              .getAttribute('style')
              .split('"')[1]

          article.title = element.querySelector(
            'div[class~="article__meta"] > h2 > a'
          ).textContent

          article.link = element
            .querySelector('div[class~="article__meta"] > h2 > a')
            .getAttribute('href')

          article.readableTime = element
            .querySelector('div[class~="article__meta"] > time')
            .getAttribute('title')

          article.dateTime = element
            .querySelector('div[class~="article__meta"] > time')
            .getAttribute('title')
        } catch (exception) {}
        articles.push(article)
      })
      return articles
    })
  } catch (error) {
    console.log(error)
  }

  return articles
}

export const getBreakingNews = async () => {
  const url = 'https://www.ennaharonline.com/'

  await pageBreaking.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await pageBreaking.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll(
      'article[class="latest-news__article"]'
    )
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'ennahar'
        article.sourceAr = 'النهار'

        article.title = element.querySelector('h2 > a').textContent
        article.link = element.querySelector('h2 > a').getAttribute('href')

        article.readableTime = element.querySelector('time').textContent
        article.dateTime = element
          .querySelector('time')
          .getAttribute('datetime')
      } catch (exception) {}
      articles.push(article)
    })
    return articles
  })

  return articles
}
