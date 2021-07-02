var login =require('./controller/login.js')
var index =require('./controller/index.js')
var message =require('./controller/message.js')

// app.use(bodyparser.urlencoded({extende:true}));
// app.use(bodyparser.json())

// 测试 接口 
// index.list_artcle()

// 前后端分离的
module.exports.login = login.login
module.exports.userInfo = login.userInfo
module.exports.logout = login.logout

module.exports.index = index.index
module.exports.baseInfo = index.baseInfo
module.exports.demo = index.demo
module.exports.menu = index.menu
module.exports.classify = index.classify
module.exports.social = index.social
module.exports.features = index.features

module.exports.chicken = index.chicken
module.exports.poisonous_chicken = index.poisonous_chicken
module.exports.create_artcle = index.create_artcle
module.exports.list_artcle = index.list_artcle
module.exports.artcle_detail = index.artcle_detail

module.exports.creat_message = message.creat_message
