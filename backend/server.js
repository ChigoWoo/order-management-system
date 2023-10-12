const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./backend/db.json')
const middlewares = jsonServer.defaults()
const loginMiddlewares = (req, res, next) => {
  if (req.path == '/hello') {
    next();
  } else {
    if (req.method == 'POST' && req.path == '/login') {
      next()
    } else {
      if (req.headers.authorization === 'Bearer 89e38e0ca1c5857c5f848d49fcb825f72926635a') {
        next()
      } else {
        res.status(400).json({ message: 'Need Authentication' })
      }
    }
  }
}


server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(loginMiddlewares)


server.get('/hello', (req, res) => {
  res.jsonp({ message: 'Hello' });
})

server.post('/login', (req, res) => {
  if (req.body.username == 'admin' && req.body.password == 'password') {
    res.jsonp({ "token": "89e38e0ca1c5857c5f848d49fcb825f72926635a", user: { "id": "456", "name": "Chigo" } })
  } else {
    res.status(400).jsonp({ message: '用户名或密码错误' });
  }
})

server.use('/api', router)

server.listen(12306, () => {
  console.log('JSON Server is running at 12306')
})