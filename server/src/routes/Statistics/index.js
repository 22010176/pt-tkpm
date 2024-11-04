const express = require("express")
const {updateItem} = require("../../models/quanLyNhapXuat/items");
const {getOverall, getNhaCungCapStat} = require("../../models/statistics");
const router = express.Router({mergeParams: true})

router.get("/overall", async function (req, res) {
  const conn = res.locals.conn;
  const result = await getOverall(conn)
  await res.locals.conn.destroy()
  res.json(result)
})

router.get("/suppliers", async function (req, res) {
  const conn = res.locals.conn;
  const result = await getNhaCungCapStat(conn, req.query);
  await res.locals.conn.destroy()
  res.json(result)
})

module.exports = router