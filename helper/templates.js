// 激活邮件模板
exports.subscribe = function (url) {
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

// 发送每日内容
exports.dailyContent = function (content) {
  return content
}