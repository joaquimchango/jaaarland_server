const {Schema , model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  image: String,
  category: String,
  stock: {
    type: Number,
    default: 0
  }
})


module.exports = model("Product", productSchema);