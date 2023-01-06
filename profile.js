const cookieParser = require('cookie-parser')
const key = require('./config.js');
const mongo = require('mongodb').MongoClient;
const profile = (req, res) => {
  let coc = req.cookies.user
  if (coc == undefined) {
    res.redirect('/')
  }
  console.log(coc + '- profile');
  mongo.connect(key.mongodb,
    (err, client) => {
      if (err) {
        console.log('Connection error: ', err)
        throw err
      }
      else {
        const db = client.db('UserData')
        db.collection("LoginAndPassword").findOne({ session: coc }, (err, result) => {
          if (err) {
            console.log(err);
            res.status(404)
          } else {
            console.log(result);
            if (result) {
              res.render('profile', { name: result.name, number: result.number, email: result.email, meal: result.meal, password: result.password })
            }
            else {
              res.redirect('/')
            }
          }
          client.close()
        })
      }

      console.log('Connected')

    }
  )
}

module.exports = profile