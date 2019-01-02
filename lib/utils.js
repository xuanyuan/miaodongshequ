const crypto = require('crypto');
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
module.exports = {
    md5: content => {
        let md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex');
    },
    validateEmail: function (email) {
        return email.match(VALID_EMAIL_REGEX);
    },
    getIPAdress: function () {
        var interfaces = require('os').networkInterfaces();
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                var alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    },
    template: function (url) {
        return `
    <h3>欢迎订阅每日编程</h3>
    <a href="${url}">点击激活账户</a>
    <hr/>
    或复制以下链接到浏览器中激活
    <br/>
    ${url}
    <br/>
    如有疑问，请联系<a href="mailto:l_guangpeng@163.com">l_guangpeng@163.com</a>
  `
    }
};