const db = require('../databases');
const dayjs = require('dayjs');

//TODO 这块代码有点乱，要抽象重写，考虑灵活性 

exports.getArticles = function (table, params = []) {
  return db.query('select * from ' + table + ' order by id desc limit 10', params);
}

// 查询数据库中该邮件信息
exports.queryEmail = function (params) {
  return db.query('select * from `user` where `email` = ? ', [params]);
}

exports.queryActiveCode = function (params) {
  return db.query('select * from `user` where `active_code` = ? ', [params]);
}

// 插入一条用户记录
exports.insertUser = function (email, active_code) {
  return db.query(`
  insert into user (state, active_code, exptime, email, is_use) 
  values(?, ?, ?, ?, ?)`, [
    0, active_code, dayjs().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss'), email, 0
  ])
}

// update user information
exports.updateUser = function (userObj) {
  // UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing' WHERE LastName = 'Wilson'
  let sqlStr = 'update user set ';
  userObj.state && (sqlStr += 'state = ' + userObj.state);
  userObj.active_code && (sqlStr += ', active_code = ' + userObj.active_code);
  userObj.exptime && (sqlStr += ', exptime = "' + dayjs().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss') + '"');
  userObj.is_use && (sqlStr += ', is_use = ' + userObj.is_use);
  sqlStr += ' where `email` = ? ';
  return db.query(sqlStr, [userObj.email]);
}