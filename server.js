const PORT = 3000;
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser')
app.use(express.urlencoded({
  extended: true
}));
const mongod = require('./mongo.js');
const profile = require('./profile.js')
const users = require('./users.js');
const user = require('./user.js');
const registation = require('./registation.js');
const middleware = require('./middleware.js');
const registationForm = require('./registationForm.js');
const exit = require('./exit.js');
app.use(cookieParser('secret key'))
app.use(express.static(__dirname))
app.set('view engine', 'ejs');
app.use(middleware)

app.get('/', (req, res) => {
  if (req.cookies.user == undefined) {
    res.render('index', { err: "Входи" })
  } else {
    res.redirect('/prifile')
  }
})
app.get('/users/:id', user)
app.get('/exit', exit)
app.post('/login', mongod)
app.get('/users', users)
app.get('/prifile', profile)
app.post('/registationForm', registationForm)
app.get('/registation', registation)

const start = (() => { try { app.listen(PORT, () => { console.log(`Server started to PORT: ${PORT}`); }) } catch (error) { console.log(error); } })()