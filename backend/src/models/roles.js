async function getRoles(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_taikhoan.nhomquyen
       WHERE maNhomQuyen != 1 # root id
       ORDER BY maNhomQuyen;`)

    return {roles: result, success: true};
  } catch (err) {
    return {roles: [], success: false};
  }
}

async function getActionsQuery(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_taikhoan.hanhdong
       ORDER BY maHanhDong;`)

    return result;
  } catch (err) {
    return []
  }
}

async function getFeaturesQuery(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_taikhoan.chucnang
       ORDER BY maChucNang;`)

    return result;
  } catch (err) {
    return []
  }
}

async function getPermissionsQuery(conn) {
  try {
    const [result] = await conn.query(
      `SELECT q.maQuyenHan, cN.*, hD.*
       FROM ptpm_taikhoan.quyenHan q
                INNER JOIN ptpm_taikhoan.chucNang cN on q.chucNang = cN.maChucNang
                INNER join ptpm_taikhoan.hanhDong hD on q.hanhDong = hD.maHanhDong
       ORDER BY cN.maChucNang, hD.maHanhDong;`)

    return result;
  } catch (err) {
    return []
  }
}

async function getRolePermissions(conn, roleID) {
  try {
    const [result] = await conn.query(
      `SELECT qh.maQuyenHan, cN.maChucNang, cN.tenChucNang, hD.maHanhDong, hD.tenHanhDong
       FROM ptpm_taikhoan.nhomQuyen nQ
                INNER JOIN ptpm_taikhoan.ctquyen c ON nQ.maNhomQuyen = c.nhomQuyen
                INNER JOIN ptpm_taikhoan.quyenHan qH on c.quyenHan = qH.maQuyenHan
                INNER JOIN ptpm_taikhoan.hanhDong hD on qH.hanhDong = hD.maHanhDong
                INNER JOIN ptpm_taikhoan.chucNang cN on qH.chucNang = cN.maChucNang
       WHERE nQ.maNhomQuyen = ?;`, [roleID])

    return {permissions: result, success: true};
  } catch (err) {
    return {permissions: [], success: false}
  }
}

async function insertRole(conn, role) {
  try {
    const [result] = await conn.query(
      `INSERT INTO ptpm_taikhoan.nhomQuyen (tenNhomQuyen, tenHienThi, ghiChu)
       VALUES (?, ?, ?);`,
      [role.tenNhomQuyen, role.tenHienThi, role.ghiChu])

    return {message: "Role added", success: true};
  } catch (e) {
    return {message: "Added fail", success: false};
  }
}

async function updateRole(conn, role) {
  try {
    const [result] = await conn.query(
      `UPDATE ptpm_taikhoan.nhomQuyen
       SET tenNhomQuyen = ?,
           tenHienThi   = ?,
           ghiChu       = ?
       WHERE maNhomQuyen = ?;`,
      [role.tenNhomQuyen, role.tenHienThi, role.ghiChu, role.maNhomQuyen]);

    return {message: "Role updated", success: true};

  } catch (e) {
    return {message: "Updated fail", success: false};
  }
}

async function deleteRole(conn, role) {
  try {
    const [result] = await conn.query(
      `DELETE
       FROM ptpm_taikhoan.nhomQuyen
       WHERE maNhomQuyen = ?;`,
      [role.maNhomQuyen]);

    return {message: "Role deleted", success: true};

  } catch (e) {
    return {message: "Deleted fail", success: false};
  }
}

async function insertPermission(conn, role, permissions) {

}

async function deletePermission(conn, role, permissions) {

}

module.exports = {
  getRoles, insertRole, updateRole, deleteRole, getActionsQuery, getFeaturesQuery, getPermissionsQuery, getRolePermissions
}