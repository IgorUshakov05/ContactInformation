const mongo = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser');
const key = require('./config.js');
const generateIndef = require('./generateInte.js');

const registationForm = (req, res) => {
  console.log(req.body);
  mongo.connect(key.mongodb,
    (err, client) => {
      if (err) {
        console.log('Connection error: ', err)
        throw err
      }
      const db = client.db('UserData')
      db.collection("LoginAndPassword").findOne({ number: req.body.num }, (err, result) => {
        if (err) {
          throw err
        } else {
          console.log(result);
          if (result) {
            res.redirect('/registation')
          } else {
            db.collection("LoginAndPassword").insertOne({ Identifier: generateIndef(),name: req.body.nam, email: req.body.ema, number: req.body.num, password: req.body.pas, meal: req.body.mea }, (err, result) => {
              if (err) {
                throw err
              } else {  
                res.redirect('/')
              }
              client.close()
            })
          }
        }
      })
      console.log('Connected')
    }
  )
}

module.exports = registationForm