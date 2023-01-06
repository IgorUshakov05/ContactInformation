const cookieParser = require('cookie-parser')
const key = require('./config.js');
const mongo = require('mongodb').MongoClient;
const user = (req,res) => {
  console.log(req.params.id);
  mongo.connect(key.mongodb,
    (err, client) => {
      if (err) {
        console.log('Connection error: ', err)
        throw err
      }
      else {
        const db = client.db('UserData')
        db.collection("LoginAndPassword").findOne({ Identifier: Number(req.params.id) }, (err, result) => {
          if (err) {
            throw err
          } else {
            console.log(result);
            if (result) {
              res.render('user', { name: result.name, number: result.number, email: result.email, meal: result.meal})
            } else {
              res.redirect("/")
            }
          }
          client.close()
        })
      }

      console.log('Connected')

    }
  )
}

module.exports = user

