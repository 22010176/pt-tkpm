const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router({mergeParams: true})

const pool = require("../models/")
const {authAccount, authPermission} = require('../utilities/permissions')
const {createToken, decodeToken, verifyToken} = require('../utilities/validateToken')

// return token
async function ValidateAccount(email, password) {
  return {}
}

async function loginAccount(email, password) {
  return {}
}

async function deleteAccount(token, email, password) {
  return {}
}

async function logoutAccount(token, email) {
  return {}
}


async function getAccountInfo(id) {


  return {body: [], message: "success", success: true}
}

// _____________________________________________________________________________________________________________________
// api/tai-khoan/
router.get("/thong-tin-ca-nhan",
  authAccount,
  authPermission({chucNangID: 22, hanhDongID: 2}),
  authPermission({chucNangID: 22, hanhDongID: 1, last: true}),
  async (req, res) => {
    const result = await getAccountInfo(res.locals.account.id)
    res.json(result)
  })

router.post("/dang-nhap", async function (req, res) {
  const result = await loginAccount(req.body.email, req.body.password)
  return res.json(result)
})

router.post("/tao-tai-khoan",
  authAccount,
  function (req, res) {
    res.json({body: req.body, message: "", success: true})
  })

router.post("/dang-suat",
  authAccount,
  async function (req, res) {
    const result = await logoutAccount(req.headers.authorization, req.body.email)
    res.json(result)
  })

router.post("/xoa-tai-khoan",
  authAccount,
  async function (req, res) {
    const result = await deleteAccount(req.headers.authorization, req.body.email, req.body.password)
    res.json(result)
  })

router.post("/sua-tai-khoan",
  authAccount,
  function (req, res) {
    res.json()
  })
/*
 * {
 body: req.body,
 message: "",
 success: true
 }
 *
 * */
module.exports = router