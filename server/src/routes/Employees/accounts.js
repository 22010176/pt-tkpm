const express = require("express")
const {insertAccount, updateAccount, deleteAccount, getAccounts} = require("../../models/quanLyTaiKhoan/accounts");
const router = express.Router({mergeParams: true})

router.route("/")
      .get(async function (req, res) {
        const result = await getAccounts(res.locals.conn);
        await res.locals.conn.destroy()
        res.json(result)
      })
      .post(async function (req, res) {
        const conn = res.locals.conn;
        const result = await insertAccount(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })
      .put(async function (req, res) {
        const conn = res.locals.conn;
        const result = await updateAccount(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })
      .delete(async function (req, res) {
        const conn = res.locals.conn;
        const result = await deleteAccount(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })

module.exports = router