const mysql = require('mysql');
const databaseConfig = require('./database.config'); //引入数据库配置模块中的数据

//向外暴露方法
module.exports = {
  query(sql, params) {
    return new Promise((resolve, reject) => {
        try {
          //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
          const connection = mysql.createConnection(databaseConfig);
          connection.connect((err) => {
            if (err) {
              console.log('数据库链接失败');
              throw err;
            }
            //开始数据操作
            console.log(sql, params);
            connection.query(sql, params, (err, results, fields) => {

              if (err) {
                console.log('数据操作失败');
                throw err;
              }
              resolve(results, fields);
              connection.end((err) => {
                if (err) {
                  console.log('关闭数据库连接失败！');
                  throw err;
                }
              });
            });
          });
        } catch (err) {
          console.log('catch', err);
        }
    });
  }
};