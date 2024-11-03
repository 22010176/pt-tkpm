const express = require("express")
const router = express.Router({mergeParams: true})

const {deleteImport, updateImport, insertImport, getImports} = require("../../models/quanLyNhapXuat/warehouseImport");

router.route("/import")
      .get(async function (req, res) {
        const conn = res.locals.conn;
        const result = await getImports(conn);

        await res.locals.conn.destroy()
        res.json(result)
      })
      .post(async function (req, res) {
        const conn = res.locals.conn;
        const result = await insertImport(conn, req.body);
        await res.locals.conn.destroy()
        res.json(result)
      })
      .put(async function (req, res) {
        const conn = res.locals.conn;
        const result = await updateImport(conn, req.body);
        await res.locals.conn.destroy()
        res.json(result)
      })
      .delete(async function (req, res) {
        const conn = res.locals.conn;
        const result = await deleteImport(conn, req.body);
        await res.locals.conn.destroy()
        res.json(result)
      })

router.route("/export")
      .get(async function (req, res) {
        const conn = res.local.conn;
        await res.locals.conn.destroy()
        res.json({message: req.path})
      })
      .post(async function (req, res) {
        const conn = res.local.conn;
        await res.locals.conn.destroy()
        res.json({message: req.path})
      })
      .put(async function (req, res) {
        const conn = res.local.conn;
        await res.locals.conn.destroy()
        res.json({message: req.path})
      })
      .delete(async function (req, res) {
        const conn = res.local.conn;
        await res.locals.conn.destroy()
        res.json({message: req.path})
      })

module.exports = router