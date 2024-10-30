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

# Thêm quyền
SELECT d.*, x.tenXuatXu, h.tenHeDieuHanh, t.tenThuongHieu
FROM ptpm_sanpham.danhmucsanpham d
         INNER JOIN ptpm_sanpham.xuatxu x ON d.xuatXu = x.maXuatXu
         INNER JOIN ptpm_sanpham.hedieuhanh h ON h.maHeDieuHanh = d.heDieuHanh
         INNER JOIN ptpm_sanpham.thuonghieu t ON t.maThuongHieu = d.thuongHieu
ORDER BY maDanhMucSanPham DESC
LIMIT 200;



SELECT d.*, x.tenXuatXu, h.tenHeDieuHanh, t.tenThuongHieu
FROM ptpm_sanpham.danhmucsanpham d
         INNER JOIN ptpm_sanpham.xuatxu x ON d.xuatXu = x.maXuatXu
         INNER JOIN ptpm_sanpham.hedieuhanh h ON h.maHeDieuHanh = d.heDieuHanh
         INNER JOIN ptpm_sanpham.thuonghieu t ON t.maThuongHieu = d.thuongHieu
ORDER BY maDanhMucSanPham DESC
LIMIT 200;

SELECT *, ra.dungLuongRam, ro.dungLuongRom, m.tenMauSac
FROM ptpm_sanpham.cauhinh c
         INNER JOIN ptpm_sanpham.ram ra ON c.ram = ra.maRam
         INNER JOIN ptpm_sanpham.rom ro ON ro.maRom = c.rom
         INNER JOIN ptpm_sanpham.mausac m ON m.maMauSac = c.mauSac
WHERE danhMucSanPham = 1
ORDER BY maCauHinh DESC;




































