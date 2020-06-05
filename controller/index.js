module.exports.index = function (req, res) {
    let info ={
        email:req.app.locals.email,
        title:req.app.locals.title
    }
        res.json(req.app.locals.result(info));
};
module.exports.baseInfo = function (req, res) {
    var sql = 'SELECT * FROM base_info';
    //查
    req.app.locals.connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(req.app.locals.result(result[0]));
        console.log('------------------------------------------------------------\n\n');
    });
};
module.exports.demo = function (req, res) {
    console.log('======session========')
    console.log(req.app.locals)
    console.log('========session======')
    var sql = 'SELECT * FROM user';
    //查
    req.app.locals.connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(result);
        console.log('------------------------------------------------------------\n\n');
    });
};

module.exports.menu = function (req, res) {
    var sql = 'SELECT * FROM menu'; //查菜单
    req.app.locals.connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(result);
        console.log('------------------------------------------------------------\n\n');
    });
};
module.exports.chicken = function (req, res) {
    var sql = 'SELECT count(*) FROM chicken_soup'; //查询鸡汤数量
    // 获取随机数
    var num = 0 
    req.app.locals.connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        num =  Math.round(Math.random()*result[0]['count(*)'])
        var sql = 'SELECT chicken_name FROM chicken_soup WHERE id= "'+ num + '"'; //查询鸡汤数量
        req.app.locals.connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
    
            console.log('--------------------------SELECT----------------------------');
            console.log(result[0]);
            res.json(result[0]);
            console.log('------------------------------------------------------------\n\n');
        });

    
    });
};
module.exports.create_artcle = function (req, res) {
    let info =[
        req.body.title,
        req.body.classify_id,
        req.body.classify_name,
        req.body.content,
        new Date()
    ]
 console.log(new Date())
    var sql = 'INSERT INTO artcle (title,classify_id,classify_name,content,creat_time) VALUES (?,?,?,?,?)'; //查询毒鸡汤数量
    // 获取随机数
    var num = 0 
    req.app.locals.connection.query(sql,info,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            res.json(req.app.locals.result());
            console.log('------------------------------------------------------------\n\n');
    });
}