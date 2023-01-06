
const exit = (req,res) => {
  res.clearCookie('user')
  res.redirect('/')
} 
module.exports = exit