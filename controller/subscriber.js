const validation = require('../lib/validation'),
    Subscriber = require('../models/subscriber'),
    Utils = require('../lib/utils');
module.exports = {
    registerRoutes: function (route) {
        route.route('/api/subscriber/register').post(validation.checkEmailExists, this.processRegister);
    },
    processRegister: (req, res, next) => {
        let email = req.body.email;
        const activeCode = Utils.md5(`${email}${new Date().getTime()}`)

    }
};