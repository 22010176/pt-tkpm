async function getRoles(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_taikhoan.nhomquyen
       ORDER BY maNhomQuyen;`)

    return {roles: result, success: true};
  } catch (err) {
    console.log(err);
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
       FROM nhomQuyen nQ
                INNER JOIN ctquyen c ON nQ.maNhomQuyen = c.nhomQuyen
                INNER JOIN quyenHan qH on c.quyenHan = qH.maQuyenHan
                INNER JOIN hanhDong hD on qH.hanhDong = hD.maHanhDong
                INNER JOIN chucNang cN on qH.chucNang = cN.maChucNang
       WHERE nQ.maNhomQuyen = ?;`, [roleID])

    return {permissions: result, success: true};
  } catch (err) {
    return {permissions: [], success: false}
  }
}

async function insertRole(conn, role) {
}

async function updateRole(conn, role) {
}

async function deleteRole(conn) {
}

module.exports = {
  getRoles, insertRole, updateRole, deleteRole, getActionsQuery, getFeaturesQuery, getPermissionsQuery, getRolePermissions
}