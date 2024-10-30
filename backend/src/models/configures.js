async function getConfigures(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_sanpham.cauhinh
       ORDER BY maCauHinh DESC
       LIMIT 200;`)
    return {configurations: result, success: true};
  } catch (e) {
    console.log(e)
    return {configurations: [], success: false}
  }
}

async function getProductConfigures(conn, productID) {
  try {
    const [result] = await conn.query(
      `SELECT *, ra.dungLuongRam, ro.dungLuongRom, m.tenMauSac
       FROM ptpm_sanpham.cauhinh c
                INNER JOIN ptpm_sanpham.ram ra ON c.ram = ra.maRam
                INNER JOIN ptpm_sanpham.rom ro ON ro.maRom = c.rom
                INNER JOIN ptpm_sanpham.mausac m ON m.maMauSac = c.mauSac
       WHERE danhMucSanPham = ?
       ORDER BY maCauHinh DESC;`, [productID])

    return {configurations: result, success: true};
  } catch (e) {
    console.log(e)
    return {configurations: [], success: false}
  }
}

async function insertMultipleConfigures(conn, configurations) {
  try {
    const [result] = await conn.query(
      `INSERT INTO ptpm_sanpham.cauhinh (giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac)
       VALUES ?`,
      [configurations.map(({giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac}) => [giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac])])
    return {message: "Configuress added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function insertConfigure(conn, {
  giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac
}) {
  try {
    const [result] = await conn.query(
      `INSERT INTO ptpm_sanpham.cauhinh (giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac])
    return {message: "configuress added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateConfigure(conn, {
  giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac, maCauHinh
}) {
  try {
    await conn.query(
      `UPDATE ptpm_sanpham.cauhinh
       SET giaNhap        = ?,
           giaXuat        = ?,
           danhMucSanPham = ?,
           ram            = ?,
           rom            = ?,
           mauSac         = ?
       WHERE maCauHinh = ?;`,
      [giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac, maCauHinh])
    return {message: "configures updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteConfigure(conn, {maCauHinh}) {
  try {
    await conn.query(
      `DELETE
       FROM ptpm_sanpham.cauhinh
       WHERE maCauHinh = ?`, [maCauHinh])
    return {message: "configures deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  getConfigures, insertConfigure, updateConfigure, deleteConfigure, insertMultipleConfigures, getProductConfigures
}