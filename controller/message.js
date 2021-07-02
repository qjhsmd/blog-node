moment = require('moment')
module.exports.creat_message = function (req, res) {
    var sqlParams = {
        email: req.body.email,
        message: req.body.message,
        create_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
    // var sql = `INSERT INTO messages (email,message,create_time) VALUES (?,?,?)`; //留言创建
    var sql = 'INSERT INTO messages SET ?'; //留言创建
    req.app.locals.mysqlQuery(sql, sqlParams, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(req.app.locals.result({}, 0, "留言创建成功"));
        console.log('------------------------------------------------------------\n\n');
    });
};