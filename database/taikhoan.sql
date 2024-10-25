DROP DATABASE IF EXISTS ptpm_taiKhoan;
CREATE DATABASE IF NOT EXISTS ptpm_taiKhoan;
USE ptpm_taiKhoan;

DROP TABLE IF EXISTS chucNang;
CREATE TABLE chucNang (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) UNIQUE
);

DROP TABLE IF EXISTS hanhDong;
CREATE TABLE hanhDong (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    ten VARCHAR(255) UNIQUE
);

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

DROP TABLE IF EXISTS nhomQuyen;
CREATE TABLE nhomQuyen (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    maQuyen VARCHAR(255) UNIQUE,
    ten VARCHAR(255)
);

DROP TABLE IF EXISTS CTQuyen;
CREATE TABLE CTQuyen (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nhomQuyen INT UNSIGNED UNIQUE,
    quyenHan INT UNSIGNED UNIQUE,

    FOREIGN KEY (nhomQuyen) REFERENCES nhomQuyen(ma)
    ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (quyenHan) REFERENCES quyenHan(ma)
    ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS taiKhoan;
CREATE TABLE taiKhoan (
	ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    matKhau VARCHAR(255) NOT NULL,
    vaiTro INT UNSIGNED,

    FOREIGN KEY (vaiTro) REFERENCES nhomQuyen(ma)
    ON UPDATE CASCADE ON DELETE SET NULL
);

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

INSERT INTO chucNang (ten) VALUES
('QuanLySanPham'),
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

INSERT INTO hanhDong (ten) VALUES
('Xem'),
('XemCaNhan');

SELECT * FROM hanhDong ORDER BY ma;
SELECT * FROM chucNang ORDER BY ma;
SELECT * FROM quyenHan ORDER BY ma;

INSERT INTO quyenHan (chucNang, hanhDong)  (	-- Them quyen xem cho tat ca chuc nang
	SELECT ma AS chucNang, 1 AS hanhDong
    FROM chucNang
);

INSERT INTO quyenHan (chucNang, hanhDong) (	-- Them quyen xem cac nhan cho quyen han, nhom quyen, tai khoan va nhan vien
	SELECT cn.ma AS chucNang, hd.ma AS hanhDong
    FROM chucNang AS cn
    INNER JOIN hanhDong AS hd
    WHERE hd.ma = 2 AND cn.ma IN (25, 24, 22, 21)
);

-- Lay danh sach cac quyen han
SELECT qh.ma AS maQuyenHan, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM quyenHan AS qh
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
ORDER BY maHanhDong;

-- Them vai tro vao trong csdl
INSERT INTO nhomQuyen (maQuyen, ten) VALUES
('root', 'Quản lý kho'),
('nhanVien', 'Nhân viên');

SELECT * FROM nhomQuyen ORDER BY ma;
SELECT * FROM quyenHan ORDER BY ma;
SELECT * FROM ctquyen;

-- Gan quyen xem tat ca cac trang cho quan ly kho
INSERT INTO ctquyen (nhomQuyen, quyenHan) (
	SELECT nq.ma AS nhomQuyen, qh.ma AS quyenHan
    FROM quyenHan AS qh
    INNER JOIN nhomQuyen AS nq
    WHERE nq.ma = 1
);

SELECT * FROM nhomQuyen;
SELECT * FROM quyenHan;

SELECT qh.ma AS maQuyenHan, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM quyenHan AS qh
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong;

--  Them cac quyen xem thong tin ca nhan cho nhan vien
INSERT INTO ctquyen (nhomQuyen, quyenHan) (
	SELECT nq.ma AS nhomQuyen, qh.ma AS quyenHan
    FROM quyenHan AS qh
    INNER JOIN nhomQuyen AS nq
    WHERE qh.hanhDong = 2 AND nq.ma = 2
);

SELECT * FROM chucNang ORDER BY ma;

-- Them quyen xem san pham, thuoc tinh va khach hang cho nhan vien
INSERT INTO ctquyen (nhomQuyen, quyenHan) (
	SELECT  nq.ma AS nhomQuyen, qh.ma AS quyenHan
    FROM quyenHan AS qh
    INNER JOIN nhomQuyen AS nq
    WHERE qh.hanhDong = 1 AND nq.ma = 2 AND qh.chucNang IN (41)
);

DELETE FROM ctQuyen WHERE ma IN (30);

-- Lay danh sach nhom quyen cua mot nhom quyen (vi du nhan vien)
SELECT ct.ma AS ma, vt.ma AS maVaiTro, vt.ten AS tenVaiTro, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM ctQuyen AS ct
INNER JOIN nhomQuyen AS vt ON vt.ma = ct.nhomQuyen
INNER JOIN quyenHan AS qh ON qh.ma = ct.quyenHan
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
WHERE vt.ma = 2
ORDER BY ct.ma;

SELECT * FROM ctQuyen;

INSERT INTO ctQuyen (nhomQuyen, quyenHan) VALUES
(2, 41);

SELECT * FROM taiKhoan;
SELECT * FROM nhomQuyen;



-- Them tai khoan demo cho 2 nhom quyen
INSERT INTO taiKhoan (email, matKhau, vaiTro) VALUES
('root', 'admin', 1),
('nhanVien','admin', 2);

SELECT * FROM taiKhoan;

UPDATE taiKhoan SET email = "nv@mail" WHERE ma = 2;

--  Lay danh sach quyen han cua tai khoan (vi du nhanVien)
SELECT tk.ma AS maTaiKhoan, tk.email AS email, tk.vaiTro AS maVaiTro, nq.ten AS tenVaiTro, cn.ma AS maChucNang, cn.ten AS tenChucNang, hd.ma AS maHanhDong, hd.ten AS tenHanhDong
FROM taiKhoan AS tk
INNER JOIN nhomQuyen AS nq ON nq.ma = tk.vaiTro
INNER JOIN CTQuyen AS ct ON ct.nhomQuyen = nq.ma
INNER JOIN quyenHan AS qh ON qh.ma = ct.quyenHan
INNER JOIN chucNang AS cn ON cn.ma = qh.chucNang
INNER JOIN hanhDong AS hd ON hd.ma = qh.hanhDong
WHERE tk.ma = 2;






SELECT * FROM nhanVien;
SELECT * FROM taiKhoan;

	-- ma INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
--     hoTen VARCHAR(255),
--     ngaySinh DATE,
--     soDienThoai VARCHAR(20) UNIQUE,
--     gioiTinh ENUM ('Nam', 'Nữ'),
--     taiKhoan INT UNSIGNED UNIQUE DEFAULT NULL,

INSERT INTO nhanVien (hoTen, ngaySinh, soDienThoai, gioiTinh, taiKhoan) VALUES
("test1", "1000-1-20", "1234567890", "Nam", 1),
("test1", "1000-1-20", "1234567891", "Nam", 2);

SELECT * FROM nhomQuyen;

SELECT nv.ma, nv.hoTen, nv.gioiTinh, nv.ngaySinh, nv.soDienThoai, tk.email AS email, nq.ten AS tenNhomQuyen
FROM nhanvien AS nv
INNER JOIN taiKhoan AS tk ON tk.ma = nv.taiKhoan
INNER JOIN nhomQuyen as nq ON nq.ma = tk.vaiTro
WHERE nv.ma = 2;





