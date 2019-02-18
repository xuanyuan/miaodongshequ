const express = require('express')
const router = express.Router()
const api = require('../../api')
const dayjs = require('dayjs')
const FORMAT_STR = 'YYYY-MM-DD HH:mm:ss'

const {
  getIPAdress
} = require('../../helper').utils

router.route('/order')
  .post((req, res) => {
    const body = req.body

    async function order(body) {
      try {
        const orderTime = dayjs().format(FORMAT_STR)
        let {
          name,
          menus,
          food,
          place,
          meatCount,
          vegetableCount,
          cost
        } = body;

        let orders = await api.todayorders();
        console.log(orders);
        if (orders.length) {
          // 如果已经下过订单就报错
          if (orders.map(v => v.username).includes(name)) {
            throw new Error("您已下单，请勿重复下单");
          }
        }

        let insertUserResult = await api.insertOrder(
          name,
          menus,
          food,
          place,
          meatCount,
          vegetableCount,
          cost,
          orderTime
        )
        res.json({
          error: false,
          message: '订餐成功'
        })
      } catch (err) {
        res.json({
          error: true,
          message: err.message || 'order failed.'
        })
      }
    }
    order(body)
  })
  .get((req, res) => {})

router.route('/menus')
  .post((req, res) => {
    (async function() {
      try {
        let todaymenu = await api.todaymenu();
        let consumers = await api.consumer();

        if (todaymenu.length === 1) {
          res.json({
            menu: todaymenu[0],
            consumer: consumers.map(v => v.name)
          })
        } else {
          throw new Error("今天的菜谱还没出来，请耐心等待");
        }
      } catch (error) {
        res.json({
          error: true,
          message: error.message
        })
      }
    })();
  })
// 查询订单
router.route('/orders')
  .post((req, res) => {
    (async function() {
      try {
        let orders = await api.todayorders();

        res.json({
          orders
        })
      } catch (error) {
        res.json({
          error: true,
          message: error.message
        })
      }
    })();
  })

router.route('/pay')
  .post((req, res) => {
    (async function() {
      try {
        let body = req.body;
        let result = await api.payorder(body.id);
        res.json(result);
        console.log(result);
      } catch (error) {
        res.json({
          error: true,
          message: error.message
        })
      }
    })();
  })
module.exports = exports = router