var jsonServer = require('json-server')
var path = require('path')
var server = jsonServer.create()
var router = jsonServer.router(path.join(__dirname, 'db.json'))
var middlewares = jsonServer.defaults()
var PORT = 3000

server.use(middlewares)

// Rewrite routes to use the prefix '/api'
server.use(jsonServer.rewriter({
  '/api/': '/'
}))

router.render = function (req, res) {
  // Make routes that include the count parameter just return a record count
  var params = req._parsedUrl.query.split('&')
  if (params.indexOf('count') !== -1) {
    res.jsonp({
      count: res.locals.data.length
    })
  } else {
    res.jsonp(res.locals.data)
  }
}

server.use(router)
server.listen(PORT, function () {
  console.log(`JSON Server is running on port ${PORT}`)
})
