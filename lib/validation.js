const Subscriber = require('../models/subscriber'),
    Utils = require('../lib/utils');
module.exports = {
    checkEmailExists: async (req, res, next) => {
        let email = req.body.email || '';
        if (!Utils.validateEmail(email))
            return res.json({error: true, message: 'Invalid name email address!'});
        let _subscriber;
        await Subscriber.findOne({email: email}, (err, subscriber) => {
            if (err) return next(err);
            _subscriber = subscriber;
        });
        if (_subscriber) {
            return res.json({error: true, message: 'You are already enrolled to Daily Coding Problem!'})
        }
        next();
    }
};
