DROP DATABASE IF EXISTS ptpm_sanPham;
CREATE DATABASE ptpm_sanPham;

USE ptpm_sanPham;

DROP TABLE IF EXISTS xuatXu;
CREATE TABLE xuatXu
(
    maXuatXu  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenXuatXu VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS heDieuHanh;
CREATE TABLE heDieuHanh
(
    maHeDieuHanh  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenHeDieuHanh VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS thuongHieu;
CREATE TABLE thuongHieu
(
    maThuongHieu  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenThuongHieu VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS Rom;
CREATE TABLE Rom
(
    maRom        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dungLuongRom INT UNSIGNED UNIQUE NOT NULL
);

DROP TABLE IF EXISTS Ram;
CREATE TABLE Ram
(
    maRam        INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dungLuongRam INT UNSIGNED UNIQUE NOT NULL
);

DROP TABLE IF EXISTS mauSac;
CREATE TABLE mauSac
(
    maMauSac  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenMauSac VARCHAR(255) UNIQUE NOT NULL
);

DROP TABLE IF EXISTS danhMucSanPham;
CREATE TABLE danhMucSanPham
(
    maDanhMucSanPham   INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    chipXuLy           VARCHAR(255),
    dungLuongPin       INT UNSIGNED,
    kichThuongManHinh  INT UNSIGNED,
    cameraTruoc        INT UNSIGNED,
    cameraSau          INT UNSIGNED,
    phienBanHeDieuHanh VARCHAR(255),
    thoiGianBaoHanh    INT UNSIGNED,
    hinhAnh            VARCHAR(255),

    xuatXu             INT UNSIGNED,
    heDieuHanh         INT UNSIGNED,
    thuongHieu         INT UNSIGNED,

    FOREIGN KEY (xuatXu) REFERENCES xuatXu (maXuatXu),
    FOREIGN KEY (heDieuHanh) REFERENCES heDieuHanh (maHeDieuHanh),
    FOREIGN KEY (thuongHieu) REFERENCES thuongHieu (maThuongHieu)
);

DROP TABLE IF EXISTS cauHinh;
CREATE TABLE cauHinh
(
    maCauHinh      INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    giaNhap        INT UNSIGNED,
    giaXuat        INT UNSIGNED,

    danhMucSanPham INT UNSIGNED,
    ram            INT UNSIGNED,
    rom            INT UNSIGNED,
    mauSac         INT UNSIGNED,

    FOREIGN KEY (danhMucSanPham) REFERENCES danhMucSanPham (maDanhMucSanPham)
        ON UPDATE CASCADE ON DELETE CASCADE,

    FOREIGN KEY (ram) REFERENCES Ram (maRam)
        ON UPDATE CASCADE ON DELETE CASCADE,

    FOREIGN KEY (rom) REFERENCES Rom (maRom)
        ON UPDATE CASCADE ON DELETE CASCADE,

    FOREIGN KEY (mauSac) REFERENCES mauSac (maMauSac)
        ON UPDATE CASCADE ON DELETE CASCADE
);

# Khoi tao gia tri cho bang xuat xu
INSERT INTO xuatXu (tenXuatXu)
VALUES ('Trung Quốc'),
       ('Canada'),
       ('Mỹ'),
       ('Đài Loan');

# Khoi tao gia tri cho bang he dieu hanh
INSERT INTO heDieuHanh (tenHeDieuHanh)
VALUES ('Window'),
       ('IOS'),
       ('Android');

# Khoi tao gia tri cho bang thuong hieu
INSERT INTO thuongHieu (tenThuongHieu)
VALUES ('Microsoft'),
       ('Apple'),
       ('Google');


INSERT INTO ram (dungLuongRam)
VALUES (4),
       (2),
       (8);

INSERT INTO rom (dungLuongRom)
VALUES (4),
       (2),
       (8);

INSERT INTO mausac (tenMauSac)
VALUES ('đỏ'),
       ('xanh lá cây'),
       ('vàng');

SELECT *
FROM ram
ORDER BY maRam;

UPDATE Ram
SET dungLuongRam = 32
WHERE maRam = 5;

SELECT *
FROM mausac;

DELETE
FROM ram
WHERE maRam = 1;

SELECT *
FROM danhMucSanPham
ORDER BY maDanhMucSanPham;

SELECT *
FROM xuatXu;