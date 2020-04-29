import { page, pageBreaking } from '../app.js'

export const getNews = async (num) => {
  const url =
    'http://www.elbilad.net/article/index?q=%2Farticle%2Findex&id=20&page=' +
    num
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
      '#vertical_right > div[class="post"]'
    )
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'elbilad'
        article.sourceAr = 'البلاد'

        article.image = element
          .querySelector('div[class="right_area"] > a > img')
          .getAttribute('src')

        article.title = element.querySelector(
          'div[class="typo"] > .post_title > h3'
        ).textContent

        article.link = 'http://www.elbilad.net'
        article.link += element
          .querySelector('div[class="typo"] > .post_title')
          .getAttribute('href')

        article.desc = element.querySelector(
          'div[class="typo"] > p'
        ).textContent

        article.readableTime = element.querySelector(
          'div[class="right_area"] > .date'
        ).textContent
      } catch (exception) {
        console.log(exception)
      }
      articles.push(article)
    })
    return articles
  })

  return articles
}

export const getBreakingNews = async () => {
  const url = 'http://www.elbilad.net/'

  await pageBreaking.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await pageBreaking.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll('#top_core .odd')
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'elbilad'
        article.sourceAr = 'البلاد'

        article.image = element
          .querySelector('a > img')
          .getAttribute('data-original')

        article.title = element.querySelector('a.link').textContent

        article.link = 'http://www.elbilad.net'
        article.link += element.querySelector('a.link').getAttribute('href')

        article.readableTime =
          element.querySelector('.heure-date > .heure').textContent +
          element.querySelector('.heure-date > .date').textContent
      } catch (exception) {}
      articles.push(article)
    })
    return articles
  })

  return articles
}
