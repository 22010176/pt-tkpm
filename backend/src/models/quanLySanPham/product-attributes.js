async function getAttributes(conn, attribute) {
  try {
    const [result] = await conn.query(`SELECT *
                                       FROM ${attribute}`)
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
        [result] = await conn.query(`INSERT INTO xuatxu (tenxuatxu)
                                     VALUES (?)`, [data.tenxuatxu])
        break;
      case "hedieuhanh":
        [result] = await conn.query(`INSERT INTO hedieuhanh (tenhedieuhanh)
                                     VALUES (?)`, [data.tenhedieuhanh])
        break;

      case "thuonghieu":
        [result] = await conn.query(`INSERT INTO thuonghieu (tenthuonghieu)
                                     VALUES (?)`, [data.tenthuonghieu])
        break;
      case "ram":
        [result] = await conn.query(`INSERT INTO ram (dungluongram)
                                     VALUES (?)`, [data.dungluongram])
        break;
      case "rom":
        [result] = await conn.query(`INSERT INTO rom (dungluongrom)
                                     VALUES (?)`, [data.dungluongrom])
        break;
      case "mausac":
        [result] = await conn.query(`INSERT INTO mausac (tenmausac)
                                     VALUES (?)`, [data.tenmausac])
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
        [result] = await conn.query(`UPDATE xuatxu
                                     SET tenxuatxu = ?
                                     WHERE maxuatxu = ?;`, [data.tenxuatxu, data.maxuatxu])
        break;
      case "hedieuhanh":
        [result] = await conn.query(`UPDATE hedieuhanh
                                     SET tenhedieuhanh = ?
                                     WHERE mahedieuhanh = ?;`, [data.tenhedieuhanh, data.mahedieuhanh])
        break;
      case "thuonghieu":
        [result] = await conn.query(`UPDATE thuonghieu
                                     SET tenthuonghieu = ?
                                     WHERE mathuonghieu = ?;`, [data.tenthuonghieu, data.mathuonghieu])
        break;
      case "ram":
        [result] = await conn.query(`UPDATE ram
                                     SET dungluongram = ?
                                     WHERE maram = ?;`, [data.dungluongram, data.maram])
        break;
      case "rom":
        [result] = await conn.query(`UPDATE rom
                                     SET dungluongrom = ?
                                     WHERE marom = ?;`, [data.dungluongrom, data.marom])
        break;
      case "mausac":
        [result] = await conn.query(`UPDATE mausac
                                     SET tenmausac = ?
                                     WHERE mamausac = ?;`, [data.tenmausac, data.mamausac])
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
        [result] = await conn.query(`DELETE
                                     FROM xuatxu
                                     WHERE maxuatxu = ?;`, [data.maxuatxu])
        break;
      case "hedieuhanh":
        [result] = await conn.query(`DELETE
                                     FROM hedieuhanh
                                     WHERE mahedieuhanh = ?;`, [data.mahedieuhanh])
        break;
      case "thuonghieu":
        [result] = await conn.query(`DELETE
                                     FROM thuonghieu
                                     WHERE mathuonghieu = ?;`, [data.mathuonghieu])
        break;
      case "ram":
        [result] = await conn.query(`DELETE
                                     FROM ram
                                     WHERE maram = ?;`, [data.maram])
        break;
      case "rom":
        [result] = await conn.query(`DELETE
                                     FROM rom
                                     WHERE marom = ?;`, [data.marom])
        break;
      case "mausac":
        [result] = await conn.query(`DELETE
                                     FROM mausac
                                     WHERE mamausac = ?;`, [data.mamausac])
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