import { page } from '../app.js'

export const getNews = async () => {
  const url =
    'https://dzayerinfo.com/ar/category/%d9%81%d9%8a-%d8%a7%d9%84%d9%88%d8%a7%d8%ac%d9%87%d8%a9/'

  await page.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await page.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll('li[class~="post-item"]')
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'dzayerinfo'
        article.sourceAr = 'الجزائرية للأخبار'

        article.image = element.querySelector('a img').getAttribute('src')

        article.title = element
          .querySelector('.post-details > .post-title a')
          .getAttribute('title')

        article.link = element
          .querySelector('.post-details > .post-title a')
          .getAttribute('href')

        article.desc = element.querySelector(
          '.post-details > .post-excerpt'
        ).textContent

        article.readableTime = element.querySelectorAll(
          '.post-details > .post-meta > span[class~="date"] > span'
        )[1].textContent
      } catch (exception) {}
      articles.push(article)
    })
    return articles
  })

  return articles
}

export const getBreakingNews = async () => {
  const url = 'https://dzayerinfo.com/'

  await page.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await page.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll('#widget_tabs-1-recent li')
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'dzayerinfo'
        article.sourceAr = 'الجزائرية للأخبار'

        article.image = element.querySelector('a img').getAttribute('src')

        article.title = element.querySelector('h3 a').textContent
        article.link = element.querySelector('h3 a').getAttribute('href')

        article.readableTime = element.querySelectorAll(
          'span[class~="date"] > span'
        )[1].textContent
      } catch (exception) {}
      articles.push(article)
    })
    return articles
  })

  return articles
}
