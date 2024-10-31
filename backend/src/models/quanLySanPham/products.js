async function getProducts(conn) {
  try {
    const [result] = await conn.query(`SELECT d.*, x.tenxuatxu, h.tenhedieuhanh, t.tenthuonghieu
                                       FROM danhmucsanpham d
                                                INNER JOIN xuatxu x ON d.xuatxu = x.maxuatxu
                                                INNER JOIN hedieuhanh h ON h.mahedieuhanh = d.hedieuhanh
                                                INNER JOIN thuonghieu t ON t.mathuonghieu = d.thuonghieu
                                       ORDER BY madanhmucsanpham DESC
                                       LIMIT 200;`)
    return {products: result, success: true};
  } catch (e) {
    console.log(e)
    return {products: [], success: false}
  }
}

async function insertProduct(conn, {
  tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu
}) {
  try {
    await conn.query(
      `INSERT INTO danhmucsanpham
       (tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu])

    const [result] = await conn.query(`SELECT *
                                       FROM danhmucsanpham
                                       WHERE tendanhmucsanpham = ?
                                         AND chipxuly = ?
                                         AND dungluongpin = ?
                                         AND kichthuongmanhinh = ?
                                         AND cameratruoc = ?
                                         AND camerasau = ?
                                         AND phienbanhedieuhanh = ?
                                         AND thoigianbaohanh = ?
                                       ORDER BY madanhmucsanpham DESC
                                       LIMIT 1;`, [tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh])
    console.log(result)
    return {message: "Products added", success: true, body: result};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function insertMultipleProducts(conn, products = []) {
  try {
    const [result] = await conn.query(
      `INSERT INTO danhmucsanpham
       (tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu)
       VALUES ?`, [
        products.map(({
          tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu
        }) => [tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu])
      ])
    return {message: "Products added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateProduct(conn, {
  tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu, madanhmucsanpham
}) {
  try {
    await conn.query(`UPDATE danhmucsanpham
                      SET tendanhmucsanpham  = ?,
                          chipxuly           = ?,
                          dungluongpin       = ?,
                          kichthuongmanhinh  = ?,
                          cameratruoc        = ?,
                          camerasau          = ?,
                          phienbanhedieuhanh = ?,
                          thoigianbaohanh    = ?,
                          xuatxu             = ?,
                          hedieuhanh         = ?,
                          thuonghieu         = ?
                      WHERE madanhmucsanpham = ?;`,
      [tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu, madanhmucsanpham])
    return {message: "Product updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteProduct(conn, {madanhmucsanpham}) {
  try {
    await conn.query(`DELETE
                      FROM danhmucsanpham
                      WHERE madanhmucsanpham = ?`, [madanhmucsanpham])
    return {message: "Product deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

async function updateProductImage(conn, {madanhmucsanpham, hinhanh}) {
  try {
    await conn.query(
      `UPDATE danhmucsanpham
       SET hinhanh = ?
       WHERE madanhmucsanpham = ?`, [hinhanh, madanhmucsanpham])
    return {message: "success", success: true, hinhanh}
  } catch (e) {
    return {message: "fail", success: false}
  }
}

module.exports = {
  updateProductImage, getProducts, insertProduct, updateProduct, deleteProduct, insertMultipleProducts
}