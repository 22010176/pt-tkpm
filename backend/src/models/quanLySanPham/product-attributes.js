async function getAttributes(conn, attribute) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_sanpham.${attribute}`)
    return {attributes: result, success: true}

  } catch (e) {
    console.log(e)
    return {attributes: [], success: false}
  }

}

async function insertAttribute(conn, attribute, data) {
  let result;
  try {
    switch (attribute.toLowerCase()) {
      case "xuatxu":
        [result] = await conn.query(
          `INSERT INTO ptpm_sanpham.xuatXu (tenXuatXu)
           VALUES (?)`,
          [data.tenXuatXu])
        break;
      case "hedieuhanh":
        [result] = await conn.query(
          `INSERT INTO ptpm_sanpham.hedieuhanh (tenHeDieuHanh)
           VALUES (?)`,
          [data.tenHeDieuHanh])
        break;

      case "thuonghieu":
        [result] = await conn.query(
          `INSERT INTO ptpm_sanpham.thuonghieu (tenThuongHieu)
           VALUES (?)`,
          [data.tenThuongHieu])
        break;
      case "ram":
        [result] = await conn.query(
          `INSERT INTO ptpm_sanpham.ram (dungLuongRam)
           VALUES (?)`,
          [data.dungLuongRam])
        break;
      case "rom":
        [result] = await conn.query(
          `INSERT INTO ptpm_sanpham.rom (dungLuongRom)
           VALUES (?)`,
          [data.dungLuongRom])
        break;
      case "mausac":
        [result] = await conn.query(
          `INSERT INTO ptpm_sanpham.mausac (tenMauSac)
           VALUES (?)`,
          [data.tenMauSac])
        break;

      default:
        return {error: "Add failed", success: false};
    }
  } catch (e) {
    console.log(e)
    return {error: "Add failed", success: false};
  }

  return {message: "Attribute added", success: true};
}

async function updateAttribute(conn, attribute, data) {
  let result;
  try {
    switch (attribute.toLowerCase()) {
      case "xuatxu":
        [result] = await conn.query(
          `UPDATE ptpm_sanpham.xuatxu
           SET tenXuatXu = ?
           WHERE maXuatXu = ?;`,
          [data.tenXuatXu, data.maXuatXu])
        break;
      case "hedieuhanh":
        [result] = await conn.query(
          `UPDATE ptpm_sanpham.hedieuhanh
           SET tenHeDieuHanh = ?
           WHERE maHeDieuHanh = ?;`,
          [data.tenHeDieuHanh, data.maHeDieuHanh])
        break;
      case "thuonghieu":
        [result] = await conn.query(
          `UPDATE ptpm_sanpham.thuonghieu
           SET tenThuongHieu = ?
           WHERE maThuongHieu = ?;`,
          [data.tenThuongHieu, data.maThuongHieu])
        break;
      case "ram":
        [result] = await conn.query(
          `UPDATE ptpm_sanpham.ram
           SET dungLuongRam = ?
           WHERE maRam = ?;`,
          [data.dungLuongRam, data.maRam])
        break;
      case "rom":
        [result] = await conn.query(
          `UPDATE ptpm_sanpham.rom
           SET dungLuongRom = ?
           WHERE maRom = ?;`,
          [data.dungLuongRom, data.maRom])
        break;
      case "mausac":
        [result] = await conn.query(
          `UPDATE ptpm_sanpham.mausac
           SET tenMauSac = ?
           WHERE maMauSac = ?;`,
          [data.tenMauSac, data.maMauSac])
        break;

      default:
        return {error: "Update failed", success: false};
    }
  } catch (e) {
    console.log(e)
    return {error: "Update failed", success: false};
  }

  return {message: "Attribute updated", success: true};
}

async function deleteAttribute(conn, attribute, data) {
  let result;
  try {
    switch (attribute.toLowerCase()) {
      case "xuatxu":
        [result] = await conn.query(
          `DELETE
           FROM ptpm_sanpham.xuatxu
           WHERE maXuatXu = ?;`,
          [data.maXuatXu])
        break;
      case "hedieuhanh":
        [result] = await conn.query(
          `DELETE
           FROM ptpm_sanpham.hedieuhanh
           WHERE maHeDieuHanh = ?;`,
          [data.maHeDieuHanh])
        break;
      case "thuonghieu":
        [result] = await conn.query(
          `DELETE
           FROM ptpm_sanpham.thuonghieu
           WHERE maThuongHieu = ?;`,
          [data.maThuongHieu])
        break;
      case "ram":
        [result] = await conn.query(
          `DELETE
           FROM ptpm_sanpham.ram
           WHERE maRam = ?;`,
          [data.maRam])
        break;
      case "rom":
        [result] = await conn.query(
          `DELETE
           FROM ptpm_sanpham.rom
           WHERE maRom = ?;`,
          [data.maRom])
        break;
      case "mausac":
        [result] = await conn.query(
          `DELETE
           FROM ptpm_sanpham.mausac
           WHERE maMauSac = ?;`,
          [data.maMauSac])
        break;

      default:
        return {error: "Delete failed", success: false};
    }
  } catch (e) {
    console.log(e)
    return {error: "Delete failed", success: false};
  }

  return {message: "Attribute deleted", success: true};
}

module.exports = {deleteAttribute, updateAttribute, getAttributes, insertAttribute}