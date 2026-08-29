const Product = require("../models/Product.model");

async function getProductsPerCategory() {
  const counts = await Product.aggregate([
    {
      $match: {
        category: { $exists: true, $ne: "" },
      },
    },
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
        _id: 1,
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
  ]);

  return counts;
}

module.exports = {
  getProductsPerCategory,
};
