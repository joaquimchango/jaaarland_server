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
  tags: [String],
  trending: {
    type: Boolean,
    default: false
  },
  discount:String,
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  }
})


module.exports = model("Product", productSchema)