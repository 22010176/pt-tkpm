DROP DATABASE IF EXISTS ptpm_doiTac;
CREATE DATABASE ptpm_doiTac;
USE ptpm_doiTac;

DROP TABLE IF EXISTS khachHang;
CREATE TABLE khachHang
(
    maKhachHang  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenKhachHang VARCHAR(255),
    ngaySinh     DATE,
    diaChi       VARCHAR(255),
    soDienThoai  VARCHAR(255) UNIQUE,
    mail         VARCHAR(255) UNIQUE DEFAULT NULL
);

DROP TABLE IF EXISTS nhaCungCap;
CREATE TABLE nhaCungCap
(
    maNhaCungCap INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    diaChi       VARCHAR(255),
    mail         VARCHAR(255) UNIQUE,
    soDienThoai  VARCHAR(255) UNIQUE
);

SELECT *
FROM khachHang
ORDER BY maKhachHang;

INSERT INTO khachHang (tenKhachHang, ngaySinh, diaChi, soDienThoai, mail)
VALUES ('test1', '2004-01-30', 'test', '099333', 'a@a');

UPDATE khachHang
SET tenKhachHang = '',
    ngaySinh     = '',
    diaChi       = '',
    soDienThoai  = '',
    mail         = ''
WHERE maKhachHang = 2;

DELETE
FROM khachHang
WHERE maKhachHang = '';