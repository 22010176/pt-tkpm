DROP DATABASE IF EXISTS ptpm;
CREATE DATABASE ptpm;
USE ptpm;

# Khoi tao doi tac
DROP TABLE IF EXISTS khachhang;
CREATE TABLE khachhang
(
  makhachhang  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenkhachhang VARCHAR(255)        NOT NULL,
  ngaysinh     DATE                NOT NULL,
  diachi       VARCHAR(255)        NOT NULL,
  sodienthoai  VARCHAR(255) UNIQUE NOT NULL,
  mail         VARCHAR(255) UNIQUE NOT NULL,
  ngaythamgia  DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS nhacungcap;
CREATE TABLE nhacungcap
(
  manhacungcap  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tennhacungcap VARCHAR(255)        NOT NULL,
  diachi        VARCHAR(255)        NOT NULL,
  mail          VARCHAR(255) UNIQUE NOT NULL,
  sodienthoai   VARCHAR(255) UNIQUE NOT NULL
);

# Khoi tao tai khoan
DROP TABLE IF EXISTS chucnang;
CREATE TABLE chucnang
(
  machucnang  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenchucnang VARCHAR(255) UNIQUE,
  tenhienthi  VARCHAR(255)
);

DROP TABLE IF EXISTS hanhdong;
CREATE TABLE hanhdong
(
  mahanhdong  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenhanhdong VARCHAR(255) UNIQUE,
  tenhienthi  VARCHAR(255)
);

DROP TABLE IF EXISTS quyenhan;
CREATE TABLE quyenhan
(
  maquyenhan INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  chucnang   INT UNSIGNED NOT NULL,
  hanhdong   INT UNSIGNED NOT NULL,

  UNIQUE (chucnang, hanhdong),

  FOREIGN KEY (chucnang) REFERENCES chucnang (machucnang)
    ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (hanhdong) REFERENCES hanhdong (mahanhdong)
    ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS nhomquyen;
CREATE TABLE nhomquyen
(
  manhomquyen  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tennhomquyen VARCHAR(255) UNIQUE,
  tenhienthi   VARCHAR(255) UNIQUE,

  ghichu       VARCHAR(255)
);

DROP TABLE IF EXISTS ctquyen;
CREATE TABLE ctquyen
(
  mactquyen INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  nhomquyen INT UNSIGNED NOT NULL,
  quyenhan  INT UNSIGNED NOT NULL,

  UNIQUE (nhomquyen, quyenhan),

  FOREIGN KEY (nhomquyen) REFERENCES nhomquyen (manhomquyen)
    ON DELETE CASCADE ON UPDATE CASCADE,

  FOREIGN KEY (quyenhan) REFERENCES quyenhan (maquyenhan)
    ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS nhanvien;
CREATE TABLE nhanvien
(
  manhanvien  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  hoten       VARCHAR(255) NOT NULL,
  ngaysinh    DATE,
  mail        VARCHAR(255) NOT NULL UNIQUE,
  sodienthoai VARCHAR(50) UNIQUE,
  gioitinh    ENUM ('Nam', 'Nữ') DEFAULT 'Nam'
);

DROP TABLE IF EXISTS taikhoan;
CREATE TABLE taikhoan
(
  mataikhoan INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  matkhau    VARCHAR(255)        NOT NULL,
  vaitro     INT UNSIGNED,
  nhanvien   INT UNSIGNED UNIQUE NOT NULL,

  FOREIGN KEY (vaitro) REFERENCES nhomquyen (manhomquyen)
    ON UPDATE CASCADE ON DELETE SET NULL,

  FOREIGN KEY (nhanvien) REFERENCES nhanvien (manhanvien)
    ON UPDATE CASCADE ON DELETE CASCADE
);

# Them gia tri chuc nang
INSERT INTO chucnang (tenchucnang, tenhienthi)
VALUES ('QuanLySanPham', 'Quản lý sản phẩm'),
       ('QuanLyThuocTinh', 'Quản lý thuộc tính'),
       ('QuanLyNhapKho', 'Quản lý nhập kho'),
       ('QuanLyXuatKho', 'Quản lý xuất kho'),
       ('QuanLyDichVu', 'Quản lý dịch vụ'),
       ('QuanLyKhachHang', 'Quản lý khách hàng'),
       ('QuanLyNhaCungCap', 'Quản lý Nhà cung cấp'),
       ('QuanLyNhanVien', 'Quản lý nhân viên'),
       ('QuanLyTaiKhoan', 'Quản lý tài khoản'),
       ('ThongKe', 'Thống kê'),
       ('QuanLyNhomQuyen', 'Quản lý nhóm quyền'),
       ('QuanLyQuyenHan', 'Quản lý quyền hạn');

# Them gia tri hanh dong
INSERT INTO hanhdong (tenhanhdong, tenhienthi)
VALUES ('Xem', 'Xem'),
       ('XemCaNhan', 'Xem cá nhân'),
       ('XemChiTiet', 'Xem chi tiết'),
       ('Them', 'Thêm'),
       ('Sua', 'Sửa'),
       ('Xoa', 'Xóa'),
       ('NhapFile', 'Nhập tệp'),
       ('XuatFile', 'Xuất tệp');

SELECT *
FROM chucnang;

INSERT INTO quyenhan (chucnang, hanhdong)
SELECT c.machucnang, h.mahanhdong
FROM chucnang c
       INNER JOIN hanhdong h
WHERE (c.machucnang IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)
  AND h.mahanhdong = 1)
ORDER BY c.machucnang, h.mahanhdong;

INSERT INTO nhomquyen (tennhomquyen, tenhienthi, ghichu)
VALUES ('root', 'Quản lý kho', '');

INSERT INTO ctquyen (nhomquyen, quyenhan)
SELECT 1, maquyenhan
FROM quyenhan;

# Khoi tao san pham
DROP TABLE IF EXISTS xuatxu;
CREATE TABLE xuatxu
(
  maxuatxu  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenxuatxu VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS hedieuhanh;
CREATE TABLE hedieuhanh
(
  mahedieuhanh  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenhedieuhanh VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS thuonghieu;
CREATE TABLE thuonghieu
(
  mathuonghieu  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenthuonghieu VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS rom;
CREATE TABLE rom
(
  marom        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  dungluongrom INT UNSIGNED UNIQUE NOT NULL
);

DROP TABLE IF EXISTS ram;
CREATE TABLE ram
(
  maram        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  dungluongram INT UNSIGNED UNIQUE NOT NULL
);

DROP TABLE IF EXISTS mausac;
CREATE TABLE mausac
(
  mamausac  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tenmausac VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS danhmucsanpham;
CREATE TABLE danhmucsanpham
(
  madanhmucsanpham   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tendanhmucsanpham  VARCHAR(255) NOT NULL,
  chipxuly           VARCHAR(255) NOT NULL,
  dungluongpin       INT UNSIGNED NOT NULL,
  kichthuongmanhinh  INT UNSIGNED NOT NULL,
  cameratruoc        INT UNSIGNED NOT NULL,
  camerasau          INT UNSIGNED NOT NULL,
  phienbanhedieuhanh VARCHAR(255) NOT NULL,
  thoigianbaohanh    INT UNSIGNED NOT NULL,
  hinhanh            VARCHAR(255),

  xuatxu             INT UNSIGNED,
  hedieuhanh         INT UNSIGNED,
  thuonghieu         INT UNSIGNED,

  FOREIGN KEY (xuatxu) REFERENCES xuatxu (maxuatxu)
    ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (hedieuhanh) REFERENCES hedieuhanh (mahedieuhanh)
    ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (thuonghieu) REFERENCES thuonghieu (mathuonghieu)
    ON DELETE SET NULL ON UPDATE CASCADE
);

DROP TABLE IF EXISTS cauhinh;
CREATE TABLE cauhinh
(
  macauhinh      INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  gianhap        INT UNSIGNED NOT NULL,
  giaxuat        INT UNSIGNED NOT NULL,

  danhmucsanpham INT UNSIGNED NOT NULL,
  ram            INT UNSIGNED NOT NULL,
  rom            INT UNSIGNED NOT NULL,
  mausac         INT UNSIGNED NOT NULL,

  FOREIGN KEY (danhmucsanpham) REFERENCES danhmucsanpham (madanhmucsanpham)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (ram) REFERENCES ram (maram)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (rom) REFERENCES rom (marom)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (mausac) REFERENCES mausac (mamausac)
    ON UPDATE CASCADE ON DELETE CASCADE
);

# Khoi tao nhap xuat
DROP TABLE IF EXISTS tinhtrang;
CREATE TABLE tinhtrang
(
  matinhtrang  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  tentinhtrang VARCHAR(255) UNIQUE,
  tenhienthi   VARCHAR(255)
);

DROP TABLE IF EXISTS phieunhapkho;
CREATE TABLE phieunhapkho
(
  maphieunhap  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  thoigiannhap DATETIME DEFAULT CURRENT_TIMESTAMP,
  nhacungcap   INT UNSIGNED,
  nhanviennhap INT UNSIGNED,

  FOREIGN KEY (nhacungcap) REFERENCES nhacungcap (manhacungcap)
    ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (nhanviennhap) REFERENCES nhanvien (manhanvien)
    ON UPDATE CASCADE ON DELETE SET NULL
);

DROP TABLE IF EXISTS phieuxuatkho;
CREATE TABLE phieuxuatkho
(
  maphieuxuat  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  thoigianxuat DATETIME DEFAULT CURRENT_TIMESTAMP,
  khachhang    INT UNSIGNED,
  nhanvienxuat INT UNSIGNED,

  FOREIGN KEY (khachhang) REFERENCES khachhang (makhachhang)
    ON UPDATE CASCADE ON DELETE SET NULL,
  FOREIGN KEY (nhanvienxuat) REFERENCES nhanvien (manhanvien)
    ON UPDATE CASCADE ON DELETE SET NULL
);

DROP TABLE IF EXISTS sanpham;
CREATE TABLE sanpham
(
  masanpham INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  maimei    VARCHAR(255) UNIQUE NOT NULL,
  cauhinh   INT UNSIGNED        NOT NULL,
  phieunhap INT UNSIGNED        NOT NULL,
  phieuxuat INT UNSIGNED                 DEFAULT 0,
  tinhtrang INT UNSIGNED        NOT NULL DEFAULT 5,

  FOREIGN KEY (cauhinh) REFERENCES cauhinh (macauhinh)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (phieunhap) REFERENCES phieunhapkho (maphieunhap)
    ON UPDATE CASCADE ON DELETE CASCADE,

  FOREIGN KEY (phieuxuat) REFERENCES phieuxuatkho (maphieuxuat)
    ON UPDATE CASCADE ON DELETE SET NULL,

  FOREIGN KEY (tinhtrang) REFERENCES tinhtrang (matinhtrang)
    ON UPDATE CASCADE
);

INSERT INTO tinhtrang (tentinhtrang, tenhienthi)
VALUES ('tonKho', 'tồn kho'),
       ('daBan', 'đã bán'),
       ('hoanTra', 'hoàn trả'),
       ('biDoi', 'bị đổi'),
       ('koTinhTrang', '');


INSERT INTO nhanvien (hoten, ngaysinh, mail, sodienthoai)
VALUES ('test', '2000/1/1', 'root@mail', '333');




