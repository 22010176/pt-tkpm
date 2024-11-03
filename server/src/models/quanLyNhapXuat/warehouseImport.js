async function getImports(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM phieunhapkho
       ORDER BY maphieunhap DESC`)
    return {success: true, entries: result}
  } catch (err) {
    console.error(err);
    return {success: false, entries: []};
  }
}

async function insertImport(conn, imports = []) {
  try {
    await conn.query(
      `INSERT INTO phieunhapkho (nhacungcap, nhanviennhap)
       VALUES ?`,
      [imports.map(({nhacungcap, nhanviennhap}) => [nhacungcap, nhanviennhap])])
    
    const [result] = await conn.query(
      `SELECT *
       FROM phieunhapkho
       WHERE nhanviennhap IN ?
         AND nhacungcap IN ?
       ORDER BY thoigiannhap DESC
       LIMIT ?`,
      [
        [imports.map(({nhanviennhap}) => nhanviennhap)],
        [imports.map(({nhacungcap}) => nhacungcap)],
        imports.length
      ])
    // console.log(result, imports)

    return {message: "Import added", success: true, entries: result}
  } catch (err) {
    console.error(err);
    return {message: "Added fail", success: false, entries: []};
  }
}

async function updateImport(conn, {maphieunhap, nhacungcap, nhanviennhap}) {
  try {
    await conn.query(
      `UPDATE phieunhapkho
       SET nhacungcap   = ?,
           nhanviennhap = ?
       WHERE maphieunhap = ?`,
      [nhacungcap, nhanviennhap, maphieunhap])

    return {message: "Import updated", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Updated fail", success: false, suppliers: []};
  }
}

async function deleteImport(conn, imports = []) {
  try {
    await conn.query(
      `DELETE
       FROM phieunhapkho
       WHERE maphieunhap IN ?`,
      [[imports.map(({maphieunhap}) => maphieunhap)]])

    return {message: "Imports deleted", success: true}
  } catch (err) {
    console.error(err);
    return {message: "Deleted fail", success: false};
  }
}

module.exports = {
  getImports, insertImport, updateImport, deleteImport
}