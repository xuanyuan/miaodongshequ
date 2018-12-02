const nodemailer = require('nodemailer');

module.exports = (credentials) => {
    let mailTransport = nodemailer.createTransport(credentials.mail);
    let from = '"www.miaodongshequ.com"<z_dianjun@163.com>';
    let errorRecipient = 'l_guangpeng@163.com';
    return {
        mailOptions: (from, to, subject, body) => {
            return {
                from: from, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                // text: 'Hello world?', // plain text body
                html: body // html body
            }
        },
        send: (to, subject, body) => {
            return new Promise((resolve, reject) => {
                mailTransport.send(this.mailOptions(from, to, subject, body), (error, info) => {
                    if (error) {
                        reject(error);
                        console.error(`Fail to send mail ${error.stack}`);
                    }
                    resolve(info);
                    console.log(`success to send mail: ${info}`);
                });
            });
        },
        emailError: function (message, filename, exception) {
            let body = '<h1>miaodongshequ Site Error</h1>' +
                'message:<br><pre>' + message + '</pre><br>';
            if (exception) body += 'exception:<br><pre>' + exception + '</pre><br>';
            if (filename) body += 'filename:<br><pre>' + filename + '</pre><br>';
            return new Promise((resolve, reject) => {
                mailTransport.send(this.mailOptions(from, errorRecipient, 'miaodongshequ Site Error', body), (error, info) => {
                    if (error) {
                        reject(error);
                        console.error(`Fail to send mail ${error.stack}`);
                    }
                    resolve(info);
                    console.log(`success to send mail: ${info}`);
                });
            });
        }
    }
};