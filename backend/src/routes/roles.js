const express = require('express')
const {getRoles, getActionsQuery, getFeaturesQuery, getPermissionsQuery, getRolePermissions} = require("../models/roles");
const router = express.Router({mergeParams: true})

router.route("/")
.get(async function (req, res) {
  const result = await getRoles(res.locals.conn)

  await res.locals.conn.destroy()
  res.json(result)
})
.post(async function (req, res) {
  await res.locals.conn.destroy()
  res.json({message: req.path})
})
.put(async function (req, res) {
  await res.locals.conn.destroy()
  res.json({message: req.path})
})
.delete(async function (req, res) {
  await res.locals.conn.destroy()
  res.json({message: req.path})
})

router.get("/permissions", async function (req, res) {
  const conn = res.locals.conn;
  const [actions, features, permissions] = await Promise.all([
    getActionsQuery(conn), getFeaturesQuery(conn), getPermissionsQuery(conn)
  ])

  await conn.destroy();
  return res.json({actions, features, permissions, success: true})
})

router.get("/:roleID", async function (req, res) {
  const conn = res.locals.conn;
  const result = await getRolePermissions(conn, req.params.roleID);

  await conn.destroy();
  res.json(result)
})

module.exports = router