DROP DATABASE IF EXISTS ptpm;
CREATE DATABASE ptpm;

USE ptpm;

DROP TABLE IF EXISTS ram;
CREATE TABLE ram (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten INT UNSIGNED
);

INSERT INTO ram (ma, ten) VALUES
(NULL, 4);

UPDATE ram 
SET ten = 8 
WHERE ma = 2;

SELECT * FROM ram;

DROP TABLE IF EXISTS rom;
CREATE TABLE rom (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten INT UNSIGNED
);

DROP TABLE IF EXISTS mauSac;
CREATE TABLE mauSac (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255)
);

DROP TABLE IF EXISTS xuatXu;
CREATE TABLE xuatXu (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255)
);

DROP TABLE IF EXISTS thuongHieu;
CREATE TABLE thuongHieu (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255)
);

DROP TABLE IF EXISTS heDieuHanh;
CREATE TABLE heDieuHanh (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255)
);

DROP TABLE IF EXISTS taiKhoanNguon;
CREATE TABLE taiKhoanNguon (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    matKhau VARCHAR(255),
    soDienThoai VARCHAR(255) UNIQUE,
    ngaySinh DATE,
    gioiTinh ENUM ('Nam', 'Nu')
);

INSERT INTO taiKhoanNguon VALUES 
(NULL, 'test1', 'admin@g', 'admin', '11111', '2000-1-13', 'Nam'),
(NULL, 'test1', 'admin2@g', 'admin', '113111', '2000-1-13', 'Nu');

SELECT * FROM taiKhoanNguon 
WHERE email = 'admin2@g' AND matKhau = 'admin';

SELECT * FROM taiKhoanNguon;

DROP TABLE IF EXISTS tokenDangNhap;
CREATE TABLE tokenDangNhap (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) UNIQUE,
    taiKhoanNguon INT UNSIGNED DEFAULT NULL, 
    taiKhoanNhanVien INT UNSIGNED DEFAULT NULL,

    FOREIGN KEY (taiKhoanNguon) REFERENCES taiKhoanNguon(ma)
);

INSERT INTO tokenDangNhap (token, taiKhoanNguon) VALUES ("tes3t", 3);

SELECT * FROM tokenDangNhap WHERE token = 'e2e20cbb-c240-417b-a998-aec93173fff0';

SELECT * FROM tokenDangNhap AS tk
INNER JOIN taiKhoanNguon AS ng ON ng.ma = tk.taiKhoanNguon;

DELETE FROM tokenDangNhap WHERE ma = 3;

