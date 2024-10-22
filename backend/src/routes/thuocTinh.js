const express = require('express')
const router = express.Router()

const pool = require("../models")

router.route("/")
  .get(async (req, res) => {
    if (!req.query.table?.length) return res.json({ body: [], message: "Table cant be empty" })
    const connect = await pool.getConnection()
    const [queryResult, context] = await connect.query(`SELECT * FROM ${req.query.table}`)

    connect.release()

    res.json({ body: queryResult, message: "success" })
  })
  .put((req, res) => {

  })
  .post((req, res) => {

  })
  .delete((req, res) => {

  })

module.exports = router