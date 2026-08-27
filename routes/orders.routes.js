const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order.model.js");
const {isAuthenticated} = require("../middleware/jwt.middleware.js");

const router = express.Router();

router.get("/orders/all",  isAuthenticated, (req, res, next) => {
  
  const userId= req.auth.userId
   

  Order.find({user: userId})
     .populate("products.product")
     .then((orders) => res.status(200).json(orders))
    .catch((err) => next(err));
});


router.get("/orders/:id",  isAuthenticated, (req, res, next) => {
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findById(req.params.id)
  .populate("products.product")
    .then((order) => res.status(200).json(order))
    .catch((err) => next(err));
})

router.patch("/orders/:id",  isAuthenticated, (req, res, next) => {
  
  const {id}= req.params

  const {products} = req.body
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Order.findByIdAndUpdate(id, { $push: {products: products}}, { new: true })
    .then((order) => res.status(200).json(order))
    .catch((err) => next(err));
})

  
  router.post("/orders", isAuthenticated, (req, res, next) => {
  
    const userId= req.auth.userId
  
    const {products, date} = req.body
  
    
    Order.create({user: userId, products, date})
      .then((order) => res.status(201).json(order))
      .catch((err) => next(err))
  });



module.exports = router

