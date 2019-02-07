const mongoose = require('mongoose');
const menuSchema = mongoose.Schema({
  name: String,
  price: String,
  imageUrl: String
})
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;