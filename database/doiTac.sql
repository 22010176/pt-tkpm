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
    mail         VARCHAR(255) UNIQUE DEFAULT NULL,
    ngayThamGia  DATETIME            DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS nhaCungCap;
CREATE TABLE nhaCungCap
(
    maNhaCungCap  INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tenNhaCungCap VARCHAR(255),
    diaChi        VARCHAR(255),
    mail          VARCHAR(255) UNIQUE,
    soDienThoai   VARCHAR(255) UNIQUE
);

SHOW DATABASES ;
