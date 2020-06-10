
var mysql = require('mysql')
var config = {
    host     : '106.53.251.59',
    port     :'3306',
    user     : 'root',
    password : '_Q,j&h*54618482',
    database : 'blog',
    connectTimeout:10000,
    debug:false,
    useConnectionPooling: true
}

var conn = mysql.createConnection(config);
var pool = mysql.createPool(config)
module.exports.connection = pool;

module.exports.mysqlQuery =  function query(sql, sqlParams) {
    console.log(sqlParams)
    // console.log(callback)
    pool.getConnection(function (err, conn) {
        if (err) {
            // callback(err, null, null);
        } else {
            conn.query(sql, sqlParams, function (qerr, vals, fields) {
                // callback(qerr, vals, fields);
            });
            
        }
        // conn.release(); // not work!!!
        pool.releaseConnection(conn);
    });
};

// function handleError () {
//     conn = mysql.createConnection(config);
//     //连接错误，2秒重试
//     conn.connect(function (err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//             setTimeout(handleError , 2000);
//         }
//     });

//     conn.on('error', function (err) {
//         console.log('db error', err);
//         // 如果是连接断开，自动重新连接
//         if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//             handleError();
//         } else {
//             throw err;
//         }
//     });
// }

// handleError();
