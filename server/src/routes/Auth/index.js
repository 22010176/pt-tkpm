const express = require('express');
const {verifyAccount} = require("../../models/auth");
const {createToken, getSecretKey} = require("./validateToken");

const router = express.Router({mergeParams: true});

router.post("/login", async function (req, res) {
  const result = await verifyAccount(res.locals.conn, req.body)
  if (!result.result) return res.json(result);
  const token = createToken(result.userid, req.body.mail, req.body.password)

  delete result.userid
  res.json({...result, token})
})

router.post("/register", function (req, res) {
  
  res.json({message: req.path})
})

router.post("/change-password", function (req, res) {
  // res.json({message: req.path})
  res.redirect("/eee")
})


module.exports = router;