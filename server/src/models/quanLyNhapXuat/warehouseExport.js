async function getExports(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM phieuxuatkho
       ORDER BY maphieuxuat DESC`)
    return {success: true, entries: result}
  } catch (err) {
    console.error(err);
    return {success: false, entries: []};
  }
}

async function insertExport(conn, imports = []) {
  try {
    await conn.query(
      `INSERT INTO phieuxuatkho (khachhang, nhanvienxuat, thoigianxuat)
       VALUES ?`,
      [imports.map(({khachhang, nhanvienxuat, thoigianxuat}) => [khachhang, nhanvienxuat, thoigianxuat])])

    const [result] = await conn.query(
      `SELECT *
       FROM phieuxuatkho
       WHERE nhanvienxuat IN ?
         AND khachhang IN ?
       ORDER BY thoigianxuat DESC
       LIMIT ?`,
      [
        [imports.map(({nhanvienxuat}) => nhanvienxuat)],
        [imports.map(({khachhang}) => khachhang)],
        imports.length
      ])
    // console.log(result, imports)

    return {message: "Export added", success: true, entries: result}
  } catch (err) {
    console.error(err);
    return {message: "Added fail", success: false, entries: []};
  }
}

async function updateExport(conn, {maphieunhap, khachhang, nhanvienxuat}) {
  try {
    await conn.query(
      `UPDATE phieuxuatkho
       SET khachhang    = ?,
           nhanvienxuat = ?
       WHERE maphieuxuat = ?`,
      [khachhang, nhanvienxuat, maphieunhap])

    return {message: "Export updated", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Updated fail", success: false, suppliers: []};
  }
}

async function deleteExport(conn, imports = []) {
  try {
    await conn.query(
      `DELETE
       FROM phieuxuatkho
       WHERE maphieuxuat IN ?`,
      [[imports.map(({maphieunhap}) => maphieunhap)]])

    return {message: "Exports deleted", success: true}
  } catch (err) {
    console.error(err);
    return {message: "Deleted fail", success: false};
  }
}

module.exports = {
  getExports, insertExport, updateExport, deleteExport
}