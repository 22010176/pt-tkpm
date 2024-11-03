const express = require('express');
const router = express.Router({mergeParams: true});

router.post("/login", function (req, res) {
  // res.json({message: req.path})
  res.redirect("/logout")
})

router.post("/register", function (req, res) {
  res.json({message: req.path})
})

router.post("/change-password", function (req, res) {
  // res.json({message: req.path})
  res.redirect("/eee")
})


module.exports = router;