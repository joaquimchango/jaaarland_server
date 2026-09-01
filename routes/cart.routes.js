const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");

const router = express.Router();

router.post("/cart", async (req, res, next) => {
  try {
    const userId = req.payload?._id : null;
    const { products = [], total = 0 } = req.body;


    if (!Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: "Cart must contain at least one product" });
      return;
    }

    const productIds = products.map((item) => item?.product);
    if (productIds.some((productId) => !mongoose.Types.ObjectId.isValid(productId))) {
      res.status(400).json({ message: "Each cart product must have a valid product id" });
      return;
    }

    const productCount = await Product.countDocuments({ _id: { $in: productIds } });
    if (productCount !== new Set(productIds.map(String)).size) {
      res.status(400).json({ message: "One or more products do not exist" });
      return;
    }

    const cart = await Cart.create({ owner: userId, products, total });
    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
});

router.get("/cart/:id", (req, res, next) => {
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

router.delete("/cart/:id", (req, res, next) => {
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

router.patch("/cart/:id", (req, res, next) => {
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
