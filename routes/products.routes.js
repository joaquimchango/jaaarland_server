const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const mongoose = require("mongoose");


router.get("/products", (req, res, next) => {
  
  Product.find()
    .then((products) => res.status(200).json(products))
    .catch((err) => next(err));

  
});

router.get("/products/:id", (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(req.params.id)
    .then((product) => res.status(200).json(product))
    .catch((err) => next(err));
})

router.post("/products", (req, res, next) => {

  Product.create(req.body)
    .then((product) => res.status(201).json(product))
    .catch((err) => next(err));
})

router.patch("/products/:id", (req, res, next) => {

  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => res.status(200).json(product))
    .catch((err) => next(err));

})


router.put("/products/:id", (req, res, next) => {

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((product) => res.status(200).json(product))
    .catch((err) => next(err));
})





router.delete("/products/:id", (req, res, next) => {
const { id } = req.params;

 if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findByIdAndDelete(id)
    .then((product) => res.status(200).json(product))
    .catch((err) => next(err));

})


module.exports = router