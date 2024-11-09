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

async function findExports(conn, {makhachhang, manhanvien, tungay, denngay, tusotien, densotien}) {
  try {
    let result;
    if (makhachhang === '*' && manhanvien === '*')
      [result] = await conn.query(
        `SELECT p.maphieuxuat, k.tenkhachhang, n.hoten, p.thoigianxuat thoigian, SUM(c.giaxuat) tongtien
         FROM phieuxuatkho p
                  INNER JOIN khachhang k ON p.khachhang = k.makhachhang
                  INNER JOIN nhanvien n ON p.nhanvienxuat = n.manhanvien
                  INNER JOIN sanpham s ON p.maphieuxuat = s.phieuxuat
                  INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
         GROUP BY p.maphieuxuat, p.thoigianxuat
         HAVING COUNT(DISTINCT masanpham) > 0
         ORDER BY p.thoigianxuat DESC`)

    else if (makhachhang === '*')
      [result] = await conn.query(
        `SELECT p.maphieuxuat, k.tenkhachhang, n.hoten, p.thoigianxuat thoigian, SUM(c.giaxuat) tongtien
         FROM phieuxuatkho p
                  INNER JOIN khachhang k ON p.khachhang = k.makhachhang
                  INNER JOIN nhanvien n ON p.nhanvienxuat = n.manhanvien
                  INNER JOIN sanpham s ON p.maphieuxuat = s.phieuxuat
                  INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
         WHERE n.manhanvien = ?
           AND p.thoigianxuat BETWEEN ? AND ?
         GROUP BY p.maphieuxuat, p.thoigianxuat
         HAVING tongtien BETWEEN ? AND ?
            AND COUNT(DISTINCT masanpham) > 0
         ORDER BY p.thoigianxuat DESC`,
        [manhanvien, tungay, denngay, tusotien, densotien])
    else if (manhanvien === '*')
      [result] = await conn.query(
        `SELECT p.maphieuxuat, k.tenkhachhang, n.hoten, p.thoigianxuat thoigian, SUM(c.giaxuat) tongtien
         FROM phieuxuatkho p
                  INNER JOIN khachhang k ON p.khachhang = k.makhachhang
                  INNER JOIN nhanvien n ON p.nhanvienxuat = n.manhanvien
                  INNER JOIN sanpham s ON p.maphieuxuat = s.phieuxuat
                  INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
         WHERE k.makhachhang = ?
           AND p.thoigianxuat BETWEEN ? AND ?
         GROUP BY p.maphieuxuat, p.thoigianxuat
         HAVING tongtien BETWEEN ? AND ?
            AND COUNT(DISTINCT masanpham) > 0
         ORDER BY p.thoigianxuat DESC`,
        [makhachhang, tungay, denngay, tusotien, densotien])
    else [result] = await conn.query(
        `SELECT p.maphieuxuat, k.tenkhachhang, n.hoten, p.thoigianxuat thoigian, SUM(c.giaxuat) tongtien
         FROM phieuxuatkho p
                  INNER JOIN khachhang k ON p.khachhang = k.makhachhang
                  INNER JOIN nhanvien n ON p.nhanvienxuat = n.manhanvien
                  INNER JOIN sanpham s ON p.maphieuxuat = s.phieuxuat
                  INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
         WHERE k.makhachhang = ?
           AND n.manhanvien = ?
           AND p.thoigianxuat BETWEEN ? AND ?
         GROUP BY p.maphieuxuat, p.thoigianxuat
         HAVING tongtien BETWEEN ? AND ?
            AND COUNT(DISTINCT masanpham) > 0
         ORDER BY p.thoigianxuat DESC`,
        [makhachhang, manhanvien, tungay, denngay, tusotien, densotien])
    
    return {entries: result, success: true}
  } catch (e) {
    console.log(e)
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
  getExports, insertExport, updateExport, deleteExport, findExports
}