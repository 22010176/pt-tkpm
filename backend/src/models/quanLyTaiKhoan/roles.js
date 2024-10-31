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
       FROM ptpm_taikhoan.ctquyen c
                INNER JOIN ptpm_taikhoan.quyenHan qH on c.quyenHan = qH.maQuyenHan
                INNER JOIN ptpm_taikhoan.chucNang cN on qH.chucNang = cN.maChucNang
                INNER JOIN ptpm_taikhoan.hanhDong hD on qH.hanhDong = hD.maHanhDong
       WHERE c.nhomQuyen = ?;`, [roleID])

    const [role] = await conn.query(
      `SELECT *
       FROM ptpm_taikhoan.nhomquyen
       WHERE maNhomQuyen = ?;`, [roleID])

    return {permissions: result, role, success: true};
  } catch (err) {
    return {permissions: [], success: false}
  }
}

async function insertRole(conn, {tenNhomQuyen, tenHienThi, ghiChu, danhSachQuyen = []}) {
  try {
    await conn.query(
      `INSERT INTO ptpm_taikhoan.nhomQuyen (tenNhomQuyen, tenHienThi, ghiChu)
       VALUES (?, ?, ?);`,
      [tenNhomQuyen, tenHienThi, ghiChu])

    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_taikhoan.nhomquyen
       WHERE tenNhomQuyen = ?
         AND tenHienThi = ?
         AND ghiChu = ?
       ORDER BY maNhomQuyen DESC
       LIMIT 1;`, [tenNhomQuyen, tenHienThi, ghiChu]
    )

    await conn.query(
      `INSERT INTO ptpm_taikhoan.ctquyen (nhomQuyen, quyenHan)
       VALUES ?`, [danhSachQuyen.map(({maQuyenHan}) => [result[0]?.maNhomQuyen, maQuyenHan])]
    )
    console.log(danhSachQuyen)

    return {message: "Role added", success: true, body: result};
  } catch (e) {
    return {message: "Added fail", success: false};
  }
}

async function updateRole(conn, {tenNhomQuyen, tenHienThi, ghiChu, maNhomQuyen, danhSachQuyen = []}) {
  try {
    const [result] = await conn.query(
      `UPDATE ptpm_taikhoan.nhomQuyen
       SET tenNhomQuyen = ?,
           tenHienThi   = ?,
           ghiChu       = ?
       WHERE maNhomQuyen = ?;`,
      [tenNhomQuyen, tenHienThi, ghiChu, maNhomQuyen]);
    console.log(maNhomQuyen)
    const test = await insertPermissionQuery(
      conn,
      danhSachQuyen.map(({maQuyenHan}) => ({maNhomQuyen, maQuyenHan})))
    console.log(test)

    return {message: "Role updated", success: test};

  } catch (e) {
    console.log(e)
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

async function insertPermissionQuery(conn, perms = []) {
  try {
    await conn.query(`DELETE
                      FROM ptpm_taikhoan.ctquyen
                      WHERE nhomQuyen IN ?`, [[perms.map(i => i.maNhomQuyen)]]);
    console.log(perms)
    const [result] = await conn.query(
      `INSERT INTO ptpm_taikhoan.ctquyen (nhomQuyen, quyenHan)
       VALUES ?`,
      [perms.map(({maNhomQuyen, maQuyenHan}) => [maNhomQuyen, maQuyenHan])]);
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

module.exports = {
  getRoles, insertRole, updateRole, deleteRole, getActionsQuery, getFeaturesQuery, getPermissionsQuery, getRolePermissions, insertPermissionQuery
}