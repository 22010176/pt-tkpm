const express = require("express")
const router = express.Router({mergeParams: true})

const {deleteProduct, updateProduct, insertProduct, getProductById, getProducts, insertMultipleProducts} = require('../models/products')

router.route("/")
.get(async function (req, res) {
  const result = await getProducts(res.locals.conn);
  await res.locals.conn.destroy()

  res.json(result)
})
.post(async function (req, res) {
  const conn = res.locals.conn;
  const result = await insertProduct(conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})
.put(async function (req, res) {
  const conn = res.locals.conn;
  const result = await updateProduct(conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})
.delete(async function (req, res) {
  const conn = res.locals.conn;
  const result = await deleteProduct(conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})

router.post("/add-multiple", async function (req, res) {
  const conn = res.locals.conn;
  const result = await insertMultipleProducts(conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})

router.post("/upload-img/:productID", async function (req, res) {
  const productID = req.params.productID


  await res.locals.conn.destroy()
  res.json({})
})

module.exports = router