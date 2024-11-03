async function getItems(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM sanpham
       ORDER BY masanpham DESC`)
    return {items: result, success: true};
  } catch (e) {
    console.log(e)
    return {items: [], success: false}
  }
}


async function insertItem(conn, items = []) {
  try {
    await conn.query(
      `INSERT INTO sanpham (maimei, cauhinh, phieunhap, phieuxuat)
       VALUES ?`,
      [items.map(({maimei, cauhinh, phieunhap, phieuxuat}) => [maimei, cauhinh, phieunhap, phieuxuat])])

    const [result] = await conn.query(
      `SELECT *
       FROM sanpham
       WHERE maimei IN ?`,
      [[items.map(({maimei}) => maimei)]])
    return {message: "Items added", success: true, items: result};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false, items: []};
  }
}

async function updateItem(conn, {maimei, cauhinh, phieunhap, phieuxuat, tinhtrang, masanpham}) {
  try {
    await conn.query(
      `UPDATE sanpham
       SET maimei    = ?,
           cauhinh   = ?,
           phieunhap = ?,
           phieuxuat = ?,
           tinhtrang = ?
       WHERE masanpham = ?`,
      [maimei, cauhinh, phieunhap, phieuxuat, tinhtrang, masanpham])
    return {message: "Item updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteItem(conn, items = []) {
  try {
    await conn.query(
      `DELETE
       FROM sanpham
       WHERE masanpham IN ?`,
      [[items.map(({masanpham}) => masanpham)]])
    return {message: "Item deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}


module.exports = {
  deleteItem, updateItem, getItems, insertItem
}