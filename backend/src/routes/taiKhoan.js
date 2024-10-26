const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router({mergeParams: true})

const pool = require("../models/")
const {authAccount, authPermission} = require('../utilities/permissions')
const {createToken, decodeToken, verifyToken} = require('../utilities/validateToken')

// return token
async function ValidateAccount(email, password) {
  const connection = await pool.getConnection();
  const [result,] = await connection.query(
    `SELECT *
     FROM taiKhoan
     WHERE email = ?
       AND matKhau = ?;`,
    [email, password])
  connection.destroy()

  if (result.length === 0) return ``

  return await createToken(result[0].ma, email, password)
}

async function loginAccount(email, password) {
  const result = await ValidateAccount(email, password)
  if (!result.length) return {body: [], message: "Input is wrong", success: false}

  return {body: [{token: result}], message: "success login", success: true}
}

async function deleteAccount(token, email, password) {
  const data = decodeToken(token)
  if (!(data.email === email && data.password === password)) return {body: [], message: "Cant delete your account", success: false}
  const connection = await pool.getConnection();

  const [res] = await connection.query(
    `DELETE
     FROM taiKhoan
     WHERE ma = ?
       AND email = ?
       AND matKhau = ?;`,
    [data.id, data.email, data.password])

  connection.destroy()


  if (res.affectedRows == 0) return {body: [], message: "Your account doesnt exists", success: true}

  return {body: [], message: "Deleted your account", success: true}
}

async function logoutAccount(token, email) {
  console.log(token, email)
  return await verifyToken(token, email)
}


async function getAccountInfo(id) {
  const connection = await pool.getConnection()
  const [result] = await connection.query(`
              SELECT nv.ma, nv.hoTen, nv.gioiTinh, nv.ngaySinh, nv.soDienThoai, tk.email AS email, nq.ten AS tenNhomQuyen
              FROM nhanvien AS nv
                       INNER JOIN taiKhoan AS tk ON tk.ma = nv.taiKhoan
                       INNER JOIN nhomQuyen as nq ON nq.ma = tk.vaiTro
              WHERE nv.ma = ?;`,
    [id])
  connection.destroy()

  return {body: result, message: "success", success: true}
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
    res.json({body: req.body, message: "", success: true})
  })

module.exports = router