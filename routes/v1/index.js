const express = require('express');
const router = express.Router();
const api = require('../../api');
const {
  isEmail,
  md5
} = require('../../helper').utils;
const sendEmail = require('../../helper').sendEmail;
const templates = require('../../helper').templates;

router.route('/*')
  .post((req, res) => {
    // console.log(req);
    if ('/subscribe' == req.path) {
      let email = req.body.email;
      if (isEmail(email)) {
        /**
         * 1. 验证是否已经注册过？
         * 2. 注册过则提示是否重发
         * 3. 如果重发检查是否已经激活？
         * 4. 如果激活，则提示已经激活
         * 5. 如果没有激活，则提示去激活
         * 6. 没有注册则发送激活邮件
         */
        api.queryEmail(email)
          .then(v => {
            if (v.length > 0) {
              res.json({
                error: true,
                message: 'You are already enrolled to Daily Coding Problem!'
              });
            } else {
              // 没有订阅过，发送激活邮件
              const activeCode = md5(email + new Date().getTime());
              const url = 'http://192.168.37.5:8080/v1/active?validateToken=';
              sendEmail.send({
                to: req.body.email, // 收件人地址，多个收件人可以使用逗号分隔
                subject: '每日编程', // 邮件标题
                html: templates.subscribe(url + activeCode) // 邮件内容
              }).then(
                function (info) {
                  api.insertUser(email).then(v => {
                    res.json({
                      error: false,
                      message: '发送邮件成功！'
                    });
                  })
                },
                function (error) {
                  res.json({
                    error: true,
                    message: '发送邮件失败' + error
                  });
                }
              )
            }
          })
      } else {
        res.json({
          error: true,
          message: '邮箱不合法'
        });
      }
    } else if ('/resend' == req.path) {
      api.queryEmail(req.body.email).then(
        v => {
          if (v[0].state === 0) {
            // 未激活
            // 发送激活邮件
            // 更新激活码、有效时间和是否使用过
            res.json({
              error: false,
              message: '发送邮件成功，请注意查收。'
            })
          } else {
            res.json({
              error: true,
              message: 'This email is already verified.'
            })
          }
        }
      )
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