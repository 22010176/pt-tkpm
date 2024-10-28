DROP DATABASE IF EXISTS ptpm_taiKhoan;
CREATE DATABASE IF NOT EXISTS ptpm_taiKhoan;
USE ptpm_taiKhoan;

DROP TABLE IF EXISTS chucNang;
CREATE TABLE chucNang
(
    maChucNang  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenChucNang VARCHAR(255) UNIQUE,
    tenHienThi  VARCHAR(255)
);

DROP TABLE IF EXISTS hanhDong;
CREATE TABLE hanhDong
(
    maHanhDong  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenHanhDong VARCHAR(255) UNIQUE,
    tenHienThi  VARCHAR(255)
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
    gioiTinh    ENUM ('Nam', 'Nữ') DEFAULT 'Nam'
);

# Them gia tri chuc nang
INSERT INTO chucNang (tenChucNang, tenHienThi)
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
INSERT INTO hanhDong (tenHanhDong, tenHienThi)
VALUES ('Xem', 'Xem'),
       ('XemCaNhan', 'Xem cá nhân'),
       ('XemChiTiet', 'Xem chi tiết'),
       ('Them', 'Thêm'),
       ('Sua', 'Sửa'),
       ('Xoa', 'Xóa'),
       ('NhapFile', 'Nhập tệp'),
       ('XuatFile', 'Xuất tệp');

SELECT *
FROM chucNang
ORDER BY maChucNang;

SELECT *
FROM hanhDong
ORDER BY maHanhDong;

# them quyen xem cho tat cac cac chuc nang
INSERT INTO quyenHan (chucNang, hanhDong) (SELECT c.maChucNang chucNang, h.maHanhDong AS hanhDong
                                           FROM chucNang c
                                                    INNER JOIN hanhdong h
                                           WHERE h.maHanhDong = 1);

INSERT INTO quyenHan (chucNang, hanhDong) (SELECT c.maChucNang, h.maHanhDong
                                           FROM chucNang c
                                                    INNER JOIN hanhdong h
                                           WHERE c.maChucNang IN (1, 2, 6, 7, 8, 9)
                                             AND h.maHanhDong IN (4, 5, 6));

INSERT INTO ctquyen (nhomQuyen, quyenHan) (SELECT 1 AS nhomQuyen, quyenHan.maQuyenHan quyenHan FROM quyenHan);


SELECT *
FROM ctquyen;

SELECT q.maQuyenHan, Cn.maChucNang, cN.tenChucNang, Hd.maHanhDong, hd.tenHanhDong
FROM quyenHan q
         RIGHT JOIN hanhDong hD on q.hanhDong = hD.maHanhDong
         RIGHT JOIN chucNang cN on q.chucNang = cN.maChucNang
ORDER BY cN.maChucNang, hD.maHanhDong;

-- Them vai tro vao trong csdl
INSERT INTO nhomQuyen (tenNhomQuyen, tenHienThi, ghiChu)
VALUES ('root', 'Quản lý kho', ''),
       ('nhanVien', 'Nhân viên', '');

# Lay danh sach Quyen han
SELECT q.maQuyenHan, cN.tenChucNang, hD.tenHanhDong
FROM quyenHan q
         INNER JOIN chucNang cN on q.chucNang = cN.maChucNang
         INNER join hanhDong hD on q.hanhDong = hD.maHanhDong
ORDER BY cN.maChucNang, hD.maHanhDong;

SELECT *
FROM nhomQuyen
ORDER BY maNhomQuyen;

SELECT *
FROM nhanVien;



SELECT qh.maQuyenHan, cN.maChucNang, cN.tenChucNang, hD.maHanhDong, hD.tenHanhDong
FROM nhomQuyen nQ
         INNER JOIN ctquyen c ON nQ.maNhomQuyen = c.nhomQuyen
         INNER JOIN quyenHan qH on c.quyenHan = qH.maQuyenHan
         INNER JOIN hanhDong hD on qH.hanhDong = hD.maHanhDong
         INNER JOIN chucNang cN on qH.chucNang = cN.maChucNang
WHERE nQ.maNhomQuyen = 1;

INSERT INTO nhomQuyen (tenNhomQuyen, tenHienThi, ghiChu)
VALUES ('', '', '');

UPDATE nhomQuyen
SET tenNhomQuyen = '',
    tenHienThi   = '',
    ghiChu       = ''
WHERE maNhomQuyen = 1;


DELETE
FROM nhomQuyen
WHERE maNhomQuyen = 1;
