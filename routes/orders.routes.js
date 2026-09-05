const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order.model.js");
const {isAuthenticated} = require("../middleware/jwt.middleware.js");

const router = express.Router();

router.get("/orders/all",  isAuthenticated, (req, res, next) => {
  
  const userId= req.payload._id
  console.log('userId',userId)
   

  Order.find({user: userId})
     .populate("products.product")
     .then((orders) => res.status(200).json(orders))
    .catch((err) => next(err));
});


router.get("/orders/:id",  isAuthenticated, (req, res, next) => {

  const userId= req.payload._id
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findOne({_id: req.params.id, user: userId})
  .populate("products.product")
    .then((order) => res.status(200).json(order))
    .catch((err) => next(err));
})

router.put("/orders/:id",  isAuthenticated, (req, res, next) => {

  const userId= req.payload._id
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findOneAndUpdate({_id: req.params.id, user: userId}, req.body, { new: true })
    .then((order) => res.status(200).json(order))
    .catch((err) => next(err));
})


router.patch("/orders/:id",  isAuthenticated, (req, res, next) => {

  const userId= req.payload._id
  
  const {id}= req.params

  
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findOneAndUpdate({_id: id, user: userId}, req.body, { new: true })
    .then((order) => res.status(200).json(order))
    .catch((err) => next(err));
})

  
router.post('/orders', (req, res, next) => {
  const userId = req.payload._id ? req.payload._id : null
  const {
    products = [],
    status = 'confirmed',
    total = 0,
    name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    country,
  } = req.body

  if (!Array.isArray(products) || products.length === 0) {
    res.status(400).json({ message: 'Order must include at least one product.' })
    return
  }

  const normalizedProducts = products.map((item) => ({
    product: item.product,
    quantity: Number(item.quantity ?? 1),
    price: Number(item.price ?? 0),
  }))

  Order.create({
    user: userId,
    status,
    products: normalizedProducts,
    total: Number(total ?? 0),
    name,
    address,
    city,
    state,
    zip,
    phone,
    email,
    country,
  })
    .then((order) => res.status(201).json(order))
    .catch((err) => next(err))
})


module.exports = router

