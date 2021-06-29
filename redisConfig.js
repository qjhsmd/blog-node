var redis = require('redis'),
    config = require('./config'),
    dbConfig = config.redis,
    RDS_PORT = dbConfig.port,     //端口号
    RDS_HOST = dbConfig.host,     //服务器IP
    RDS_PWD = dbConfig.pass,      //密码
    RDS_OPTS = {auth_pass: RDS_PWD,no_ready_check:true},
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);



client.connect = function() {
    client.on('ready',function(res){
        console.log('ready');
    });
    
    client.on('end',function(err){
        console.log('end');
    });
    
    client.on('error', function (err) {
        console.log('=========redis错误输出开始========');
        console.log(err);
        console.log('=========redis错误输出完毕========');
    });
    
    client.on('connect',function(){
        console.log('redis connect success!');
    });
}
module.exports = client;

// client.set('name', 'zyc', function (err, res) {
//     // todo..
//     console.log(res);
// });

// client.get('name', function (err, res) {
//     // todo...  
//     console.log(res);
// });

// client.hmset("hosts", "mjr", "1", "another", "23", "home", "1234");

// client.hget("hosts",'mjr', function (err, obj) {
//     console.dir(obj);
// });

// client.hmset('key2', {
//     "0123456789": "abcdefghij", // NOTE: key and value will be coerced to strings 
//     "some manner of key": "a type of value"
// });

// client.hgetall("key2", function (err, obj) {
//     console.dir(obj);
// });