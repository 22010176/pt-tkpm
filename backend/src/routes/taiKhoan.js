const express = require("express")
const { v4 } = require("uuid")
const router = express.Router({ mergeParams: true })

const pool = require("../models/")

// Generate login token
async function createToken(connection, rootID) {
  const token = new Array(6).fill().map(i => v4()).join("-");
  const [result] = await connection.query(
    `INSERT INTO tokenDangNhap (token, taiKhoanNguon) VALUES (?, ?);`,
    [token, rootID])

  if (result.affectedRows > 0) return token;
  return ''
}

async function deleteToken(token) {
  const connection = await pool.getConnection();
  let [result, context] = await connection.query(
    `SELECT * FROM tokenDangNhap WHERE token = ?;`,
    [token]
  )

  if (!result.length) {
    connection.destroy()
    return { success: false, message: "can't find token" };
  }

  await connection.query(
    `DELETE FROM tokenDangNhap WHERE ma = ?`,
    [result[0].ma]
  )

  connection.destroy()
  return { success: true, message: "success" };
}

// return token
async function checkEmployeeAccount(connection, email, password) {

}

// return token
async function checkRootAcconut(connection, email, password) {
  const [result, context] = await connection.query(
    `SELECT * FROM taiKhoanNguon WHERE email = ? AND matKhau = ?;`,
    [email, password])
  if (result.length === 0) return ``

  // console.log(result)
  return await createToken(connection, result[0].ma)
}

async function checkAccount(email, password) {
  const connection = await pool.getConnection();
  const result = await Promise.all([
    checkEmployeeAccount(connection, email, password),
    checkRootAcconut(connection, email, password)
  ])

  connection.destroy()
  return result.filter(i => i)[0]
}

// api/tai-khoan/
router.get("/lay-thong-tin", (req, res) => {
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
  const result = await deleteToken(req.body.token)

  res.json({ body: [], ...result })
})

router.delete("/xoa-tai-khoan", function (req, res) {
  res.json({ body: req.body, message: "", success: true })
})

router.post("/sua-tai-khoan", function (req, res) {
  res.json({ body: req.params, message: "", success: true })
})


router.route("/authToken")
  .post((req, res) => {
    res.json({ body: [], message: "success" })
  })


module.exports = router