const express = require("express")

const router = express.Router()

router.route("/auth")
  .get((req, res) => {
    console.log(req.body)
    res.json({})
  })
  .post((req, res) => {
    console.log(req.body)
    res.json({})
  })
