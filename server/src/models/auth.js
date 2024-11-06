const bcrypt = require('bcrypt')

async function verifyAccount(conn, {mail, password}) {
  if (!mail || !password) return {success: false, message: "fail"};
  try {
    const [result] = await conn.query(
      `SELECT t.matkhau, n.manhanvien userid
       FROM taikhoan t
                INNER JOIN ptpm.nhanvien n ON t.nhanvien = n.manhanvien
       WHERE n.mail = ?`, [mail])

    const compare = await bcrypt.compare(password, result[0].matkhau)
    return {userid: result[0].userid, result: compare, success: true}
  } catch (e) {
    return {result: false, success: false}
  }
}


module.exports = {
  verifyAccount,
}