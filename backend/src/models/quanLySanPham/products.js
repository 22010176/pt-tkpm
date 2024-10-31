async function getProducts(conn) {
  try {
    const [result] = await conn.query(`SELECT d.*, x.tenxuatxu, h.tenhedieuhanh, t.tenthuonghieu
                                       FROM ptpm_sanpham.danhmucsanpham d
                                                INNER JOIN ptpm_sanpham.xuatxu x ON d.xuatxu = x.maxuatxu
                                                INNER JOIN ptpm_sanpham.hedieuhanh h ON h.mahedieuhanh = d.hedieuhanh
                                                INNER JOIN ptpm_sanpham.thuonghieu t ON t.mathuonghieu = d.thuonghieu
                                       ORDER BY madanhmucsanpham DESC
                                       LIMIT 200;`)
    return {products: result, success: true};
  } catch (e) {
    console.log(e)
    return {products: [], success: false}
  }
}

async function insertProduct(conn, {
  tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu
}) {
  try {
    await conn.query(`INSERT INTO ptpm_sanpham.danhmucsanpham
                      (tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu)
                      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu])

    const [result] = await conn.query(`SELECT *
                                       FROM ptpm_sanpham.danhmucsanpham
                                       WHERE tendanhmucsanpham = ?
                                         AND chipxuly = ?
                                         AND dungluongpin = ?
                                         AND kichthuongmanhinh = ?
                                         AND cameratruoc = ?
                                         AND camerasau = ?
                                         AND phienbanhedieuhanh = ?
                                         AND thoigianbaohanh = ?
                                         AND xuatxu = ?
                                         AND hedieuhanh = ?
                                         AND thuonghieu = ?
                                       ORDER BY madanhmucsanpham DESC
                                       LIMIT 1;`, [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu])
    console.log(result)
    return {message: "Products added", success: true, body: result};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function insertMultipleProducts(conn, products = []) {
  try {
    const [result] = await conn.query(`INSERT INTO ptpm_sanpham.danhmucsanpham
                                       (tendanhmucsanpham, chipxuly, dungluongpin, kichthuongmanhinh, cameratruoc, camerasau, phienbanhedieuhanh, thoigianbaohanh, xuatxu, hedieuhanh, thuonghieu)
                                       VALUES ?`, [products.map(({
                                                                   tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu
                                                                 }) => [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu])])
    return {message: "Products added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateProduct(conn, {
  tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu, maDanhMucSanPham
}) {
  try {
    await conn.query(`UPDATE ptpm_sanpham.danhmucsanpham
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
                      WHERE madanhmucsanpham = ?;`, [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu, maDanhMucSanPham])
    return {message: "Product updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteProduct(conn, {maDanhMucSanPham}) {
  try {
    await conn.query(`DELETE
                      FROM ptpm_sanpham.danhmucsanpham
                      WHERE madanhmucsanpham = ?`, [maDanhMucSanPham])
    return {message: "Product deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

async function updateProductImage(conn, {maDanhMucSanPham, hinhAnh}) {
  try {
    await conn.query(
      `UPDATE ptpm_sanpham.danhmucsanpham
       SET hinhanh = ?
       WHERE madanhmucsanpham = ?`, [hinhAnh, maDanhMucSanPham])
    return {message: "success", success: true, url: hinhAnh}
  } catch (e) {
    return {message: "fail", success: false}
  }
}

module.exports = {
  updateProductImage, getProducts, insertProduct, updateProduct, deleteProduct, insertMultipleProducts
}