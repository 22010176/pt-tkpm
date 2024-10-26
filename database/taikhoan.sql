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
    nhomQuyen INT UNSIGNED,
    chucNang  INT UNSIGNED,
    hanhDong  INT UNSIGNED,

    FOREIGN KEY (nhomQuyen) REFERENCES nhomQuyen (maNhomQuyen)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (chucNang) REFERENCES chucNang (maChucNang)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (hanhDong) REFERENCES hanhDong (maHanhDong)
        ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS taiKhoan;
CREATE TABLE taiKhoan
(
    maTaiKhoan INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    mail       VARCHAR(255) NOT NULL UNIQUE,
    matKhau    VARCHAR(255) NOT NULL,
    vaiTro     INT UNSIGNED,

    FOREIGN KEY (vaiTro) REFERENCES nhomQuyen (maNhomQuyen)
        ON UPDATE CASCADE ON DELETE SET NULL
);

DROP TABLE IF EXISTS nhanVien;
CREATE TABLE nhanVien
(
    maNhanVien  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hoTen       VARCHAR(255),
    ngaySinh    DATE,
    soDienThoai VARCHAR(20) UNIQUE,
    gioiTinh    ENUM ('Nam', 'Nữ'),
    taiKhoan    INT UNSIGNED UNIQUE DEFAULT NULL,

    FOREIGN KEY (taiKhoan) REFERENCES taiKhoan (maTaiKhoan)
        ON UPDATE CASCADE ON DELETE SET NULL
);

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



INSERT INTO CTQuyen (nhomQuyen, chucNang, hanhDong) (SELECT nQ.maNhomQuyen nhomQuyen,
                                                            cN.maChucNang  chucNang,
                                                            hD.maHanhDong  hanhDong
                                                     FROM nhomQuyen nQ
                                                              INNER JOIN chucNang cN
                                                              INNER JOIN hanhDong hD
                                                     WHERE nQ.maNhomQuyen IN (1)
                                                       AND hD.maHanhDong IN (1));

SELECT ctq.maCTQuyen ma, nQ.tenNhomQuyen, cN.tenChucNang, hD.tenHanhDong
FROM CTQuyen ctq
         INNER JOIN chucNang cN on ctq.chucNang = cN.maChucNang
         INNER JOIN hanhDong hD on ctq.hanhDong = hD.maHanhDong
         INNER JOIN nhomQuyen nQ on ctq.nhomQuyen = nQ.maNhomQuyen
ORDER BY maCTQuyen;



