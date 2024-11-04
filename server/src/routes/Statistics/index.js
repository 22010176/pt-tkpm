const express = require("express")
const {updateItem} = require("../../models/quanLyNhapXuat/items");
const {getOverall, getNhaCungCapStat, getKhachHangStat, getYearProfit} = require("../../models/statistics");
const {getCustomers} = require("../../models/quanLyDoiTac/customers");
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

router.get('/customers', async function (req, res) {
  const conn = res.locals.conn;
  const result = await getKhachHangStat(conn, req.query);
  await res.locals.conn.destroy()
  res.json(result)
})

router.get("/profits/year", async function (req, res) {
  const conn = res.locals.conn;
  const result = await getYearProfit(conn);
  await res.locals.conn.destroy()
  res.json(result)
})

module.exports = router