const os = require('os');
module.exports.result = function (data,code,message) {
 return {
    code:code?code:0, //0 表示成功 
    message:message?message:'请求成功',
    data:data?data:{}
 }   
}
///////////////////获取本机ip///////////////////////
module.exports.getIPAdress = function(){
   var interfaces = os.networkInterfaces();

   for (var devName in interfaces) {
       var iface = interfaces[devName];
       for (var i = 0; i < iface.length; i++) {
           var alias = iface[i];
           if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
               return 'http://' + alias.address + ':';
           }
       }
   }
}