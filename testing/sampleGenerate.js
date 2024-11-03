const {v4, MAX} = require("uuid");
const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender} = require("./utitlies");

function genNhanVien() {
  return {
    hoten:       v4(),
    ngaysinh:    randDate(new Date(1950), new Date()),
    sodienthoai: v4(),
    gioitinh:    randGender(),
    mail:        randomEmail(),
  }
}

function genNhaCungCap() {
  return {tennhacungcap: v4(), diachi: v4(), mail: randomEmail(), sodienthoai: v4(),}
}

function genKhachHang() {
  return {
    tenkhachhang: v4(),
    ngaysinh:     randDate(new Date(1950), new Date()),
    diachi:       v4(),
    sodienthoai:  v4(),
    mail:         randomEmail(),
  }
}

function genXuatXu() {
  return {tenxuatxu: v4()}
}

function genHeDieuHanh() {
  return {tenhedieuhanh: v4()}
}

function genThuongHieu() {
  return {tenthuonghieu: v4()}
}

function genMauSac() {
  return {tenmausac: v4()}
}

function genRam() {
  return {dungluongram: randInt(1, 0xffffffff)}
}

function genRom() {
  return {dungluongrom: randInt(0, 0xffffffff)}
}

function genTaiKhoan(nhanVien = [], vaiTro = []) {
  return {
    matkhau:  v4(),
    nhanvien: nhanVien[randInt(0, nhanVien.length - 1)]?.manhanvien,
    vaitro:   vaiTro[randInt(0, vaiTro.length - 1)]?.manhomquyen,
  }
}

function genDanhMucSanPham(xuatXu = [], heDieuHanh = [], thuongHieu) {
  return {
    tendanhmucsanpham:  v4(),
    chipxuly:           v4(),
    dungluongpin:       randInt(0, 10000),
    kichthuongmanhinh:  randInt(0, 10000),
    cameratruoc:        randInt(0, 10000),
    camerasau:          randInt(0, 10000),
    phienbanhedieuhanh: v4(),
    thoigianbaohanh:    randInt(0, 100),
    xuatxu:             getRand(xuatXu)?.maxuatxu,
    hedieuhanh:         getRand(heDieuHanh)?.mahedieuhanh,
    thuonghieu:         getRand(thuongHieu)?.mathuonghieu
  }
}

function genCauHinh(danhMucSanPham = [], rom = [], ram = [], mauSac = []) {
  return {
    gianhap:        randInt(0, 1000000),
    giaxuat:        randInt(0, 1000000),
    danhmucsanpham: getRand(danhMucSanPham)?.madanhmucsanpham,
    ram:            getRand(ram)?.maram,
    rom:            getRand(rom)?.marom,
    mausac:         getRand(mauSac)?.mamausac
  }
}

function genPhieuNhapKho(nhaCungCap = [], nhanVien = []) {
  return {
    thoigiannhap: randDate(new Date(2010), new Date()),
    nhacungcap:   getRand(nhaCungCap)?.manhacungcap,
    nhanviennhap: getRand(nhanVien)?.manhanvien
  }
}

function genPhieuXuatKho(khachHang = [], nhanVien = []) {
  return {
    thoigianxuat: randDate(new Date(2010), new Date()),
    khachhang:    getRand(khachHang)?.makhachhang,
    nhanvienxuat: getRand(nhanVien)?.manhanvien
  }
}

function genSanPham(cauHinh = [], phieuNhap = [], phieuXuat = [], tinhTrang = []) {
  return {
    maIMEI:    v4(),
    cauhinh:   getRand(cauHinh)?.macauhinh,
    phieunhap: getRand(phieuNhap)?.maphieunhapkho,
    phieuxuat: getRand(phieuXuat)?.maphieuxuatkho,
    tinhtrang: getRand(tinhTrang)?.matinhtrang
  }
}

module.exports = {
  genNhanVien,
  genTaiKhoan,

  genNhaCungCap,
  genKhachHang,

  genXuatXu,
  genHeDieuHanh,
  genThuongHieu,
  genMauSac,
  genRam,
  genRom,

  genDanhMucSanPham,
  genCauHinh,

  genSanPham,
  genPhieuNhapKho,
  genPhieuXuatKho
}


















