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
}