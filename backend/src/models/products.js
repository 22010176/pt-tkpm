async function getProducts(conn) {
  try {
    const [result] = await conn.query(
      `SELECT d.*, x.tenXuatXu, h.tenHeDieuHanh, t.tenThuongHieu
       FROM ptpm_sanpham.danhmucsanpham d
                INNER JOIN ptpm_sanpham.xuatxu x ON d.xuatXu = x.maXuatXu
                INNER JOIN ptpm_sanpham.hedieuhanh h ON h.maHeDieuHanh = d.heDieuHanh
                INNER JOIN ptpm_sanpham.thuonghieu t ON t.maThuongHieu = d.thuongHieu
       ORDER BY maDanhMucSanPham DESC
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
    await conn.query(
      `INSERT INTO ptpm_sanpham.danhMucSanPham
           (tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu])

    const [result] = await conn.query(
      `SELECT *
       FROM ptpm_sanpham.danhMucSanPham
       WHERE tenDanhMucSanPham = ?
         AND chipXuLy = ?
         AND dungLuongPin = ?
         AND kichThuongManHinh = ?
         AND cameraTruoc = ?
         AND cameraSau = ?
         AND phienBanHeDieuHanh = ?
         AND thoiGianBaoHanh = ?
         AND xuatXu = ?
         AND heDieuHanh = ?
         AND thuongHieu = ?
       ORDER BY maDanhMucSanPham DESC
       LIMIT 1;`,
      [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu]
    )
    console.log(result  )
    return {message: "Products added", success: true, body: result};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function insertMultipleProducts(conn, products = []) {
  try {
    const [result] = await conn.query(
      `INSERT INTO ptpm_sanpham.danhMucSanPham
           (tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu)
       VALUES ?`,
      [products.map(({
                       tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu
                     }) => [
        tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu
      ])])
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
    await conn.query(
      `UPDATE ptpm_sanpham.danhMucSanPham
       SET tenDanhMucSanPham  = ?,
           chipXuLy           = ?,
           dungLuongPin       = ?,
           kichThuongManHinh  = ?,
           cameraTruoc        = ?,
           cameraSau          = ?,
           phienBanHeDieuHanh = ?,
           thoiGianBaoHanh    = ?,
           xuatXu             = ?,
           heDieuHanh         = ?,
           thuongHieu         = ?
       WHERE maDanhMucSanPham = ?;`,
      [tenDanhMucSanPham, chipXuLy, dungLuongPin, kichThuongManHinh, cameraTruoc, cameraSau, phienBanHeDieuHanh, thoiGianBaoHanh, xuatXu, heDieuHanh, thuongHieu, maDanhMucSanPham])
    return {message: "Product updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteProduct(conn, {maDanhMucSanPham}) {
  try {
    await conn.query(
      `DELETE
       FROM ptpm_sanpham.danhmucsanpham
       WHERE maDanhMucSanPham = ?`, [maDanhMucSanPham])
    return {message: "Product deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  getProducts, insertProduct, updateProduct, deleteProduct, insertMultipleProducts
}