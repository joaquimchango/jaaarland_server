const {Schema, model} = require("mongoose");
const mongoose = require("mongoose"); 

const orderSchema = new Schema ({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    required: true
  },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  name: String,
  address: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  zip: {type: String, required: true},
  phone: String,
  email: {type: String, required: true},
  country: String, 
}, {
  timestamps: true
})

module.exports = model("Order", orderSchema)