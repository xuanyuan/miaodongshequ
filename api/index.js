const db = require('../databases');
const dayjs = require('dayjs');
const FORMAT_STR = 'YYYY-MM-DD HH:mm:ss';
//TODO 这块代码有点乱，要抽象重写，考虑灵活性 

exports.getArticles = function(table, params = []) {
  return db.query('select * from ' + table + ' order by id desc limit 10', params);
}

// 查询数据库中该邮件信息
exports.queryEmail = function(params) {
  return db.query('select * from `user` where `email` = ? ', [params]);
}

exports.queryActiveCode = function(params) {
  return db.query('select * from `user` where `active_code` = ? ', [params]);
}

// 插入一条用户记录
exports.insertUser = function(email, active_code) {
  return db.query(`
  insert into user (state, active_code, exptime, email, is_use) 
  values(?, ?, ?, ?, ?)`, [
    0, active_code, dayjs().add(10, 'minute').format(FORMAT_STR), email, 0
  ])
}

/**
 * update user information
 * for example:
 * UPDATE Person SET Address = 'Zhongshan 23', City = 'Nanjing' WHERE LastName = 'Wilson'
 */
exports.updateUser = function(userObj) {
  let sqlStr = 'update user set ',
    params = [];

  userObj.state && params.push('state = ' + userObj.state);
  userObj.active_code && params.push('active_code = ' + userObj.active_code);
  userObj.exptime && params.push('exptime = "' + dayjs().add(10, 'minute').format(FORMAT_STR) + '"');
  userObj.is_use && params.push('is_use = ' + userObj.is_use);

  sqlStr = sqlStr.concat(params.join(", "), ' where `email` = ? ');
  return db.query(sqlStr, [userObj.email]);
}

// 插入一条订餐记录
exports.insertOrder = function(name, menus, food, place, meatcount, vegetablecount, cost, ordertime) {
  return db.query(`
  insert into orders ( username, menus, food, place, meatcount, vegetablecount, cost, ordertime)
  values(?, ?, ?, ?, ?, ?, ?, ?)`, [
    name, menus, food, place, meatcount, vegetablecount, cost, ordertime
  ])
}

// 查询今日菜谱
exports.todaymenu = function() {
  return db.query(`select * from menus where to_days(menutime) = to_days(now());`);
}

// 查询顾客
exports.consumer = function() {
  return db.query(`select * from consumer;`);
}

// 查询今日订单
exports.todayorders = function() {
  return db.query(`select o.*, c.no from orders as o, consumer as c where o.username = c.\`name\` and to_days(o.ordertime) = to_days(now());`);
}

// 买单
exports.payorder = function(id) {
  return db.query(`update orders set isPay = 1 where id = ?`, [id]);
}