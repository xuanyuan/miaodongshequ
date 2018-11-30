const mongoose = require('mongoose');
const subscriberSchema = mongoose.Schema({
    email: {type: String, require: true, unique: true}, // 邮箱地址
    state: {type: Boolean, require: true}, //激活状态
    activeCode: {type: String, require: true}, // 激活码
    expireTime: {type: Date, require: true}, // 过期时间
    isUsed: {type: Boolean, require: true}, // 是否已使用
    updated: Date,// 更新时间
    created: {type: Date, require: true} // 第一次订阅时间
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports = Subscriber;