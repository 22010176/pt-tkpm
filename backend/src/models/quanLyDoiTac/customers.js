async function getCustomers(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM khachhang
       ORDER BY makhachhang;`)
    return {customers: result, success: true};
  } catch (e) {
    console.log(e)
    return {customers: [], success: false}
  }
}

async function insertCustomer(conn, customers = []) {
  try {
    await conn.query(
      `INSERT INTO khachhang (tenkhachhang, ngaysinh, diachi, sodienthoai, mail)
       VALUES ?`,
      [
        customers.map(({tenkhachhang, ngaysinh, diachi, sodienthoai, mail}) => [
          tenkhachhang, ngaysinh, diachi, sodienthoai, mail
        ])
      ]
    )
    return {message: "Customers added", success: true};
  } catch (e) {
    return {message: "Added fail", success: false};
  }
}

async function updateCustomer(conn, {tenkhachhang, ngaysinh, diachi, sodienthoai, mail}) {
  try {
    await conn.query(
      `UPDATE khachhang
       SET tenkhachhang = ?,
           ngaysinh     = ?,
           diachi       = ?,
           sodienthoai  = ?,
           mail         = ?
       WHERE makhachhang = ?;`,
      [tenkhachhang, ngaysinh, diachi, sodienthoai, mail])
    return {message: "Customer updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteCustomer(conn, cusomters = []) {
  try {
    await conn.query(
      `DELETE
       FROM khachhang
       WHERE makhachhang IN ?;`,
      [cusomters.map(({makhachhang}) => [makhachhang])])
    return {message: "Customer deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  getCustomers, insertCustomer, updateCustomer, deleteCustomer
}