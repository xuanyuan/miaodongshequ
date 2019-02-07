const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  userno: {
    type: String,
    require: true,
    unique: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  type: {
    type: Number,
    require: true
  }, //普通用户0，商家1,
  created: {
    type: Date,
    require: true,
    default: Date.now
  },
  age: {
    type: Number,
    min: 18,
    max: 65
  }
})
const User = mongoose.model('User', userSchema);
module.exports = User;