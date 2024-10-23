const express = require("express")
const jwt = require('jsonwebtoken')
const router = express.Router({ mergeParams: true })

const pool = require("../models/")

function parseToken(token = "") {
  if (!token.length) return ""
  return token.split(" ")[1]
}

function getSecretKey() { return "mySecretKey" }

// Generate login token
function createToken(rootID, email, password) {
  const token = jwt.sign({ email, id: rootID, password }, getSecretKey())
  return `Bearer ${token}`;
}

function decodeToken(token) {
  try {
    return jwt.verify(parseToken(token), getSecretKey())
  } catch (error) {
    return {}
  }
}

// return user if true
async function verifyToken(token, email) {
  const data = decodeToken(token)
  console.log(data)

  const connection = await pool.getConnection();
  const [result] = await connection.query(`
SELECT * FROM taiKhoan
WHERE matKhau = ? AND email = ? AND ma = ?;`,
    [data.password, data.email, data.id])

  if (!result.length) {
    connection.destroy()
    return { body: [], success: false, message: "can't find user" };
  }

  connection.destroy()
  return { body: [], success: true, message: "success" };
}


// return token
async function ValidateAccount(email, password) {
  const connection = await pool.getConnection();
  const [result,] = await connection.query(
    `SELECT * FROM taiKhoan WHERE email = ? AND matKhau = ?;`,
    [email, password])
  connection.destroy()

  if (result.length === 0) return ``

  return createToken(result[0].ma, email, password)
}

async function loginAccount(email, password) {
  const result = await ValidateAccount(email, password)
  if (!result.length) return { body: [], message: "Input is wrong", success: false }

  return { body: [{ token: result }], message: "success login", success: true }
}

async function deleteAccount(token, email, password) {
  const data = decodeToken(token)
  // console.log(data, email, password)
  if (!(data.email === email && data.password === password)) return { body: [], message: "Cant delete your account", success: false }
  const connection = await pool.getConnection();

  const [res] = await connection.query(`
DELETE FROM taiKhoan 
WHERE ma = ? AND email = ? AND matKhau = ?;`,
    [data.id, data.email, data.password])

  if (res.affectedRows == 0) return { body: [], message: "Your account doesnt exists", success: true }

  return { body: [], message: "Deleted your account", success: true }
}

async function logoutAccount(token, email) {
  console.log(token, email)
  return await verifyToken(token, email)
}


// _____________________________________________________________________________________________________________________
// api/tai-khoan/
router.get("/lay-thong-tin", async (req, res) => {
  res.json({ body: [req.query], message: "success", success: true })
})

router.post("/dang-nhap", async function (req, res) {
  const result = await loginAccount(req.body.email, req.body.password)
  return res.json(result)
})

router.post("/tao-tai-khoan", function (req, res) {
  res.json({ body: req.body, message: "", success: true })
})

router.post("/dang-suat", async function (req, res) {
  const result = await logoutAccount(req.headers.authorization, req.body.email)
  res.json(result)
})

router.post("/xoa-tai-khoan", async function (req, res) {
  const result = await deleteAccount(req.headers.authorization, req.body.email, req.body.password)
  res.json(result)
})

router.post("/sua-tai-khoan", function (req, res) {
  res.json({ body: req.body, message: "", success: true })
})

module.exports = router