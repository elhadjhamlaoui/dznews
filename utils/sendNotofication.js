import admin from 'firebase-admin'
import serviceAccount from '../config/config.js'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dznews-19be3.firebaseio.com',
})

const sendNotification = (article) => {
  var message = {
    android: {
      priority: 'high',
    },
    data: {
      body: article.title,
      image: article.image,
      type: 'news',
      article: JSON.stringify(article),
    },

    topic: 'dznews',
  }

  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response)
    })
    .catch((error) => {
      console.log('Error sending message:', error)
    })
}

export default sendNotification
