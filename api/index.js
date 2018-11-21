const db = require('../databases');

exports.getArticles = function (table, params = []) {
  return db.query('select * from ' + table + ' order by id desc limit 10', params);
}