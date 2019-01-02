const dayjs = require('dayjs'),
    validation = require('../lib/validation'),
    Utils = require('../lib/utils'),
    Email = require('../lib/email'),
    Subscriber = require('../models/subscriber');
const url = 'http://' + Utils.getIPAdress() + ':8000/api/subscriber/active?activeCode=';
module.exports = {
    registerRoutes: function (route) {
        route.post('/api/subscriber/register', validation.checkEmail, this.processRegister);
        route.get("/api/subscriber/active", this.processActive);
    },
    processRegister: (req, res, next) => {
        let email = req.body.email;
        const activeCode = Utils.md5(`${email}${new Date().getTime()}`);
        const newSubscriber = new Subscriber({
            email: email,
            state: false,
            activeCode: activeCode,
            expireTime: dayjs().add(10, 'minute'),
            isUsed: false,
            created: dayjs().toDate()
        });
        Subscriber.findOne({email: email}).exec((error, subscriber) => {
            if (error) res.status(500).json({error: true, message: `db error ${error}`});
            if (subscriber) {
                subscriber.activeCode = newSubscriber.activeCode;
                subscriber.expireTime = newSubscriber.expireTime;
                subscriber.isUsed = newSubscriber.isUsed;
            } else {
                subscriber = newSubscriber;
            }
            subscriber.save().then((newer) => {
                Email.send(email, '每日编程', Utils.template(url + activeCode))
            }).catch(error => {
                res.status(500).json({error: true, message: `db saved error : ${error}`});
            }).then(res.json({error: false, message: '发送邮件成功！'}));
        });

    },
    processActive: (req, res, next) => {
        let activeCode = req.query.activeCode;
        Subscriber.findOne({activeCode: activeCode}).exec((error, subscriber) => {
            if (error) res.status(500).json({error: true, message: `db error ${error}`});
            if (!subscriber) {
                return res.json({error: true, message: "Incorrect verificationToken!"});
            } else {
                if (subscriber.state)
                    return res.json({error: true, message: "Already verified!"});
                if (dayjs().isAfter(subscriber.expireTime)) {
                    return res.json({error: true, message: "VerificationToken already expire!"});
                }
                subscriber.isUsed = true;
                subscriber.state = true;
                subscriber.save().then(newer => {
                    res.json({
                        error: false,
                        message: "active user success"
                    });
                }).catch(error => {
                    res.status(500).json({error: true, message: `db saved error ${error}`});
                });
            }
        });
    }
};