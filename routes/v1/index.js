const express = require('express');
const router = express.Router();
const api = require('../../api');
const {
  isEmail,
  md5
} = require('../../helper').utils;
const sendEmail = require('../../helper').sendEmail;
const templates = require('../../helper').templates;

let url = 'http://192.168.37.5:8080/v1/activeAccount=' //验证码为6位随机数


router.route('/*')
  .post((req, res) => {
    // console.log(req);
    if ('/subscribe' == req.path) {
      if (isEmail(req.body.email)) {
        // TODO 验证是否重复注册，改成同步语法
        sendEmail.send({
          to: req.body.email, // 收件人地址，多个收件人可以使用逗号分隔
          subject: '每日编程-邮箱验证', // 邮件标题
          html: templates.activeAccount(url + md5(req.body.email)) // 邮件内容
        }).then(
          function (info) {
            res.json({
              error: false,
              message: '发送邮件成功！'
            });
          },
          function (error) {
            res.json({
              error: true,
              message: '发送邮件失败' + error
            });
          }
        )
      } else {
        res.json({
          error: true,
          message: '邮箱不合法'
        });
      }
    }
  })
  .get((req, res) => {
    console.log(req.path);
    api.getArticles(req.path.substr(1))
      .then(v => {
        res.send(v);
      })
  });

module.exports = exports = router;