const express = require("express")
const router = express.Router({mergeParams: true})

const {deleteProduct, updateProduct, insertProduct, getProductById, getProducts} = require('../models/products')

router.route("/")
.get(async function (req, res) {
  const result = await getProducts();
  res.json(result)
})
.post(async function (req, res) {
  res.json({message: req.path})
})
.put(async function (req, res) {
})
.delete(async function (req, res) {
})

module.exports = router