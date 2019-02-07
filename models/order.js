const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
  userno: {
    type: String,
    require: true
  },
  orders: {
    type: Array,
    require: true
  },
  ispay: {
    type: Boolean,
    default: false
  },
  cost: {
    type: Number,
    require: true
  }
})
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;