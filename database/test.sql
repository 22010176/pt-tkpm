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


DESCRIBE nhanvien;



SELECT *
FROM quyenhan
ORDER BY chucnang, hanhdong;
SELECT *
FROM thuonghieu;



SELECT *
FROM thuonghieu
WHERE tenthuonghieu IN ('333', '44')
ORDER BY mathuonghieu DESC
LIMIT 3;

SELECT q.*, c.tenchucnang, h.tenhanhdong
FROM quyenhan q
       INNER JOIN ptpm.chucnang c ON q.chucnang = c.machucnang
       INNER JOIN ptpm.hanhdong h ON q.hanhdong = h.mahanhdong
;

SELECT *
FROM chucnang;
SET SQL_SAFE_UPDATES = 0;
DELETE
FROM quyenhan
WHERE hanhdong IN (7, 8)
  AND chucnang IN (11, 12, 10, 9);









