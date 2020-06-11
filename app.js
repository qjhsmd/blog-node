
var express = require('express');
var app = express();
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const cookieParser = require('cookie-parser');

var config = require('./config');
var router = require('./router');
var DBConfig = require('./DBConfig.js');
var tool = require('./util/tool.js');


app.use(cookieParser());

var sessionStore = new MySQLStore({
    expiration: 10800000,
    createDatabaseTable: true,  //是否创建表
    schema: {
        tableName: 'session_tab',   //表名
        columnNames: {      //列选项
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }

    }

}, DBConfig.connection);


//配置中间件
app.use(session({
    secret: "keyboard cat",
    resave: false,
    store: sessionStore,        //存储管理器
    saveUninitialized: true,
    cookie: ('name', 'value', {
        maxAge: 1 * 30 * 1000,
        secure: false,
        name: "seName",
        resave: false
    })
}));



app.locals.mysqlQuery = DBConfig.mysqlQuery
app.locals.result = tool.result
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use('/', router);
app.listen(config.port, function () {
    console.log('http://localhost:' + config.port)
    console.log(tool.getIPAdress() + config.port)
})