const mongo = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const key = require('./config.js');
const generate = require('./generateCookie.js');

const mongod = (req, res, next) => {
  console.log(req.body);
  let cookie = generate()
  mongo.connect(key.mongodb,
    (err, client) => {
      if (err) {
        console.log('Connection error: ', err)
        throw err
      }
      const db = client.db('UserData')
      db.collection("LoginAndPassword").updateOne({ number: req.body.num, password: req.body.pas },{$set: {session:cookie.toString()}}, (err, result) => {
        if (err) {
          throw err
        }else {
          console.log(result.modifiedCount);
          if (result.modifiedCount == 1) {
            res.cookie('user', cookie)
            setTimeout(() => {
              res.redirect('/prifile')
            },100)
          }
          else {
            res.redirect('/')
          }
        }
        client.close()
      })
      console.log('Connected')
    }
  )
}

module.exports = mongod