const dayjs = require('dayjs'),
    validation = require('../lib/validation'),
    Utils = require('../lib/utils'),
    Email = require('../lib/email'),
    Subscriber = require('../models/subscriber'),
    credentials = ('../credentials');
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
            if (error) res.json(500, {error: true, message: `db saved error ${error}`});
            if (subscriber) {
                subscriber.activeCode = newSubscriber.activeCode;
                subscriber.expireTime = newSubscriber.expireTime;
                subscriber.isUsed = newSubscriber.isUsed;
            } else {
                subscriber = newSubscriber;
            }
            subscriber.save().then((newer) => {
                Email(credentials).send(email, '每日编程')
            }).catch(error => {
                res.json(500, {error: true, message: `db saved error : ${error}`});
            });
        });

    },
    processActive: (req, res, next) => {
        let activeCode = req.query.activeCode;
        Subscriber.findOne({activeCode: activeCode}).exec((error, subscriber) => {
            if (error) reject(error);
            resolve(subscriber);
        }).then(subscriber => {
            if (!subscriber) {
                return res.json({error: true, message: "Incorrect verificationToken!"});
            } else {
                if (subscriber.state)
                    return res.json({error: true, message: "Already verified!"});
                if (dayjs().isAfter(subscriber.expireTime)) {
                    return res.json({error: true, message: "VerificationToken already expire!"});
                }
                subscriber.isUsed = true;
                subscriber.status = true;
                subscriber.save().then(newer => {
                    res.json({
                        error: false,
                        message: "active user success"
                    });
                }).catch(error => {
                    res.json(500, {error: true, message: `db saved error ${error}`});
                });
            }
        }).catch(error => {
            res.json(500, {error: true, message: `db saved error ${error}`});
        });
    }
};