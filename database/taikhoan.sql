DROP DATABASE IF EXISTS ptpm_taiKhoan;
CREATE DATABASE IF NOT EXISTS ptpm_taiKhoan;
USE ptpm_taiKhoan;

DROP TABLE IF EXISTS chucNang;
CREATE TABLE chucNang
(
    maChucNang  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenChucNang VARCHAR(255) UNIQUE
);

DROP TABLE IF EXISTS hanhDong;
CREATE TABLE hanhDong
(
    maHanhDong  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenHanhDong VARCHAR(255) UNIQUE
);

DROP TABLE IF EXISTS quyenHan;
CREATE TABLE quyenHan
(
    maQuyenHan INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    chucNang   INT UNSIGNED NOT NULL,
    hanhDong   INT UNSIGNED NOT NULL,

    UNIQUE (chucNang, hanhDong),

    FOREIGN KEY (chucNang) REFERENCES chucNang (maChucNang)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (hanhDong) REFERENCES hanhDong (maHanhDong)
        ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS nhomQuyen;
CREATE TABLE nhomQuyen
(
    maNhomQuyen  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenNhomQuyen VARCHAR(255) UNIQUE,
    tenHienThi   VARCHAR(255),
    ghiChu       VARCHAR(255)
);

DROP TABLE IF EXISTS CTQuyen;
CREATE TABLE CTQuyen
(
    maCTQuyen INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nhomQuyen INT UNSIGNED NOT NULL,
    quyenHan  INT UNSIGNED NOT NULL,

    UNIQUE (nhomQuyen, quyenHan),

    FOREIGN KEY (nhomQuyen) REFERENCES nhomQuyen (maNhomQuyen)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (quyenHan) REFERENCES quyenHan (maQuyenHan)
        ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS taiKhoan;
CREATE TABLE taiKhoan
(
    maTaiKhoan INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    matKhau    VARCHAR(255) NOT NULL,

    vaiTro     INT UNSIGNED,
    nhanVien   INT UNSIGNED NOT NULL,

    FOREIGN KEY (vaiTro) REFERENCES nhomQuyen (maNhomQuyen)
        ON UPDATE CASCADE ON DELETE SET NULL,

    FOREIGN KEY (nhanVien) REFERENCES nhanVien (maNhanVien)
        ON UPDATE CASCADE ON DELETE CASCADE
);



DROP TABLE IF EXISTS nhanVien;
CREATE TABLE nhanVien
(
    maNhanVien  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hoTen       VARCHAR(255),
    ngaySinh    DATE,
    mail        VARCHAR(255) NOT NULL UNIQUE,
    soDienThoai VARCHAR(20) UNIQUE,
    gioiTinh    BOOLEAN DEFAULT 1
);


# UPDATE nhanVien SET mail = 'a' WHERE mail IS null;

# Them gia tri chuc nang
INSERT INTO chucNang (tenChucNang)
VALUES ('QuanLySanPham'),
       ('QuanLyThuocTinh'),
       ('QuanLyNhapKho'),
       ('QuanLyXuatKho'),
       ('QuanLyDoiTraHang'),
       ('QuanLyKhachHang'),
       ('QuanLyNhaCungCap'),
       ('QuanLyNhanVien'),
       ('QuanLyTaiKhoan'),
       ('ThongKe'),
       ('QuanLyNhomQuyen'),
       ('QuanLyQuyenHan');

# Them gia tri hanh dong
INSERT INTO hanhDong (tenHanhDong)
VALUES ('Xem'),
       ('XemCaNhan'),
       ('XemChiTiet'),
       ('Them'),
       ('Sua'),
       ('Xoa'),
       ('NhapFile'),
       ('XuatFile');

-- Them vai tro vao trong csdl
INSERT INTO nhomQuyen (tenNhomQuyen, tenHienThi, ghiChu)
VALUES ('root', 'Quản lý kho', ''),
       ('nhanVien', 'Nhân viên', '');



