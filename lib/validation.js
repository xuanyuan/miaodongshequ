const Subscriber = require('../models/subscriber');
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
module.exports = {
    validateEmail: email => email.match(VALID_EMAIL_REGEX),
    checkEmailExists: async (req, res, next) => {
        let email = req.body.email || '';
        if (!this.validateEmail(email))
            return res.json({error: true, message: 'Invalid name email address'});
        let _subscriber;
        await Subscriber.findOne({email: email}, (err, subscriber) => {
            if (err) return next(err);
            _subscriber = subscriber;
        });
        if (_subscriber) {
            return res.json({error: true, message: ''})
        }
        next();
    }
};
