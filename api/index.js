const db = require('../databases');
const dayjs = require('dayjs');

exports.getArticles = function (table, params = []) {
  return db.query('select * from ' + table + ' order by id desc limit 10', params);
}

// 查询数据库中该邮件信息
exports.queryEmail = function (params) {
  return db.query('select * from `user` where `email` = ? ', [params]);
}

// 插入一条用户记录
exports.insertUser = function (email, active_code) {
  return db.query(`
  insert into user (state, active_code, exptime, email, is_use) 
  values(?, ?, ?, ?, ?)`, [
    0, active_code, dayjs().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss'), email, 0
  ])
}