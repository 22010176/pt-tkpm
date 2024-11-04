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

                  CROSS JOIN (SELECT DATE(thoigiannhap) thoigian, SUM(c.gianhap) von
                              FROM phieunhapkho n
                                       INNER JOIN sanpham s ON s.phieunhap = n.maphieunhap
                                       INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
                              GROUP BY thoigiannhap) v ON d.thoigian = v.thoigian
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
      `SELECT n.manhacungcap, n.tennhacungcap, COUNT(s.masanpham) soluong, SUM(c.gianhap) tongtien
       FROM nhacungcap n
                LEFT JOIN phieunhapkho p ON n.manhacungcap = p.nhacungcap
                INNER JOIN sanpham s ON s.phieunhap = p.maphieunhap
                INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
       WHERE p.thoigiannhap BETWEEN ? AND ?
       GROUP BY n.manhacungcap
       ORDER BY manhacungcap DESC`,
      [ngaybatdau, ngayketthuc])

    return {data: result, success: true}
  } catch (e) {
    console.log(e)
    return {data: [], success: false}
  }
}

module.exports = {
  getOverall, getNhaCungCapStat
}