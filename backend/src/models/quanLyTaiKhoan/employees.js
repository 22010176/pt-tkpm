async function getEmployees(conn) {
  try {
    const [result] = await conn.query(
      `SELECT nv.manhanvien,
              nv.hoten,
              nv.gioitinh,
              nv.ngaysinh,
              nv.mail,
              nv.sodienthoai,
              nq.tennhomquyen,
              nq.tenhienthi
       FROM nhanvien nv
                LEFT JOIN taikhoan tk ON nv.manhanvien = tk.nhanvien
                LEFT JOIN nhomquyen nq ON tk.vaitro = nq.manhomquyen;`)
    return {employees: result, success: true}
  } catch (e) {
    return {employees: [], success: false}
  }
}

async function getEmployeeWithoutAccount(conn) {
  try {
    const [result] = await conn.query(
      `SELECT n.manhanvien, n.hoten, n.mail
       FROM nhanvien n
                LEFT JOIN taikhoan t ON t.nhanvien = n.manhanvien
       WHERE t.mataikhoan IS NULL;`)
    return {employees: result, success: true}
  } catch (e) {
    return {employees: [], success: false}
  }
}

async function insertEmployee(conn, {hoten, ngaysinh, sodienthoai, gioitinh, mail}) {
  try {
    const [result] = await conn.query(
      `INSERT INTO nhanvien (hoten, ngaysinh, sodienthoai, gioitinh, mail)
       VALUES (?, ?, ?, ?, ?);`, [hoten, ngaysinh, sodienthoai, gioitinh, mail])
    return {message: "Employee added", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Added failed", success: false}
  }
}

async function insertMultipleEmployees(conn, employees = []) {
  try {
    const [result] = await conn.query(
      `INSERT INTO nhanvien (hoten, ngaysinh, sodienthoai, gioitinh, mail)
       VALUES ?`,
      [
        employees.map(({hoten, ngaysinh, sodienthoai, gioitinh, mail}) =>
          [hoten, ngaysinh, sodienthoai, gioitinh, mail])
      ])
    return {message: "Customers added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateEmployee(conn, {hoten, ngaysinh, sodienthoai, gioitinh, mail, manhanvien}) {
  try {
    const [result] = await conn.query(
      `UPDATE nhanvien
       SET hoten       = ?,
           ngaysinh    = ?,
           sodienthoai = ?,
           gioitinh    = ?,
           mail        = ?
       WHERE manhanvien = ?;`,
      [hoten, ngaysinh, sodienthoai, gioitinh, mail, manhanvien])

    return {message: "Employee updated", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Updated failed", success: true}
  }
}

async function deleteEmployee(conn, {maNhanVien}) {
  try {
    const [result] = await conn.query(
      `DELETE
       FROM nhanvien
       WHERE manhanvien = ?;`, [maNhanVien])

    return {message: "Employee deleted", success: true}
  } catch (e) {
    return {message: "Deleted failed", success: true}
  }
}

module.exports = {
  getEmployees, insertEmployee, updateEmployee, deleteEmployee, getEmployeeWithoutAccount, insertMultipleEmployees
}