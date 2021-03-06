var express =require('express');
var bodyParser = require('body-parser'); //用于处理 post请求

var handler =require('./handler.js');
var verify = require('./util/verify')
var router =express.Router();

//设置跨域请求头 全局跨域处理 
router.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Origin", "http://10.31.52.38:8888")
   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
   res.header("X-Powered-By", ' 3.2.1')
   // res.header("Content-Type", "application/json;charset=utf-8")
   res.header('Access-Control-Allow-Credentials', "true")
   next();
});

   // 创建 application/x-www-form-urlencoded 编码解析
 var urlencodedParser = bodyParser.urlencoded({ extended: false });
 var urlencodedParser1 = bodyParser.json();
   // router.get('/',handler.index)
   router.get('/api/baseInfo',handler.baseInfo)
   router.get('/api/menu',handler.menu)
   router.get('/api/classify',handler.classify)
   router.get('/api/social',handler.social)
   router.get('/api/focus/list',handler.features)
   router.get('/api/chicken',handler.chicken)
   // router.get('/api/poisonous_chicken',handler.poisonous_chicken)
   router.post('/api/create_artcle',handler.create_artcle)
   router.get('/api/list_artcle',verify.verifyToken,handler.list_artcle)
   router.get('/api/artcle_detail',handler.artcle_detail)
   
   // 后台接口
   router.post('/api/admin/login',handler.login)
   router.get('/api/admin/userInfo',verify.verifyToken,handler.userInfo)
   router.post('/api/admin/logout',handler.logout)

   router.post('/api/creat_message',handler.creat_message)
   module.exports = router;
