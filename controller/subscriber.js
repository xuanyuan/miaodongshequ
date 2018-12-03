const dayjs = require('dayjs'),
    validation = require('../lib/validation'),
    Subscriber = require('../models/subscriber'),
    Utils = require('../lib/utils'),
    Email = require('../lib/email'),
    Subscripter = require('../models/subscriber');
module.exports = {
    registerRoutes: function (route) {
        route.post('/api/subscriber/register', validation.checkEmailExists, this.processRegister);
    },
    processRegister: (req, res, next) => {
        let email = req.body.email;
        const activeCode = Utils.md5(`${email}${new Date().getTime()}`);
        const subscriber = new Subscriber({
            email: email,
            state: false,
            activeCode: activeCode,
            expireTime: dayjs().add(10, 'minute'),
            isUsed: false,
            created: dayjs().toDate()
        });
        subscriber.save().then((newer) => {
            Email().send(email, '每日编程', )
        }).catch(error => {
            res.json(500, {error: true, message: 'db saved error'});
        });
    }
};