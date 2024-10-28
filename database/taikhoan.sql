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

    UNIQUE INDEX quyen (nhomQuyen, chucNang, hanhDong),

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
    matKhau    VARCHAR(255) NOT NULL,

    vaiTro     INT UNSIGNED,
    nhanVien   INT UNSIGNED,

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
    gioiTinh    ENUM ('Nam', 'Nữ')
);

ALTER TABLE nhanVien
    MODIFY COLUMN mail VARCHAR(255) UNIQUE NOT NULL ;

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

# Them quyen xem tat ca cac trang cho tai khoan root
INSERT INTO CTQuyen (nhomQuyen, chucNang, hanhDong) (SELECT nQ.maNhomQuyen nhomQuyen,
                                                            cN.maChucNang  chucNang,
                                                            hD.maHanhDong  hanhDong
                                                     FROM nhomQuyen nQ
                                                              INNER JOIN chucNang cN
                                                              INNER JOIN hanhDong hD
                                                     WHERE nQ.maNhomQuyen IN (1)
                                                       AND hD.maHanhDong IN (1));

# Them quyen them, sua, xoa cho san pham, thuoc tinh va nhan vien cho tai khoan root
INSERT INTO CTQuyen (nhomQuyen, chucNang, hanhDong) (SELECT nQ.maNhomQuyen nhomQuyen,
                                                            cN.maChucNang  chucNang,
                                                            hD.maHanhDong  hanhDong
                                                     FROM nhomQuyen nQ
                                                              INNER JOIN chucNang cN
                                                              INNER JOIN hanhDong hD
                                                     WHERE nQ.maNhomQuyen IN (1)
                                                       AND cN.maChucNang IN (8, 2, 1)
                                                       AND hD.maHanhDong IN (5, 4, 6));

# Them quyen xem trang san pham, thuoc tinh, khach hang cho nhan vien
INSERT INTO CTQuyen (nhomQuyen, chucNang, hanhDong) (SELECT nQ.maNhomQuyen nhomQuyen,
                                                            cN.maChucNang  chucNang,
                                                            hD.maHanhDong  hanhDong
                                                     FROM nhomQuyen nQ
                                                              INNER JOIN chucNang cN
                                                              INNER JOIN hanhDong hD
                                                     WHERE nQ.maNhomQuyen IN (2)
                                                       AND cN.maChucNang IN (1, 2, 6)
                                                       AND hD.maHanhDong IN (1));

SELECT nV.maNhanVien,
       nv.hoTen,
       nv.ngaySinh,
       nv.soDienThoai,
       nv.gioiTinh,
       tK.mail,
       nQ.tenNhomQuyen,
       nQ.tenHienThi
FROM nhanVien nV
         INNER JOIN taiKhoan tK on nV.taiKhoan = tK.maTaiKhoan
         INNER JOIN nhomQuyen nQ ON nQ.maNhomQuyen = tK.vaiTro;

# Hien thi danh sach cac quyen cua tai khoan root
SELECT ctq.maCTQuyen ma,
       cN.maChucNang,
       cN.tenChucNang,
       hD.maHanhDong,
       hD.tenHanhDong
FROM CTQuyen ctq
         INNER JOIN chucNang cN on ctq.chucNang = cN.maChucNang
         INNER JOIN hanhDong hD on ctq.hanhDong = hD.maHanhDong
         INNER JOIN nhomQuyen nQ on ctq.nhomQuyen = nQ.maNhomQuyen
WHERE tenNhomQuyen = 'root'
ORDER BY maCTQuyen;

# Tao tai khoan root
INSERT INTO taiKhoan (mail, matKhau, vaiTro)
VALUES ('root@mail', 'admin', 1);

# Tao tai khoan nhan vien
INSERT INTO taiKhoan (mail, matKhau, vaiTro)
VALUES ('nv@mail', 'admin', 2);

# Gan tai khoan voi nhan vien
INSERT INTO nhanVien (hoTen, ngaySinh, soDienThoai, gioiTinh, mail,taiKhoan)
VALUES ('test1', '2004-1-20', '1234567890', 'Nam', 'a',1),
       ('test1', '2004-1-20', '1234567891', 'Nu', 'b',2);

DELETE FROM nhanVien WHERE nhanVien.maNhanVien > 0;