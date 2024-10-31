DROP DATABASE IF EXISTS ptpm_nhapxuat;
DROP DATABASE IF EXISTS ptpm_sanpham;
DROP DATABASE IF EXISTS ptpm_doitac;
DROP DATABASE IF EXISTS ptpm_doitra;
DROP DATABASE IF EXISTS ptpm_taikhoan;

# Doi Tac
SELECT COUNT(*)
FROM ptpm_doitac.khachhang;

SELECT COUNT(*)
FROM ptpm_doitac.nhacungcap;

# San pham
SELECT COUNT(*)
FROM ptpm_sanpham.rom;

SELECT COUNT(*)
FROM ptpm_sanpham.ram;

SELECT COUNT(*)
FROM ptpm_sanpham.mausac;

SELECT COUNT(*)
FROM ptpm_sanpham.thuonghieu;

SELECT COUNT(*)
FROM ptpm_sanpham.xuatxu;

SELECT COUNT(*)
FROM ptpm_sanpham.hedieuhanh;

SELECT COUNT(*)
FROM ptpm_sanpham.danhmucsanpham;

SELECT COUNT(*)
FROM ptpm_sanpham.cauhinh;

# Tai khoan
SELECT COUNT(*)
FROM ptpm_taikhoan.nhanvien;

SELECT COUNT(*)
FROM ptpm_taikhoan.taikhoan;

SELECT COUNT(*)
FROM ptpm_taikhoan.chucnang;

SELECT COUNT(*)
FROM ptpm_taikhoan.hanhdong;

SELECT COUNT(*)
FROM ptpm_taikhoan.nhomquyen;

SELECT COUNT(*)
FROM ptpm_taikhoan.quyenhan;

SELECT COUNT(*)
FROM ptpm_taikhoan.nhanvien;



































