const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

const router = express.Router();

router.post("/cart", isAuthenticated, (req, res, next) => {
  const userId = req.payload?._id;
  const { products = [], total = 0 } = req.body;

  const cartData = { products, total };

  if (userId) {
    cartData.owner = userId;
  }

  Cart.create(cartData)
    .then((cart) => res.status(201).json(cart))
    .catch((err) => next(err));
});

router.get("/cart/:id", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findOne({ _id: req.params.id, owner: userId })
    .populate("products.product")
    .then((cart) => {
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }

      res.status(200).json(cart);
    })
    .catch((err) => next(err));
});

router.delete("/cart/:id", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cart.findOneAndDelete({ _id: req.params.id, owner: userId })
    .then((cart) => {
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }

      res.status(200).json({ message: "Cart deleted successfully", cart });
    })
    .catch((err) => next(err));
});

router.patch("/cart/:id", isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  const { id } = req.params;
  const { products, total } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  const updates = {};

  if (products !== undefined) updates.products = products;
  if (total !== undefined) updates.total = total;

  Cart.findOneAndUpdate({ _id: id, owner: userId }, updates, { new: true })
    .populate("products.product")
    .then((cart) => {
      if (!cart) {
        res.status(404).json({ message: "Cart not found" });
        return;
      }

      res.status(200).json(cart);
    })
    .catch((err) => next(err));
});

module.exports = router;
