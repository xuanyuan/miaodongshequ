const express = require('express');
const router = express.Router();
const api = require('../../api');
const dayjs = require('dayjs');
const FORMAT_STR = 'YYYY-MM-DD HH:mm:ss';

const {
  getIPAdress
} = require('../../helper').utils;


router.route('/order')
  .post((req, res) => {
    let body = req.body;

    async function order(body) {
      try {
        const orderTime = dayjs().format(FORMAT_STR);
        let {
          name,
          menus,
          food,
          place,
          meatCount,
          vegetableCount,
          cost
        } = body;
        let insertUserResult = await api.insertOrder(name, menus, food, place, meatCount, vegetableCount, cost, orderTime);
        res.json({
          error: false,
          message: '订餐成功'
        });
      } catch (error) {
        res.json({
          error: true,
          message: 'order failed.',
        });
      }
    }
    order(body);
  })
  .get((req, res) => {
    console.log('/order get method.');
  })

module.exports = exports = router;