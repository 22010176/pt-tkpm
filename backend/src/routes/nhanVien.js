const express = require('express');

const router = express.Router({mergeParams: true});

const pool = require('../models');

async function getNhanVien() {
  const connection = await pool.getConnection();

  const [result] = await connection.query(
    `SELECT nv.ma, nv.hoTen, nv.gioiTinh, nv.ngaySinh, nv.soDienThoai, tk.email AS email, nq.ten AS tenNhomQuyen
     FROM nhanvien AS nv
              INNER JOIN taiKhoan AS tk ON tk.ma = nv.taiKhoan
              INNER JOIN nhomQuyen as nq ON nq.ma = tk.vaiTro;`)

  connection.destroy();
  return {body: result, message: "success", success: true}
}

// api/nhan-vien/
router.get("/danh-sach-nhan-vien",
  async (req, res) => {
    const result = await getNhanVien()
    return res.json(result)
  }
)

module.exports = router;