DROP DATABASE IF EXISTS ptpm_taiKhoan;
CREATE DATABASE IF NOT EXISTS ptpm_taiKhoan;
USE ptpm_taiKhoan;

DROP TABLE IF EXISTS chucNang;
CREATE TABLE chucNang (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) UNIQUE
);

INSERT INTO chucNang (ten) VALUES
('QuanLySanPham'),
('QuanLyThuocTinh'),
('QuanLyNhanVien'),
('QuanLyNhapKho'),
('QuanLyXuatKho'),
('QuanLyKhachHang'),
('QuanLyNhaCungCap'),
('QuanLyDoiTraHang'),
('QuanLyTaiKhoanCaNhan'),
('QuanLyTaiKhoanNhanVien'),
('ThongKe'),
('PhanQuyen');
SELECT * FROM chucNang ORDER BY ma;

DROP TABLE IF EXISTS hanhDong;
CREATE TABLE hanhDong (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) UNIQUE
);
INSERT INTO hanhDong (ten) VALUES
('Xem'),
('XemChiTiet'),
('Them'),
('Sua'),
('XuatExcel'),
('Xoa');

SELECT * FROM hanhDong ORDER BY ma;

DROP TABLE IF EXISTS quyenHan;
CREATE TABLE quyenHan (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    chucNang INT UNSIGNED,
    hanhDong INT UNSIGNED,
    
    FOREIGN KEY (chucNang) REFERENCES chucNang(ma) 
    ON UPDATE CASCADE ON DELETE CASCADE,
    
    FOREIGN KEY (hanhDong) REFERENCES hanhDong(ma) 
    ON UPDATE CASCADE ON DELETE CASCADE
);
INSERT INTO quyenHan (chucNang, hanhDong) VALUES
(12, 1), -- Xem Phan quyen
(10, 1), -- Xem Tai khoan Nhan Vien
(3, 1), -- Xem Nhan vien
(9, 1); -- Xem tai khoan ca nha

SELECT q.ma, cn.*, qh.* FROM quyenHan AS q
INNER JOIN chucNang AS cn ON cn.ma = q.chucNang
INNER JOIN hanhDong AS qh ON qh.ma = q.hanhDong;

DROP TABLE IF EXISTS nhomQuyen;
CREATE TABLE nhomQuyen (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) UNIQUE
);

INSERT INTO nhomQuyen (ten) VALUES
('Root');

SELECT * FROM nhomQuyen ORDER BY ma;

DROP TABLE IF EXISTS CTQuyen;
CREATE TABLE CTQuyen (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nhomQuyen INT UNSIGNED,
    quyenHan INT UNSIGNED,
    
    FOREIGN KEY (nhomQuyen) REFERENCES nhomQuyen(ma)
    ON DELETE CASCADE ON UPDATE CASCADE,
    
    FOREIGN KEY (quyenHan) REFERENCES quyenHan(ma)
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO CTQuyen (nhomQuyen, quyenHan) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4);

-- Lay danh sach quyen
SELECT vt.ma AS maVaiTro, vt.ten AS tenVaiTro, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong 
FROM CTQuyen AS ct
INNER JOIN nhomQuyen AS vt ON vt.ma = ct.nhomQuyen
INNER JOIN quyenHan AS qh ON qh.ma = ct.quyenHan
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong;

DROP TABLE IF EXISTS taiKhoan;
CREATE TABLE taiKhoan (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    matKhau VARCHAR(255) NOT NULL,
    vaiTro INT UNSIGNED,
    
    FOREIGN KEY (vaiTro) REFERENCES nhomQuyen(ma)
    ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO taiKhoan (email, matKhau, vaiTro) VALUES 
('b@b', "admin", 1);

--  Lay danh sach quyen cua tai khoan
SELECT tk.ma AS maTaiKhoan, tk.vaiTro AS maVaiTro, nq.ten AS tenVaiTro, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM taiKhoan AS tk 
INNER JOIN nhomQuyen AS nq ON nq.ma = tk.vaiTro
INNER JOIN CTQuyen AS ct ON ct.nhomQuyen = nq.ma
INNER JOIN quyenHan AS qh ON qh.ma = ct.quyenHan
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
WHERE tk.ma = 4;

SELECT * FROM taiKhoan ;

SELECT * FROM taiKhoan
WHERE password = '' AND email = '' AND userID = '';

DELETE FROM taiKhoan 
WHERE ma = '' AND email = '' AND matKhau = '';

DROP TABLE IF EXISTS nhanVien;
CREATE TABLE nhanVien (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hoTen VARCHAR(255),
    ngaySinh DATE,
    soDienThoai VARCHAR(20) UNIQUE,
    gioiTinh ENUM ('Nam', 'Nữ'),
    taiKhoan INT UNSIGNED UNIQUE DEFAULT NULL,
    
    FOREIGN KEY (taiKhoan) REFERENCES taiKhoan(ma)
    ON UPDATE CASCADE ON DELETE SET NULL
);

INSERT INTO nhanVien (hoTen, ngaySinh, soDienThoai, gioiTinh, taiKhoan) VALUES 
('TEST1', '2001-01-13', '0000000', 'Nam', 4);


SELECT * FROM nhanVien AS nv
INNER JOIN taiKhoan AS tk ON tk.ma = nv.taiKhoan;

DELETE FROM taiKhoan 
WHERE ma = 2 AND email = 'b@b' AND matKhau = 'admin';



