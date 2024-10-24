const express = require('express')
const router = express.Router({ mergeParams: true })

const { authPermission, perms } = require('../utilities/permissions')

const pool = require('../models')

async function getNhomQuyen() {
  const connection = await pool.getConnection();
  const [res] = await connection.query(`SELECT * FROM nhomQuyen ORDER BY ma`)

  connection.destroy()

  return { body: res, success: true, message: "success" }
}

async function getDanhSachChucNang() {
  const connection = await pool.getConnection();
  const [res] = await connection.query(`
SELECT qh.ma AS maQuyenHan, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong 
FROM quyenHan AS qh
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
ORDER BY maHanhDong;`)

  connection.destroy()

  return { body: res, success: true, message: "success" }
}

async function getChucNangTaiKhoan(account) {
  try {
    const connection = await pool.getConnection()
    const [result] = await pool.query(`
SELECT tk.ma AS maTaiKhoan, tk.email AS email, tk.vaiTro AS maVaiTro, nq.ten AS tenVaiTro, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM taiKhoan AS tk 
INNER JOIN nhomQuyen AS nq ON nq.ma = tk.vaiTro
INNER JOIN CTQuyen AS ct ON ct.nhomQuyen = nq.ma
INNER JOIN quyenHan AS qh ON qh.ma = ct.quyenHan
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
WHERE tk.ma = ?;`,
      [account.id])

    connection.destroy()
    return { body: result, success: true, message: "success" }
  } catch (error) {

  }
  return { body: [], success: false, message: "error" }
}

// /api/quyen-han
router.get("/danh-sach-nhom-quyen",
  authPermission({ chucNangID: 24, hanhDongID: 1 }),
  async function (req, res) {
    const result = await getNhomQuyen();
    // console.log(req.path)
    res.json(result)
  })

router.get("/danh-sach-chuc-nang",
  authPermission({ chucNangID: 24, hanhDongID: 1, last: true }),
  async function (req, res) {
    const result = await getDanhSachChucNang()
    res.json(result)
  })

router.get("/chuc-nang-tai-khoan/",
  authPermission({ chucNangID: 24, hanhDongID: 2 }),
  authPermission({ chucNangID: 24, hanhDongID: 1, last: true }),
  async function (req, res) {
    const result = await getChucNangTaiKhoan(res.locals.account);
    res.json(result)
  })

module.exports = router