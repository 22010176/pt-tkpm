async function getOverall(conn) {
  try {
    const [[sanpham], [khachhang], [nhanvien], [doanhthu]] = await Promise.all([
      conn.query(
        `SELECT madanhmucsanpham, COUNT(s.masanpham) soluongsanpham
         FROM danhmucsanpham d
                  LEFT JOIN cauhinh c ON c.danhmucsanpham = d.madanhmucsanpham
                  LEFT JOIN ptpm.sanpham s ON c.macauhinh = s.cauhinh
         GROUP BY d.madanhmucsanpham
         HAVING COUNT(s.masanpham) > 0;`),
      conn.query(
        `SELECT k.makhachhang, COUNT(p.maphieuxuat) donmua
         FROM khachhang k
                  INNER JOIN ptpm.phieuxuatkho p ON k.makhachhang = p.khachhang
         GROUP BY makhachhang
         ORDER BY makhachhang DESC;`),
      conn.query(
        `SELECT manhanvien, hoten
         FROM nhanvien
         ORDER BY manhanvien`),
      conn.query(
        `SELECT d.thoigian, SUM(d.doanhthu) doanhthu, SUM(v.von) von, SUM(doanhthu - von) loinhuan
         FROM (SELECT DATE(thoigianxuat) thoigian, SUM(c.giaxuat) doanhthu
               FROM phieuxuatkho x
                        INNER JOIN sanpham s ON s.phieuxuat = x.maphieuxuat
                        INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
               GROUP BY thoigianxuat) d

            , (SELECT DATE(thoigiannhap) thoigian, SUM(c.gianhap) von
               FROM phieunhapkho n
                        INNER JOIN sanpham s ON s.phieunhap = n.maphieunhap
                        INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
               GROUP BY thoigiannhap) v
         WHERE d.thoigian = v.thoigian
         GROUP BY v.thoigian
         ORDER BY d.thoigian DESC, v.thoigian DESC
         LIMIT 7;`),
    ])

    return {data: {khachhang, doanhthu, nhanvien, sanpham}, success: true}
  } catch (err) {
    console.log(err);
    return {data: {}, success: false}
  }
}

async function getNhaCungCapStat(conn, {ngaybatdau = '1990-01-01', ngayketthuc = "3000-01-01"}) {
  try {
    const [result] = await conn.query(
      `SELECT n.manhacungcap, n.tennhacungcap, COUNT(DISTINCT d.madanhmucsanpham) lannhap, SUM(c.gianhap) tongtien
       FROM nhacungcap n
                INNER JOIN phieunhapkho p ON n.manhacungcap = p.nhacungcap
                INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
                INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
                INNER JOIN danhmucsanpham d ON c.danhmucsanpham = d.madanhmucsanpham
       WHERE p.thoigiannhap BETWEEN ? AND ?
       GROUP BY n.manhacungcap;`,
      [ngaybatdau, ngayketthuc])

    return {data: result, success: true}
  } catch (e) {
    console.log(e)
    return {data: [], success: false}
  }
}

async function getKhachHangStat(conn, {ngaybatdau = '1990-01-01', ngayketthuc = "3000-01-01"}) {
  try {
    const [result] = await conn.query(
      `SELECT k.makhachhang, k.tenkhachhang, COUNT(DISTINCT p.maphieuxuat) muahang, SUM(c.giaxuat) tongtien
       FROM khachhang k
                INNER JOIN phieuxuatkho p ON k.makhachhang = p.khachhang
                INNER JOIN sanpham s ON p.maphieuxuat = s.phieuxuat
                INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
       WHERE p.thoigianxuat BETWEEN ? AND ?
       GROUP BY k.makhachhang`,
      [ngaybatdau, ngayketthuc])
    return {data: result, success: true}
  } catch (e) {
    console.log(e)
    return {data: [], success: false}
  }
}

async function getYearProfit(conn) {
  try {
    const [result] = await conn.query(
      `SELECT a.nam, a.von, b.doanhthu, b.doanhthu - a.von loinhuan
       FROM (SELECT YEAR(p.thoigiannhap) nam, SUM(c.gianhap) von
             FROM phieunhapkho p
                      INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
                      INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
             GROUP BY nam) a,
            (SELECT YEAR(x.thoigianxuat) nam, SUM(c.giaxuat) doanhthu
             FROM phieuxuatkho x
                      INNER JOIN sanpham s ON x.maphieuxuat = s.phieunhap
                      INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
             GROUP BY nam) b
       WHERE a.nam = b.nam`)
    return {data: result, success: true}
  } catch (e) {
    console.log(e)
    return {data: [], success: false}
  }
}

module.exports = {
  getOverall, getNhaCungCapStat, getKhachHangStat, getYearProfit
}