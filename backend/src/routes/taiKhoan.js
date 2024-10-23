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
async function createToken(rootID, email, password) {
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
async function verifyToken(token) {
  const data = decodeToken(token)

  const connection = await pool.getConnection();
  const [result] = await connection.query(`
SELECT hoTen, email, soDienThoai, ngaySinh, gioiTinh FROM taiKhoanNguon
WHERE matKhau = ? AND email = ? AND ma = ?;`
    , [data.password, data.email, data.id])

  if (!result.length) {
    connection.destroy()
    return { body: [], success: false, message: "can't find user" };
  }

  connection.destroy()
  return { body: result, success: true, message: "success" };
}

// return token
async function checkEmployeeAccount(connection, email, password) {

}

// return token
async function ValidateAccount(connection, email, password) {
  const [result,] = await connection.query(
    `SELECT * FROM taiKhoanNguon WHERE email = ? AND matKhau = ?;`,
    [email, password])
  if (result.length === 0) return ``

  // console.log(result)
  return await createToken(result[0].ma, email, password)
}

async function checkAccount(email, password) {
  const connection = await pool.getConnection();
  const result = await ValidateAccount(connection, email, password)

  connection.destroy()
  return result.filter(i => i)[0]
}

async function deleteAccount(token, email, password) {
  const data = decodeToken(token)
  console.log(data, email, password)
  if (!(data.email === email && data.password === password)) return { body: [], message: "Cant delete your account", success: false }
  const connection = await pool.getConnection();

  const [res] = await connection.query(`
DELETE FROM taiKhoanNguon 
WHERE ma = ? AND email = ? AND matKhau = ?;`,
    [token.id, token.email, token.password])

  if (res.affectedRows == 0) return { body: [], message: "Your account doesnt exists", success: true }

  return { body: [], message: "Deleted your account", success: true }
}

// api/tai-khoan/
router.get("/lay-thong-tin", async (req, res) => {
  res.json({ body: [req.query], message: "success", success: true })
})

router.post("/dang-nhap", async function (req, res) {
  const result = await checkAccount(req.body.email, req.body.password)
  if (result) return res.json({ body: [{ token: result }], message: "success", success: true })

  return res.json({ body: [], message: "Email or password is wrong", success: false })
})

router.put("/dang-ki", function (req, res) {
  res.json({ body: req.body, message: "", success: true })
})

router.post("/dang-suat", async function (req, res) {
  const result = await verifyToken(req.headers.authorization)
  res.json(result)
})

router.delete("/xoa-tai-khoan", async function (req, res) {
  const result = await deleteAccount(req.headers.authorization, req.body.email, req.body.password)
  res.json(result)
})

router.post("/sua-tai-khoan", function (req, res) {
  res.json({ body: req.params, message: "", success: true })
})

module.exports = router