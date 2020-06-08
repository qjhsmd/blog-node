module.exports.index = function (req, res) {
    let info = {
        email: req.app.locals.email,
        title: req.app.locals.title
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

        num = Math.round(Math.random() * result[0]['count(*)'])
        var sql = 'SELECT chicken_name FROM chicken_soup WHERE id= "' + num + '"'; //查询鸡汤数量
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
    let info = [
        req.body.title,
        req.body.describe,
        req.body.classify_id[req.body.classify_id.length - 1],
        req.body.content,
        new Date(),
    ]

    if (!req.body.title) {
        res.json(req.app.locals.result({}, -1, '文章名字不能为空'));
        return false
    }
    if (!req.body.classify_id[req.body.classify_id.length - 1]) {
        res.json(req.app.locals.result({}, -1, '请选择文章分类'));
        return false
    }
    if (!req.body.content) {
        res.json(req.app.locals.result({}, -1, '文章内容不能为空'));
        return false
    }
    if (!req.body.describe) {
        res.json(req.app.locals.result({}, -1, '描述不能为空'));
        return false
    }

    var select_sql = 'SELECT  name FROM classify WHERE id = "' + req.body.classify_id[req.body.classify_id.length - 1] + '"';
    req.app.locals.connection.query(select_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        info.push(result[0].name) // 添加 classify_name
        console.log(info)
        var sql = 'INSERT INTO artcle (title,artcle_describe,classify_id,content,creat_time,classify_name) VALUES (?,?,?,?,?,?)'; //创建文章
        req.app.locals.connection.query(sql, info, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
    
            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            res.json(req.app.locals.result({},0,"文章创建成功"));
            console.log('------------------------------------------------------------\n\n');
        });
    });
}

// module.exports.list_artcle = function(req,res) {
//     var select_sql = 'SELECT count(*) FROM artcle'
//     console.log(req.query)
//     req.app.locals.connection.query(select_sql, function (err, result) {
//         if (err) {
//             console.log('[SELECT ERROR] - ', err.message);
//             return;
//         }

//         console.log('--------------------------SELECT----------------------------');
//         console.log(result[0]['count(*)']);
//         console.log('------------------------------------------------------------\n\n');
//     });
// }
module.exports.list_artcle = function(req,res) {
    let info={
        total:0,
        list:[]
    }
    console.log(req.cookies.count)

    if(!req.cookies.count){
        res.cookie('count', 1, {path: '/', expires: new Date(Date.now() + 3600 * 1000)});
        let add_sql = 'update artcle set view_count=view_count+1 where id = 2'
        req.app.locals.connection.query(add_sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
        });
    }else{
        console.log('已经打开了')
        
    }
    

    

        var select_sql = 'SELECT count(*) FROM artcle'
        req.app.locals.connection.query(select_sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }

            info.total = result[0]['count(*)']

            var select_sql1 = 'SELECT title,artcle_describe,classify_id,creat_time,classify_name,view_count FROM artcle ORDER BY creat_time DESC limit '+(req.query.page-1)*req.query.pageSize+','+req.query.pageSize + ''
            
            req.app.locals.connection.query(select_sql1, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    res.json(req.app.locals.result({},-1,err.message));
                    return;
                }
                info.list = result
                console.log('--------------------------SELECT----------------------------');
                // console.log(result);
                res.json(req.app.locals.result(info));
                console.log('------------------------------------------------------------\n\n');
            });

        });

    
}
