async function getCustomers(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_doitac.khachhang
       ORDER BY maKhachHang;`)
    return {customers: result, success: true};
  } catch (e) {
    console.log(e)
    return {customers: [], success: false}
  }
}

async function insertCustomer(conn, customer) {
  try {
    await conn.query(
      `INSERT INTO ptpm_doitac.khachhang (tenKhachHang, ngaySinh, diaChi, soDienThoai, mail)
       VALUES (?, ?, ?, ?, ?)`,
      [customer.tenKhachHang, customer.ngaySinh, customer.diaChi, customer.soDienThoai, customer.mail]
    )
    return {message: "Customer added", success: true};
  } catch (e) {
    return {message: "Added fail", success: false};
  }
}

async function updateCustomer(conn, khachHang) {
  try {
    await conn.query(
      `UPDATE ptpm_doitac.khachhang
       SET tenKhachHang = ?,
           ngaySinh     = ?,
           diaChi       = ?,
           soDienThoai  = ?,
           mail         = ?
       WHERE maKhachHang = ?;`,
      [khachHang.tenKhachHang, khachHang.ngaySinh, khachHang.diaChi, khachHang.soDienThoai, khachHang.mail, khachHang.maKhachHang])
    return {message: "Customer updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteCustomer(conn, customer) {
  try {
    await conn.query(
      `DELETE
       FROM ptpm_doitac.khachHang
       WHERE maKhachHang = ?;`, [customer.maKhachHang])
    return {message: "Customer deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  getCustomers, insertCustomer, updateCustomer, deleteCustomer
}