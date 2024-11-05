const express = require("express")
const router = express.Router({mergeParams: true})

const {deleteImport, updateImport, insertImport, getImports, findImports, findImportProduct} = require("../../models/quanLyNhapXuat/warehouseImport");
const {getExports, insertExport, updateExport, deleteExport, findExports} = require("../../models/quanLyNhapXuat/warehouseExport");
const {getItems, insertItem, updateItem, deleteItem, getTinhTrang} = require("../../models/quanLyNhapXuat/items");

router.route("/import")
      .get(async function (req, res) {
        const conn = res.locals.conn;
        const result = await (Object.keys(req.query).length > 0 ? findImports(conn, req.query) : getImports(conn, req.query))
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
        const conn = res.locals.conn;
        const result = await (Object.keys(req.query).length === 0 ? getExports(conn) : findExports(conn, req.query))
        await res.locals.conn.destroy()
        res.json(result)
      })
      .post(async function (req, res) {
        const conn = res.locals.conn;
        const result = await insertExport(conn, req.body);
        await res.locals.conn.destroy()
        res.json(result)
      })
      .put(async function (req, res) {
        const conn = res.locals.conn;
        const result = await updateExport(conn, req.body);
        await res.locals.conn.destroy()
        res.json(result)
      })
      .delete(async function (req, res) {
        const conn = res.locals.conn;
        const result = await deleteExport(conn, req.body);
        await res.locals.conn.destroy()
        res.json(result)
      })

router.route("/items")
      .get(async function (req, res) {
        const result = await getItems(res.locals.conn);
        await res.locals.conn.destroy()
        res.json(result)
      })
      .post(async function (req, res) {
        const conn = res.locals.conn;
        const result = await insertItem(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })
      .put(async function (req, res) {
        const conn = res.locals.conn;
        const result = await updateItem(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })
      .delete(async function (req, res) {
        const conn = res.locals.conn;
        const result = await deleteItem(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })

router.route("/item-state")
      .get(async function (req, res) {
        const conn = res.locals.conn;
        const result = await getTinhTrang(conn, req.body)
        await res.locals.conn.destroy()
        res.json(result)
      })

router.get("/import/:maphieunhap", async function (req, res) {
  const conn = res.locals.conn;
  const result = await findImportProduct(conn, req.params)
  await res.locals.conn.destroy()
  res.json(result)
})

module.exports = router