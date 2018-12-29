const Subscriber = require('../models/subscriber'),
    Utils = require('../lib/utils');
module.exports = {
    checkEmail: async (req, res, next) => {
        let email = req.body.email || '';
        console.log(req.body);
        if (!Utils.validateEmail(email))
            return res.json({error: true, message: 'Invalid name email address!'});
        await Subscriber.findOne({email: email})
            .exec((err, subscriber) => {
                if (err) return next(err);
                if (subscriber) {
                    let state = subscriber.state;
                    if (state)
                        return res.json({error: true, message: "Already register this email address!"});
                }
            });
        next();
    }
};
