const mongo = require('mongodb').MongoClient
const key = require('./config.js');
const users = (req,res) => {
  mongo.connect(key.mongodb,
    (err, client) => {
      if (err) {
        console.log('Connection error: ', err)
        throw err
      }
      const db = client.db("UserData")
      db.collection('LoginAndPassword').find({}).toArray((err,result) => {
        if (err) {
          throw err
        } else {
          if (result) {
           console.log(result);
           res.render('users', {result})
          }
          else {
            console.log(result);
            res.redirect('/prifile')
          }
        }
        client.close()
      })
      console.log('Connected')

    }
  )
}

module.exports = users