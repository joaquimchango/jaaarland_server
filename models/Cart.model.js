import {Schema , model } from "mongoose"

const CartItemSchema = new Schema ({

    product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: Number,
  price: Number,
  
},

{
    timestamps: true
})


const CartSchema = new Schema({
owner: { type: Schema.types.ObjectId, ref: "user"},
products: [CartItemSchema],
total: {type: Number, min: 0, required:true}
},
{timestamps: true }
)

export default model("cart", CartSchema)