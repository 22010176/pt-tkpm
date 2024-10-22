const express = require('express')
const router = express.Router()

const pool = require("../models")

router.route("/")
  .get((req, res) => { // Get data

  })
  .put((req, res) => { // Insert data

  })
  .post((req, res) => { // Update data

  })
  .delete((req, res) => { // Remove data

  })

module.exports = router