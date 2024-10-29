const express = require("express")
const router = express.Router({mergeParams: true})

const {insertEmployee, getEmployees, deleteEmployee, updateEmployee, getEmployeeWithoutAccount, insertMultipleEmployees} = require("../models/employees")
const {insertMultipleConfigures} = require("../models/configures");

router.route("/")
.get(async function (req, res) {
  const result = await getEmployees(res.locals.conn);

  await res.locals.conn.destroy()
  res.json(result)
})
.post(async function (req, res) {
  const result = await insertEmployee(res.locals.conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})
.put(async function (req, res) {
  const result = await updateEmployee(res.locals.conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})
.delete(async function (req, res) {
  const result = await deleteEmployee(res.locals.conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})

router.get("/no-account", async function (req, res) {
  const result = await getEmployeeWithoutAccount(res.locals.conn);
  await res.locals.conn.destroy();
  res.json(result);
})

router.post("/add-multiple", async function (req, res) {
  const conn = res.locals.conn;
  const result = await insertMultipleEmployees(conn, req.body);
  await res.locals.conn.destroy()
  res.json(result)
})

module.exports = router