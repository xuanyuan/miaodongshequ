const crypto = require('crypto');
module.exports = {
    md5: content => {
        let md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex');
    }
}