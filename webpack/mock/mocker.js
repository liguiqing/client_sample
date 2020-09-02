const jwt = require('jsonwebtoken');
const users = require('./data/account.json');

const accessTokenSecret = '卐malimalihon卍';
var logIns = {};
/**
 * app is a express instance
 * API: https://expressjs.com/zh-cn/api.html
 * @param {*} app
 */
function Mock(app) {
  app.post('/api/authenticate', function (req, res) {
    console.log(`POST /api/authenticate body:${JSON.stringify(req.body)}`);
    const { login, password } = req.body;
    const user = users.find(u => {
      return u.login === login && u.password === password;
    });
    if (user) {
      console.log('Loging success !');
      console.log(login);
      const accessToken = jwt.sign({ username: user.login, role: user.authorities }, accessTokenSecret);
      logIns[accessToken] = user;
      res.setHeader('authorization', 'Bearer ' + accessToken);
      res.sendStatus(200);
    } else {
      res.status(401).send({ error: '用户名或密码错误', message: 'error.http.401', title: 'Unauthorized' });
    }
  });

  app.get('/api/account', function (req, res) {
    console.log(req.headers.authorization);
    const user = logIns[req.headers.authorization.split(' ')[1]];
    if (user) {
      console.log(`GET /api/account :${JSON.stringify(user)}`);
      res.json(user);
    } else {
      res.status(403).send({ detail: '非法访问', message: 'error.http.403' });
    }
  });

  app.put('/api/account/settings', function (req, res) {
    console.log('POST /api/account/settings');
    res.json(req.body);
  });

  app.get('/api/account/all', function (req, res) {
    res.json(users);
  });
}

module.exports = Mock;
