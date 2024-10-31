async function getAccounts(conn) {
  try {
    const [result] = await conn.query(
      `SELECT t.mataikhoan,
              nv.manhanvien,
              nv.hoten,
              nv.mail,
              nv.sodienthoai,
              nq.manhomquyen,
              nq.tennhomquyen,
              nq.tenhienthi,
              nq.ghichu
       FROM taikhoan t
                INNER JOIN nhanvien nv ON t.nhanvien = nv.manhanvien
                INNER JOIN nhomquyen nq ON t.vaitro = nq.manhomquyen;`)
    return {accounts: result, success: true};
  } catch (e) {
    console.log(e)
    return {accounts: [], success: false}
  }
}

async function insertAccount(conn, {matkhau, vaitro, nhanvien}) {
  try {
    const [result] = await conn.query(
      `INSERT INTO taikhoan (matkhau, vaitro, nhanvien)
       VALUES (?, ?, ?);`,
      [matkhau, vaitro, nhanvien])
    return {message: "Account added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateAccount(conn, {vaitro, mataikhoan}) {
  try {
    await conn.query(
      `UPDATE taikhoan
       SET vaitro = ?
       WHERE mataikhoan = ?;`,
      [vaitro, mataikhoan])
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
       FROM taikhoan
       WHERE mataikhoan = ?;`, [account.mataikhoan])
    return {message: "Account deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  deleteAccount, insertAccount, updateAccount, getAccounts
}