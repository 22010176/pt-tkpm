const bcrypt = require('bcrypt')

async function verifyAccount(conn, {mail, password}) {
  if (!mail || !password) return {success: false, message: "fail"};
  try {
    const [result] = await conn.query(
      `SELECT t.matkhau, n.manhanvien
       FROM taikhoan t
                INNER JOIN nhanvien n ON t.nhanvien = n.manhanvien
       WHERE n.mail = ?`, [mail])

    const user = result[0]
    const compare = await bcrypt.compare(password, user.matkhau)
    
    return {userid: user.manhanvien, result: compare, success: true}
  } catch (e) {
    return {result: false, success: false}
  }
}


module.exports = {
  verifyAccount,
}