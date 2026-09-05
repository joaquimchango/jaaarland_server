const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const OrderProductSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { _id: false }
)

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'],
      default: 'confirmed',
      required: true,
    },
    products: [OrderProductSchema],
    total: {
      type: Number,
      min: 0,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    name: String,
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    phone: String,
    email: { type: String, required: true },
    country: String,
  },
  {
    timestamps: true,
  }
)

module.exports = model('Order', orderSchema)