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

SELECT *
FROM nhanvien
WHERE manhanvien = 343;

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