async function getEmployees(conn) {
  try {
    const [result] = await conn.query(`SELECT nV.maNhanVien, nv.hoTen, nV.gioiTinh, nV.ngaySinh, nV.mail, nV.soDienThoai, nQ.tenNhomQuyen
                                       FROM ptpm_taikhoan.nhanVien nV
                                                LEFT JOIN ptpm_taikhoan.taiKhoan tK on nV.maNhanVien = tK.nhanVien
                                                LEFT JOIN ptpm_taikhoan.nhomQuyen nQ on tK.vaiTro = nQ.maNhomQuyen;`)
    return {employees: result, success: true}
  } catch (e) {
    return {employees: [], success: false}
  }
}

async function getEmployeeWithoutAccount(conn) {
  try {
    const [result] = await conn.query(`SELECT n.maNhanVien, n.hoTen, n.mail
                                       FROM ptpm_taiKhoan.nhanVien n
                                                LEFT JOIN ptpm_taiKhoan.taikhoan t ON t.nhanVien = n.maNhanVien
                                       WHERE t.maTaiKhoan IS NULL;`)
    return {employees: result, success: true}
  } catch (e) {
    return {employees: [], success: false}
  }
}

async function insertEmployee(conn, {hoTen, ngaySinh, soDienThoai, gioiTinh, mail}) {
  try {
    const [result] = await conn.query(`INSERT INTO ptpm_taikhoan.nhanvien (hoTen, ngaySinh, soDienThoai, gioiTinh, mail)
                                       VALUES (?, ?, ?, ?, ?);`, [hoTen, ngaySinh, soDienThoai, gioiTinh, mail])
    return {message: "Employee added", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Added failed", success: false}
  }
}

async function insertMultipleEmployees(conn, employees = []) {
  try {
    const [result] = await conn.query(`INSERT INTO ptpm_taikhoan.nhanvien
                                           (hoTen, ngaySinh, soDienThoai, gioiTinh, mail)
                                       VALUES ?`, [employees.map(({hoTen, ngaySinh, soDienThoai, gioiTinh, mail}) => [hoTen, ngaySinh, soDienThoai, gioiTinh, mail])])
    return {message: "Customers added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateEmployee(conn, employee) {
  try {
    const [result] = await conn.query(`UPDATE ptpm_taikhoan.nhanvien
                                       SET hoTen       = ?,
                                           ngaySinh    = ?,
                                           soDienThoai = ?,
                                           gioiTinh    = ?,
                                           mail        = ?
                                       WHERE maNhanVien = ?;`, [employee.hoTen, employee.ngaySinh, employee.soDienThoai, employee.gioiTinh, employee.mail, employee.maNhanVien])

    return {message: "Employee updated", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Updated failed", success: true}
  }
}

async function deleteEmployee(conn, employee) {
  try {
    const [result] = await conn.query(`DELETE
                                       FROM ptpm_taikhoan.nhanvien
                                       WHERE maNhanVien = ?;`, [employee.maNhanVien])

    return {message: "Employee deleted", success: true}
  } catch (e) {
    return {message: "Deleted failed", success: true}
  }
}

module.exports = {
  getEmployees, insertEmployee, updateEmployee, deleteEmployee, getEmployeeWithoutAccount, insertMultipleEmployees
}