const middleware = (req, res, next) => {
  console.log(`${req.protocol}://${req.hostname}${req.path}`);
  console.log(req.cookies.user + ' - middleware');
  next()
}

module.exports = middleware