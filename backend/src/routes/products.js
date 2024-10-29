const express = require("express")
const router = express.Router({mergeParams: true})

const {deleteProduct, updateProduct, insertProduct, getProductById, getProducts, insertMultipleProducts} = require('../models/products')
const {insertMultipleEmployees} = require("../models/employees");

router.route("/")
.get(async function (req, res) {
  const result = await getProducts();
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


module.exports = router