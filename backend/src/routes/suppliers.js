const express = require("express")
const router = express.Router({mergeParams: true})

const {updateSupplier, insertSupplier, getSuppliers, deleteSupplier, insertMultipleSuppliers} = require('../models/suppliers')
const {insertMultipleConfigures} = require("../models/configures");

router.route("/")
.get(async function (req, res) {
  const conn = res.locals.conn;
  const result = await getSuppliers(conn)

  await conn.destroy()
  res.json(result)
})
.post(async function (req, res) {
  const conn = res.locals.conn;
  const result = await insertSupplier(conn, req.body)

  await conn.destroy()
  res.json(result)
})
.put(async function (req, res) {
  const conn = res.locals.conn;
  const result = await updateSupplier(conn, req.body)

  await conn.destroy()
  res.json(result)
})
.delete(async function (req, res) {
  const conn = res.locals.conn;
  const result = await deleteSupplier(conn, req.body)

  await conn.destroy()
  res.json(result)
})
router.post("/add-multiple", async function (req, res) {
  const conn = res.locals.conn;
  const result = await insertMultipleSuppliers(conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})
module.exports = router