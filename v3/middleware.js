module.exports = function (req, res, next) {
  if (req.method === 'DELETE') {
    res.status(401).send('no you may not')
  } else {
    next()
  }
}
