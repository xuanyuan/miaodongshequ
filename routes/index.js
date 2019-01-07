const express = require('express');
const router = express.Router();
const v1 = require('./v1');
const food = require('./food');
// 注意，中间件的放置顺序很重要，等同于执行顺序。
// 而且，中间件必须放在HTTP动词方法之前，否则不会执行。
router.use('/v1', v1);
router.use('/food', food);

router.get('/', (req, res) => {
    res.send('首页');
})

router.get('/about', (req, res) => {
    res.send('关于');
})

module.exports = exports = router;