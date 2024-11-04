const {v4, MAX} = require("uuid");
const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender, randomDate} = require("./utitlies");

function genNhanVien() {
  return {
    hoten:       v4(),
    ngaysinh:    randomDate(new Date(2020), new Date()),
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
    ngaysinh:     randomDate(new Date(2020), new Date()),
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
    giaxuat:        randInt(0, 1000000) * randInt(0, 10),
    danhmucsanpham: getRand(danhMucSanPham)?.madanhmucsanpham,
    ram:            getRand(ram)?.maram,
    rom:            getRand(rom)?.marom,
    mausac:         getRand(mauSac)?.mamausac
  }
}

function genPhieuNhapKho(nhaCungCap = [], nhanVien = []) {
  return {
    nhacungcap:   getRand(nhaCungCap)?.manhacungcap,
    nhanviennhap: getRand(nhanVien)?.manhanvien,
    thoigiannhap: randomDate(new Date(2020, 0, 1), new Date())
  }
}

function genPhieuXuatKho(khachHang = [], nhanVien = []) {
  return {
    khachhang:    getRand(khachHang)?.makhachhang,
    nhanvienxuat: getRand(nhanVien)?.manhanvien,
    thoigianxuat: randomDate(new Date(2020, 0, 1), new Date())
  }
}

function genSanPham(cauHinh = [], phieuNhap = [], phieuXuat = [], tinhTrang = []) {
  return {
    maimei:    v4(),
    cauhinh:   getRand(cauHinh)?.macauhinh,
    phieunhap: getRand(phieuNhap)?.maphieunhap,
    phieuxuat: Math.random() > 0.1 ? getRand(phieuXuat)?.maphieuxuat : undefined,
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


















