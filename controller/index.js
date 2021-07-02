var client = require('../redisConfig.js')

module.exports.index = function (req, res) {
    let info = {
        email: req.app.locals.email,
        title: req.app.locals.title
    }
    res.json(req.app.locals.result(info));
};
module.exports.baseInfo = function (req, res) {
    // get 请求 先从redis取，如果没有，再从数据库去，取了之后同时存入redis
    client.hgetall('base_info', function (err, obj) {
        console.dir(obj);
        console.dir(err);
        if(err || !obj){
            console.log('获取缓存失败');
            var sql = 'SELECT * FROM base_info';//查
                req.app.locals.mysqlQuery(sql, function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        return;
                    }

                    console.log('--------------------------SELECT----------------------------');
                    console.log(result[0]);
                    res.json(req.app.locals.result(result[0]));
                    client.hmset('base_info',result[0]);
                    console.log('写入缓存');
                    console.log('------------------------------------------------------------\n\n');
                });
        }else{
            console.log('获取缓存成功');
            res.json(req.app.locals.result(obj));
            console.log('得到后就删除');
            client.del('base_info')
        }
    });

    
};
module.exports.demo = function (req, res) {
    console.log('======session========')
    console.log(req.app.locals)
    console.log('========session======')
    var sql = 'SELECT * FROM user';
    //查
    req.app.locals.mysqlQuery(sql, function (err, result) {
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
    req.app.locals.mysqlQuery(sql, function (err, result) {
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
module.exports.classify = function (req, res) {
    var sql = 'SELECT * FROM classify'; //查询分类
    req.app.locals.mysqlQuery(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(req.app.locals.result(result));
        console.log('------------------------------------------------------------\n\n');
    });
};
module.exports.social = function (req, res) {
    var sql = 'SELECT * FROM social'; //查询社交分类
    req.app.locals.mysqlQuery(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(req.app.locals.result(result));
        console.log('------------------------------------------------------------\n\n');
    });
};
module.exports.features = function (req, res) {
    var sql = 'SELECT * FROM features'; //查询焦点图
    req.app.locals.mysqlQuery(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        res.json(req.app.locals.result(result));
        console.log('------------------------------------------------------------\n\n');
    });
};
module.exports.chicken = function (req, res) {
    var sql = 'SELECT count(*) FROM chicken_soup'; //查询鸡汤数量
    // 获取随机数
    var num = 0
    req.app.locals.mysqlQuery(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        num = Math.round(Math.random() * result[0]['count(*)'])
        var sql = 'SELECT chicken_name FROM chicken_soup WHERE id= "' + num + '"'; //查询鸡汤数量
        req.app.locals.mysqlQuery(sql, function (err, result) {
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
    req.app.locals.mysqlQuery(select_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        info.push(result[0].name) // 添加 classify_name
        console.log(info)
        var sql = 'INSERT INTO artcle (title,artcle_describe,classify_id,content,creat_time,classify_name) VALUES (?,?,?,?,?,?)'; //创建文章
        req.app.locals.mysqlQuery(sql, info, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }

            console.log('--------------------------SELECT----------------------------');
            console.log(result);
            res.json(req.app.locals.result({}, 0, "文章创建成功"));
            console.log('------------------------------------------------------------\n\n');
        });
    });
}

module.exports.artcle_detail = function (req, res) {
    if (!req.cookies.artcle_id || req.cookies.artcle_id != req.query.id) {
        res.cookie('artcle_id', req.query.id, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
        let add_sql = 'update artcle set view_count=view_count+1 where id =' + req.query.id
        req.app.locals.mysqlQuery(add_sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
        });
    } else {
        console.log('已经打开过了')

    }
    var select_sql = 'SELECT * FROM artcle WHERE id = ' + req.query.id
    req.app.locals.mysqlQuery(select_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        res.json(req.app.locals.result(result[0]));
    });
}


// module.exports.artcle_detail = function (req, res) {
//     if (!req.cookies.artcle_id || req.cookies.artcle_id != req.query.id) {
//         res.cookie('artcle_id', req.query.id, { path: '/', expires: new Date(Date.now() + 3600 * 1000) });
//         let add_sql = 'update artcle set view_count=view_count+1 where id =' + req.query.id
//         req.app.locals.connection.getConnection(function (err, conn) {
//             if (err) {
//                 console.log(err, null, null);
//             } else {
//                 conn.query(add_sql, function (qerr, vals, fields) {
//                     console.log(qerr, vals, fields);
//                 });
//             }
//             // conn.release(); // not work!!!
//             req.app.locals.connection.releaseConnection(conn);
//         });

//         // req.app.locals.connection.getConnection(add_sql, function (err, result) {
//         //     if (err) {
//         //         console.log('[SELECT ERROR] - ', err.message);
//         //         return;
//         //     }
//         // });
//     } else {
//         console.log('已经打开过了')

//     }
//     var select_sql = 'SELECT * FROM artcle WHERE id = ' + req.query.id

//     req.app.locals.connection.getConnection(function (err, conn) {
//         if (err) {
//             console.log(err, null, null);
//         } else {
//             conn.query(select_sql, function (qerr, vals, fields) {
//                 console.log(qerr, vals, fields);
//                 res.json(req.app.locals.result(vals[0]));
//             });
//         }
//         // conn.release(); // not work!!!
//         req.app.locals.connection.releaseConnection(conn);
//     });
//     // req.app.locals.mysqlQuery(select_sql, function (err, result) {
//     //     if (err) {
//     //         console.log('[SELECT ERROR] - ', err.message);
//     //         return;
//     //     }

//     //     res.json(req.app.locals.result(result[0]));
//     // });
// }


module.exports.list_artcle = function (req, res) {
    let info = {
        total: 0,
        page:req.query.page,
        hasNextPage:true,
        list: []
    }
    var select_sql = 'SELECT count(*) FROM artcle'
    req.app.locals.mysqlQuery(select_sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }

        info.total = result[0]['count(*)']
        console.log(info);
        var select_sql1 = 'SELECT id,title,author,artcle_describe,classify_id,creat_time,classify_name,view_count,comments_count FROM artcle ORDER BY creat_time DESC limit ' + (req.query.page - 1) * req.query.pageSize + ',' + req.query.pageSize + ''

        req.app.locals.mysqlQuery(select_sql1, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                res.json(req.app.locals.result({}, -1, err.message));
                return;
            }
            info.list = result
            console.log('--------------------------SELECT----------------------------');
            //  console.log(fields);
            res.json(req.app.locals.result(info));
            console.log('------------------------------------------------------------\n\n');
            // req.app.locals.connection.end() 
        });

    });
}
