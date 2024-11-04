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

SELECT COUNT(*)
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


SELECT COUNT(*)
FROM danhmucsanpham;

SELECT n.manhacungcap, COUNT(DISTINCT d.madanhmucsanpham) lannhap, SUM(c.gianhap) tongtien
FROM nhacungcap n
       INNER JOIN phieunhapkho p ON n.manhacungcap = p.nhacungcap
       INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
       INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
       INNER JOIN danhmucsanpham d ON c.danhmucsanpham = d.madanhmucsanpham
WHERE p.thoigiannhap BETWEEN ? AND ?
GROUP BY n.manhacungcap;


SELECT COUNT(*)
FROM (SELECT DISTINCT madanhmucsanpham, n.manhacungcap
      FROM nhacungcap n

             INNER JOIN phieunhapkho p ON n.manhacungcap = p.nhacungcap
             INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
             INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
             INNER JOIN danhmucsanpham d ON c.danhmucsanpham = d.madanhmucsanpham
      WHERE n.manhacungcap = 2) t;

SELECT SUM(c.gianhap)
FROM nhacungcap n
       INNER JOIN phieunhapkho p ON n.manhacungcap = p.nhacungcap
       INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
       INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
WHERE n.manhacungcap = 3;



SELECT k.makhachhang, k.tenkhachhang, COUNT(DISTINCT p.maphieuxuat) muahang, SUM(c.giaxuat) tongtien
FROM khachhang k
       INNER JOIN phieuxuatkho p ON k.makhachhang = p.khachhang
       INNER JOIN sanpham s ON p.maphieuxuat = s.phieuxuat
       INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
WHERE p.thoigianxuat BETWEEN ? AND ?
GROUP BY k.makhachhang


SELECT d.madanhmucsanpham, d.tendanhmucsanpham
FROM danhmucsanpham d
       INNER JOIN cauhinh c ON d.madanhmucsanpham = c.danhmucsanpham
       INNER JOIN sanpham s ON c.macauhinh = s.cauhinh
       INNER JOIN phieuxuatkho x ON s.phieuxuat = x.maphieuxuat
       INNER JOIN phieunhapkho n ON s.phieunhap = n.maphieunhap
GROUP BY d.madanhmucsanpham;


SELECT YEAR(x.thoigianxuat)              nam,
       SUM(c1.gianhap)                   von,
       SUM(c2.giaxuat)                   doanhthu,
       SUM(c2.giaxuat) - SUM(c1.gianhap) loinhuan
FROM phieuxuatkho x
       CROSS JOIN phieunhapkho n ON YEAR(x.thoigianxuat) = YEAR(n.thoigiannhap)
       INNER JOIN sanpham s1 ON n.maphieunhap = s1.phieunhap
       INNER JOIN cauhinh c1 ON s1.cauhinh = c1.macauhinh

       INNER JOIN sanpham s2 ON x.maphieuxuat = s2.phieuxuat
       INNER JOIN cauhinh c2 ON s2.cauhinh = c2.macauhinh
GROUP BY nam;



SELECT YEAR(p.thoigiannhap) nam, SUM(c.gianhap) von
FROM phieunhapkho p
       INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
       INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
GROUP BY nam;


SELECT YEAR(x.thoigianxuat) nam, SUM(c.giaxuat) doanhthu
FROM phieuxuatkho x
       INNER JOIN sanpham s ON x.maphieuxuat = s.phieunhap
       INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
GROUP BY nam;

SELECT a.nam, a.von, b.doanhthu, b.doanhthu - a.von loinhuan
FROM (SELECT YEAR(p.thoigiannhap) nam, SUM(c.gianhap) von
      FROM phieunhapkho p
             INNER JOIN sanpham s ON p.maphieunhap = s.phieunhap
             INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
      GROUP BY nam) a
       INNER JOIN (SELECT YEAR(x.thoigianxuat) nam, SUM(c.giaxuat) doanhthu
                   FROM phieuxuatkho x
                          INNER JOIN sanpham s ON x.maphieuxuat = s.phieunhap
                          INNER JOIN cauhinh c ON s.cauhinh = c.macauhinh
                   GROUP BY nam) b ON a.nam = b.nam







































