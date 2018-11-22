// 引入插件
const nodemailer = require('nodemailer');
const config = require('./config');


// 创建可重用邮件传输器
const transporter = nodemailer.createTransport({
  host: "smtp.163.com",
  secureConnection: true,
  port: 465,
  auth: config
});
module.exports.send = (mailOptions) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: 'www.miaodongshequ.com<z_dianjun@163.com>', // 发件人地址
      ...mailOptions
    }, function (error, info) {
      if (error) {
        reject(error);
        console.log(error);
      }
      resolve(info);
      console.log(info);
    });
  })
}