const jwt = require('jsonwebtoken')
module.exports.verifyToken = function(req, res, next) {
    //传入要验证的token和密钥就可以了，然后回调函数拿取验证结果， 成功会返回你生成token时data自定义数据，过期时间等等，失败err拿到失败信息，比如token过期信息等等
    const token = req.headers['authorization'];
    if(typeof token !== 'undefined') {
      jwt.verify(token, 'secretkey', function(err, decoded) {
        if(err){
          console.log(err);
        //   res.sendStatus(403);
          res.json(req.app.locals.result('',-1,'登录过期'))
        }else{
            console.log('验证成功');
            req.query.user = decoded.user
          next();
          console.log(decoded) // bar
        }
      });
      
    } else {
    //   res.sendStatus(403);
    res.json(req.app.locals.result('',-1,'登录过期'))

    }
  }