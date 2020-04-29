import { page, pageBreaking } from '../app.js'

export const getNews = async (num) => {
  const url = 'https://www.echoroukonline.com/el-jazaair/page/' + num

  await page.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await page.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll(
      'article[class~="article-horiz"]'
    )
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'echourouk'
        article.sourceAr = 'الشروق'
        article.image = element
          .querySelector('div[class~="image"] > a')
          .getAttribute('data-bg')

        if (
          element.querySelector('div[class~="image"] > a').getAttribute('style')
        )
          article.image = element
            .querySelector('div[class~="image"] > a')
            .getAttribute('style')
            .split('"')[1]

        article.title = element.querySelector('h2 > a').textContent
        article.link = element.querySelector('h2 > a').getAttribute('href')

        article.desc = element.querySelector(
          'p.article-horiz__excerpt'
        ).textContent

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

export const getBreakingNews = async () => {
  const url = 'https://www.echoroukonline.com/'

  await pageBreaking.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await pageBreaking.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll('ul.sl2__ln-list li')
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'echourouk'
        article.sourceAr = 'الشروق'
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
