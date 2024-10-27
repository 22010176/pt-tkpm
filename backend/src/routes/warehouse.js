const express = require("express")
const router = express.Router({mergeParams: true})


router.route("/import")
.get((req, res) => {
  res.json({message: req.path})
})
.post((req, res) => {
  res.json({message: req.path})
})
.put((req, res) => {
  res.json({message: req.path})
})
.delete((req, res) => {
  res.json({message: req.path})
})

router.route("/export")
.get((req, res) => {
  res.json({message: req.path})
})
.post((req, res) => {
  res.json({message: req.path})
})
.put((req, res) => {
  res.json({message: req.path})
})
.delete((req, res) => {
  res.json({message: req.path})
})

module.exports = router