async function getRoles(conn) {
  try {
    const [result] = await conn.query(`
        SELECT *
        FROM nhomquyen
        WHERE manhomquyen != 1 # root id
        ORDER BY manhomquyen;`)

    return {roles: result, success: true};
  } catch (err) {
    return {roles: [], success: false};
  }
}

async function getActionsQuery(conn) {
  try {
    const [result] = await conn.query(`
        SELECT *
        FROM hanhdong
        ORDER BY mahanhdong;`)
    return result;
  } catch (err) {
    return []
  }
}

async function getFeaturesQuery(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM chucnang
       ORDER BY machucnang;`)
    return result;
  } catch (err) {
    return []
  }
}

async function getPermissionsQuery(conn) {
  try {
    const [result] = await conn.query(
      `SELECT q.maquyenhan, cn.*, hd.*
       FROM quyenhan q
                INNER JOIN chucnang cn ON q.chucnang = cn.machucnang
                INNER JOIN hanhdong hd ON q.hanhdong = hd.mahanhdong
       ORDER BY cn.machucnang, hd.mahanhdong;`)

    return result;
  } catch (err) {
    return []
  }
}

async function getRolePermissions(conn, manhomquyen) {
  try {
    const [result] = await conn.query(
      `SELECT qh.maquyenhan, cn.machucnang, cn.tenchucnang, hd.mahanhdong, hd.tenhanhdong
       FROM ctquyen c
                INNER JOIN quyenhan qh ON c.quyenhan = qh.maquyenhan
                INNER JOIN chucnang cn ON qh.chucnang = cn.machucnang
                INNER JOIN hanhdong hd ON qh.hanhdong = hd.mahanhdong
       WHERE c.nhomquyen = ?;`, [manhomquyen])

    const [role] = await conn.query(
      `SELECT *
       FROM nhomquyen
       WHERE manhomquyen = ?;`, [manhomquyen])

    return {permissions: result, role, success: true};
  } catch (err) {
    return {permissions: [], success: false}
  }
}

async function insertRole(conn, {tennhomquyen, tenhienthi, ghichu, danhsachquyen = []}) {
  try {
    await conn.query(
      `INSERT INTO nhomquyen (tennhomquyen, tenhienthi, ghichu)
       VALUES (?, ?, ?);`, [tennhomquyen, tenhienthi, ghichu])

    const [result] = await conn.query(
      `SELECT *
       FROM nhomquyen
       WHERE tennhomquyen = ?
         AND tenhienthi = ?
         AND ghichu = ?
       ORDER BY manhomquyen DESC
       LIMIT 1;`, [tennhomquyen, tenhienthi, ghichu])
    if (danhsachquyen.length === 0) return {message: "Role added", success: true, body: result};

    const {manhomquyen} = result[0]
    const test = await insertPermissionQuery(
      conn,
      danhsachquyen.map(({maquyenhan}) => ({manhomquyen, maquyenhan})))

    return {message: "Role added", success: test, body: [{...result[0], danhsachquyen: test}]};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false, body: []};
  }
}

async function updateRole(conn, {tennhomquyen, tenhienthi, ghichu, manhomquyen, danhsachquyen = []}) {
  try {
    const [result] = await conn.query(
      `UPDATE nhomquyen
       SET tennhomquyen = ?,
           tenhienthi   = ?,
           ghichu       = ?
       WHERE manhomquyen = ?;`,
      [tennhomquyen, tenhienthi, ghichu, manhomquyen]);

    const test = await insertPermissionQuery(
      conn,
      danhsachquyen.map(({maquyenhan}) => ({manhomquyen, maquyenhan})))

    return {message: "Role updated", success: test};

  } catch (e) {
    console.log(e)
    return {message: "Updated fail", success: false};
  }
}

async function deleteRole(conn, roles = []) {
  try {
    const [result] = await conn.query(
      `DELETE
       FROM nhomquyen
       WHERE manhomquyen IN ?`,
      [[roles.map(({manhomquyen}) => manhomquyen)]]);
    return {message: "Role deleted", success: true};

  } catch (e) {
    console.log(e)
    return {message: "Deleted fail", success: false};
  }
}

async function insertPermissionQuery(conn, perms = []) {
  try {
    if (perms.length > 0) await conn.query(
      `DELETE
       FROM ctquyen
       WHERE nhomquyen IN ?`,
      [[perms.map(({manhomquyen}) => manhomquyen)]]);

    const [result] = await conn.query(
      `INSERT INTO ctquyen (nhomquyen, quyenhan)
       VALUES ?`,
      [perms.map(({manhomquyen, maquyenhan}) => [manhomquyen, maquyenhan])]);

    return (await conn.query(
      `SELECT *
       FROM ctquyen
       WHERE nhomquyen IN ?`,
      [[perms.map(({manhomquyen}) => manhomquyen)]]
    ))[0]
  } catch (e) {
    console.log(e)
    return []
  }
}

module.exports = {
  getRoles, insertRole, updateRole, deleteRole, getActionsQuery, getFeaturesQuery, getPermissionsQuery, getRolePermissions, insertPermissionQuery
}