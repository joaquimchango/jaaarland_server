const { Schema, model } = require("mongoose");

const CartItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [CartItemSchema],
    total: {
      type: Number,
      min: 0,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model("Cart", CartSchema);