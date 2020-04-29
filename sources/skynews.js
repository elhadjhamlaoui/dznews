import { page } from '../app.js'

export const getCoronaNews = async () => {
  const url =
    'https://www.skynewsarabia.com/tag?s=%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1%20%D9%83%D9%88%D8%B1%D9%88%D9%86%D8%A7'

  await page.goto(url, {
    waitUntil: 'load',
    // Remove the timeout
    timeout: 0,
  })

  // get hotel details
  let articles = await page.evaluate(() => {
    let articles = []
    // get the hotel elements
    let articleElms = document.querySelectorAll('div[class~="each-result"]')
    // get the hotel data
    articleElms.forEach((element) => {
      let article = {}
      try {
        article.source = 'skynews'
        article.sourceAr = 'سكاي نيوز'
        article.topic = 'corona'

        article.image =
          'https://www.skynewsarabia.com' +
          element
            .querySelector('img[class="ng-scope"]')
            .getAttribute('data-sna-lazy-src')

        article.title = element.querySelector('h3').textContent

        article.link =
          'https://www.skynewsarabia.com' +
          element.querySelector('a[class~="item-wrapper"]').getAttribute('href')

        article.readableTime = element.querySelector(
          'div[class~="date-time"] > span'
        ).textContent
      } catch (exception) {}
      articles.push(article)
    })

    return articles
  })
  return articles
}
