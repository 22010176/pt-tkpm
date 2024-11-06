async function getEmployeeAccounts(conn) {
  try {
    const [result] = await conn.query(
      `SELECT t.mataikhoan,
              CONCAT('TK-' + t.mataikhoan) AS ma,
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

async function insertEmployeeAccount(conn, accounts = []) {
  try {
    await conn.query(
      `INSERT INTO taikhoan (matkhau, vaitro, nhanvien)
       VALUES ?;`,
      [accounts.map(({matkhau, vaitro, nhanvien}) => [matkhau, vaitro, nhanvien])])

    const [result] = await conn.query(
      `SELECT *
       FROM taikhoan
       WHERE nhanvien IN ?`, [[accounts.map(({nhanvien}) => nhanvien)]])
    return {message: "Account added", success: true, accounts: result};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateEmployeeAccount(conn, {vaitro, mataikhoan}) {
  try {
    await conn.query(
      `UPDATE taikhoan
       SET vaitro = ?
       WHERE mataikhoan = ?;`, [vaitro, mataikhoan])
    return {message: "Account updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteEmployeeAccount(conn, accounts = []) {
  try {
    await conn.query(
      `DELETE
       FROM taikhoan
       WHERE mataikhoan = ?;`, [[accounts.map(({mataikhoan}) => mataikhoan)]])
    return {message: "Account deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}


module.exports = {
  deleteEmployeeAccount, insertEmployeeAccount, updateEmployeeAccount, getEmployeeAccounts
}