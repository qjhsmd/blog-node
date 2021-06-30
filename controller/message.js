module.exports.creat_message = function (req, res) {
    console.dir(req.body);
    let info = [
        req.body.email,
        req.body.message,
        new Date(),
    ]
    console.log(info);
    var sql = 'INSERT INTO messages (email,message) VALUES ("'+info[0]+'","'+info[1]+'")'; //留言创建
        req.app.locals.mysqlQuery(sql,function (err, result) {
            console.log(err);
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