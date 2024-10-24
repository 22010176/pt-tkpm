const express = require("express")
const cors = require('cors')

const app = express()
const port = 3001

const { decodeToken } = require('./src/utilities/validateToken')
const pool = require('./src/models')

const { authAccount, authPermission, getAllPerm } = require('./src/utilities/permissions')

async function getPermission(req, res, next) {
  const connection = await pool.getConnection()

  const [result] = await connection.query(`
SELECT tk.ma AS maTaiKhoan, tk.vaiTro AS maVaiTro, nq.ten AS tenVaiTro, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM taiKhoan AS tk 
INNER JOIN nhomQuyen AS nq ON nq.ma = tk.vaiTro
INNER JOIN CTQuyen AS ct ON ct.nhomQuyen = nq.ma
INNER JOIN quyenHan AS qh ON qh.ma = ct.quyenHan
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
WHERE tk.ma = ?`,
    [res.locals.account.id])

  res.locals.permissions = result

  connection.destroy()
  next()
}

async function parseAccountData(req, res, next) {
  try {
    const userData = decodeToken(req.headers.authorization)
    res.locals.account = userData
    next();
  } catch (error) {
    res.locals.account = {}
    next()
  }
}

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(parseAccountData)
app.use(getPermission)

app.use('/api/tai-khoan', require("./src/routes/taiKhoan"))
app.use("/api/quyen-han", authAccount, require('./src/routes/phanQuyen'))

app.all('/*', (req, res) => res.json({ success: false, message: "not found entry" }));

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})