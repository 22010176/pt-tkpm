async function getAccounts(conn) {
  try {
    const [result] = await conn.query(
      `SELECT t.maTaiKhoan,
              nV.maNhanVien,
              nV.hoTen,
              nv.mail,
              nV.soDienThoai,
              nQ.maNhomQuyen,
              nQ.tenNhomQuyen,
              nQ.tenHienThi,
              nQ.ghiChu
       FROM ptpm_taikhoan.taiKhoan t
                INNER JOIN ptpm_taikhoan.nhanVien nV on t.nhanVien = nV.maNhanVien
                INNER JOIN ptpm_taikhoan.nhomQuyen nQ on t.vaiTro = nQ.maNhomQuyen;`)
    return {accounts: result, success: true};
  } catch (e) {
    console.log(e)
    return {accounts: [], success: false}
  }
}

async function insertAccount(conn, account) {
  try {
    const [result] = await conn.query(
      `INSERT INTO ptpm_taikhoan.taiKhoan (matKhau, vaiTro, nhanVien)
       VALUES (?, ?, ?);`,
      [account.matKhau, account.vaiTro, account.nhanVien])
    return {message: "Account added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateAccount(conn, account) {
  try {
    await conn.query(
      `UPDATE ptpm_taikhoan.taikhoan
       SET vaiTro = ?
       WHERE maTaiKhoan = ?;`,
      [account.vaiTro, account.maTaiKhoan])
    return {message: "Account updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteAccount(conn, account) {
  try {
    await conn.query(
      `DELETE
       FROM ptpm_taikhoan.taikhoan
       WHERE maTaiKhoan = ?;`, [account.maTaiKhoan])
    return {message: "Account deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  deleteAccount, insertAccount, updateAccount,getAccounts
}