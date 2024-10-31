async function getEmployees(conn) {
  try {
    const [result] = await conn.query(
      `SELECT nv.manhanvien, nv.hoten, nv.gioitinh, nv.ngaysinh, nv.mail, nv.sodienthoai, nq.tennhomquyen,nq.tenhienthi
       FROM ptpm_taikhoan.nhanvien nv
                LEFT JOIN ptpm_taikhoan.taikhoan tk ON nv.manhanvien = tk.nhanvien
                LEFT JOIN ptpm_taikhoan.nhomquyen nq ON tk.vaitro = nq.manhomquyen;`)
    return {employees: result, success: true}
  } catch (e) {
    return {employees: [], success: false}
  }
}

async function getEmployeeWithoutAccount(conn) {
  try {
    const [result] = await conn.query(`SELECT n.manhanvien, n.hoten, n.mail
                                       FROM ptpm_taikhoan.nhanvien n
                                                LEFT JOIN ptpm_taikhoan.taikhoan t ON t.nhanvien = n.manhanvien
                                       WHERE t.mataikhoan IS NULL;`)
    return {employees: result, success: true}
  } catch (e) {
    return {employees: [], success: false}
  }
}

async function insertEmployee(conn, {hoTen, ngaySinh, soDienThoai, gioiTinh, mail}) {
  try {
    const [result] = await conn.query(`INSERT INTO ptpm_taikhoan.nhanvien (hoten, ngaysinh, sodienthoai, gioitinh, mail)
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
                                           (hoten, ngaysinh, sodienthoai, gioitinh, mail)
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
                                       SET hoten       = ?,
                                           ngaysinh    = ?,
                                           sodienthoai = ?,
                                           gioitinh    = ?,
                                           mail        = ?
                                       WHERE manhanvien = ?;`, [employee.hoTen, employee.ngaySinh, employee.soDienThoai, employee.gioiTinh, employee.mail, employee.maNhanVien])

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
                                       WHERE manhanvien = ?;`, [employee.maNhanVien])

    return {message: "Employee deleted", success: true}
  } catch (e) {
    return {message: "Deleted failed", success: true}
  }
}

module.exports = {
  getEmployees, insertEmployee, updateEmployee, deleteEmployee, getEmployeeWithoutAccount, insertMultipleEmployees
}