# miaodongshequ

- 开发环境

  - Node v10.13.0

- 数据库连接配置

```javascript
// /databases/config.js
module.exports = {
  host: '127.0.0.1',
  user: 'youruser',
  port: 3306,
  password: 'yourpassword',
  database: 'yourdb',
  insecureAuth: true
}
```

- 邮箱配置

```javascript
// /helper/config.js
module.exports = {
  user: 'xxx@163.com',
  pass: 'xxx'
}
```

- 项目运行

```bash
npm install
node app.js
```

# change log

2018-10-13 20:05:54
搭建基本环境

2018-11-21 21:23:12
删除版本库重新提交，之前 commit 中包含个人账户信息

2018-11-22 14:30:39
将业务逻辑改成 async await 方式进行处理，一个字，酸爽，哈哈

2019-1-8 23:53:22
增加订餐后台

```shell
#守护进程启动程序
npm install -g nodemon -S
nodemon app.js
```

参考文章
http://javascript.ruanyifeng.com/nodejs/express.html
