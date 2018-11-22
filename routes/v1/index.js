const express = require('express');
const router = express.Router();
const api = require('../../api');
const {
  isEmail,
  md5,
  getIPAdress
} = require('../../helper').utils;
const sendEmail = require('../../helper').sendEmail;
const templates = require('../../helper').templates;

const url = 'http://'+ getIPAdress() + ':8080/v1/verify?verificationToken=';


// subscribe send active email
router.route('/subscribe')
  .post((req, res) => {
    let email = req.body.email;
    if (!isEmail(email)) {
      res.json({
        error: true,
        message: '邮箱不合法'
      });
      return;
    }
    /**
     * 1. 验证是否已经注册过？
     * 2. 注册过则提示是否重发
     * 3. 如果重发检查是否已经激活？
     * 4. 如果激活，则提示已经激活
     * 5. 如果没有激活，则提示去激活
     * 6. 没有注册则发送激活邮件
     */
    // query this.email address if exists
    async function subscribe(email) {
      try {
        let queryEmailResult = await api.queryEmail(email);
        if (queryEmailResult.length > 0) {
          res.json({
            error: true,
            message: 'You are already enrolled to Daily Coding Problem!'
          });
        } else {

          // 没有订阅过，发送激活邮件
          const activeCode = md5(email + new Date().getTime());

          let sendEmailResult = await sendEmail.send({
            to: req.body.email, // 收件人地址，多个收件人可以使用逗号分隔
            subject: '每日编程', // 邮件标题
            html: templates.subscribe(url + activeCode) // 邮件内容
          })
          let insertUserResult = await api.insertUser(email, activeCode);

          res.json({
            error: false,
            message: '发送邮件成功！'
          });
        }
      } catch (error) {
        res.json({
          error: true,
          message: 'subscribe failed.', error
        });
      }
    }
    subscribe(email);
  })
  .get((req, res) => {
    console.log('/subscribe get method.');
  })

// resend active email
router.route('/resend')
  .post((req, res) => {
    let email = req.body.email;

    async function resend(email) {
      try {
        let queryEmailResult = await api.queryEmail(req.body.email);
        // 未激活
        // 发送激活邮件
        // 更新激活码、有效时间和是否使用过
        if (queryEmailResult[0] && queryEmailResult[0].state === 0) {

          // 没有订阅过，发送激活邮件
          const activeCode = md5(email + new Date().getTime());
          let sendEmailResult = await sendEmail.send({
            to: req.body.email, // 收件人地址，多个收件人可以使用逗号分隔
            subject: '每日编程', // 邮件标题
            html: templates.subscribe(url + activeCode) // 邮件内容
          });

          let insertUserResult = await api.updateUser({
            email,
            active_code: activeCode,
            state: 0,
            is_use: 0,
            exptime: true
          });

          res.json({
            error: false,
            message: '发送邮件成功，请注意查收。'
          })
        } else if (queryEmailResult[0] && queryEmailResult[0].state === 1){
          res.json({
            error: true,
            message: 'This email is already verified.'
          })
        }
      } catch (error) {
        res.json({
          error: true,
          message: 'resend failed.' + error
        })
      }
    }
    resend(email);
  })
  .get((req, res) => {
    api.getArticles(req.path.substr(1))
      .then(v => {
        res.send(v);
      })
  });

router.route('/verify')
  .get((req, res) => {

    let verificationToken = req.query.verificationToken;

    async function verify(verificationToken) {
      try {
        // 1. check if there is a user with the same verificationToke and the user's is_use value equals 1
        // 2. if not above, then active user and update state to 1 and is_use to 1
        let queryResult = await api.queryActiveCode(verificationToken);
        if (queryResult.length === 0) {
          res.json({
            error: false,
            message: "verificationToken Incorrect"
          })
        } else {
          if (queryResult[0].state === 1) {
            res.json({
              error: true,
              message: 'This email is already verified.'
            })
            return;
          }
          let updateResult = await api.updateUser({
            email: queryResult[0].email,
            exptime: true,
            state: 1,
            is_use: 1
          })
          console.log(updateResult);
          res.json({
            error: false,
            message: "active user success"
          })
        }
      } catch (error) {
        res.json({
          error: true,
          message: 'active email failed.' + error
        })
      }
    }
    verify(verificationToken);
  })

module.exports = exports = router;