const express = require("express")
const router = express.Router({mergeParams: true})

const {deleteProduct, updateProduct, insertProduct, getProductById, getProducts} = require('../models/products')

router.route("/")
.get(async function (req, res) {
  const result = await getProducts();
  await res.locals.conn.destroy()

  res.json(result)
})
.post(async function (req, res) {
  await res.locals.conn.destroy()
  res.json({message: req.path})
})
.put(async function (req, res) {
  await res.locals.conn.destroy()
})
.delete(async function (req, res) {
  await res.locals.conn.destroy()
})

module.exports = router