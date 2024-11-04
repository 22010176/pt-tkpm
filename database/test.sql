USE ptpm;

# Doi Tac
SELECT COUNT(*)
FROM khachhang;

SELECT COUNT(*)
FROM nhacungcap;

# San pham
SELECT COUNT(*)
FROM rom;

SELECT COUNT(*)
FROM ram;

SELECT COUNT(*)
FROM mausac;

SELECT COUNT(*)
FROM thuonghieu;

SELECT COUNT(*)
FROM xuatxu;

SELECT COUNT(*)
FROM hedieuhanh;

SELECT COUNT(*)
FROM danhmucsanpham;

SELECT COUNT(*)
FROM cauhinh;

# Tai khoan
SELECT COUNT(*)
FROM nhanvien;

SELECT COUNT(*)
FROM taikhoan;

SELECT COUNT(*)
FROM chucnang;

SELECT COUNT(*)
FROM hanhdong;

SELECT COUNT(*)
FROM nhomquyen;

SELECT COUNT(*)
FROM quyenhan;

SELECT COUNT(*)
FROM nhanvien;

SELECT COUNT(*)
FROM phieunhapkho;

SELECT COUNT(*)
FROM phieuxuatkho;

SELECT *
FROM sanpham;

SELECT *
FROM nhacungcap;



INSERT INTO phieunhapkho (nhacungcap, nhanviennhap)
VALUES (1, 2);

SELECT *
FROM phieuxuatkho
;

SELECT *
FROM sanpham;

SELECT *
FROM cauhinh;


SELECT DATE(thoigiannhap) thoigian, COUNT(masanpham), SUM(c.gianhap)
FROM phieunhapkho n
       INNER JOIN sanpham s ON s.phieunhap = n.maphieunhap
       INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
GROUP BY thoigiannhap
ORDER BY thoigiannhap DESC;

SELECT DATE(thoigianxuat) thoigian, COUNT(masanpham), SUM(c.giaxuat)
FROM phieuxuatkho x
       INNER JOIN sanpham s ON s.phieuxuat = x.maphieuxuat
       INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
GROUP BY thoigianxuat
ORDER BY thoigianxuat DESC
LIMIT 7;


SELECT DATE(d.thoigian), SUM(d.doanhthu) doanhthu, SUM(v.von) von, SUM(doanhthu - von) loinhuan
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
LIMIT 7;

SELECT COUNT(*), SUM(gianhap)
FROM phieunhapkho n
       INNER JOIN sanpham ON n.maphieunhap = sanpham.phieunhap
       INNER JOIN cauhinh c ON c.macauhinh = sanpham.cauhinh
WHERE thoigiannhap = '2024-11-03'

SELECT COUNT(*), SUM(giaxuat)
FROM phieuxuatkho x
       INNER JOIN sanpham ON x.maphieuxuat = sanpham.phieuxuat
       INNER JOIN cauhinh c ON c.macauhinh = sanpham.cauhinh
WHERE thoigianxuat = '2024-11-03';



SELECT n.manhacungcap, n.tennhacungcap, COUNT(s.masanpham) soluong, SUM(c.gianhap) tongtien
FROM nhacungcap n
       LEFT JOIN phieunhapkho p ON n.manhacungcap = p.nhacungcap
       INNER JOIN sanpham s ON s.phieunhap = p.maphieunhap
       INNER JOIN cauhinh c ON c.macauhinh = s.cauhinh
WHERE p.thoigiannhap BETWEEN '2010-1-1' AND '2020-1-1'
GROUP BY n.manhacungcap
ORDER BY manhacungcap DESC


