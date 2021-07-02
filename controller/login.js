
const jwt = require('jsonwebtoken')

module.exports.login = function (req, res) {
  // req.session.user = req.body.username;
  var sql = 'SELECT * FROM user  WHERE user_name="'+ req.body.username + '" and pass_word="'+req.body.password+'"'; //查
  req.app.locals.mysqlQuery(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    if(result.length === 0){
      res.json( 
          req.app.locals.result('',-1,'账号不存在或密码错误')
              );

    }else if(result.length === 1){
         /*
          iss:签发人
          iat:签发时间回溯30s
          exp:过期时间 这里可是使用秒数,也可以使用day
          "{"jti":1,"iss":"gumt.top","user":"goolge","iat":1555650413,"exp":1555657613}"
          "iat": ~~(Date.now() / 1000)-30,
          "exp": ~~(Date.now() / 1000)+(60*60),
      */
        const user = {
          "jti": 1,
          "iss": "cnnngt.top",
          "user": req.body.username,
          "eamil": 'qjh886@qq.com'
        }
        jwt.sign(user, "secretkey", { expiresIn: 3600*24 }, (err, token) => {
          // res.json({token})
          res.json(req.app.locals.result({token}, 0, "登录成功"));
        })
      // res.json(  req.app.locals.result(result) );

    }else if(result.length >1){

      res.json( 
          req.app.locals.result({},1,'账号异常')
              );

    }

    console.log('------------------------------------------------------------\n\n');
  });
  
};

module.exports.logout = function (req, res) {
  //注销session
  // req.session.destroy(function (err) {
    res.send(req.app.locals.result('success',0,'请求成功'));
  // });
}

module.exports.userInfo = function (req, res) {
  //获取用户信息
  var sql = 'SELECT user_name,id,roles,image FROM user WHERE user_name ="'+req.query.user+'" '; //查
  req.app.locals.mysqlQuery(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    res.json(req.app.locals.result(result[0],0,'请求成功'));
    console.log('------------------------------------------------------------\n\n');
  });
}
