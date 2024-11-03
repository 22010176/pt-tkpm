const {
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
      } = require('./sampleGenerate');

const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender, compareArr} = require("./utitlies");

const {insertKhachHang, getKhachHang, deleteKhachHang, updateKhachHang} = require('./API/khachHang')
const {insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien} = require("./API/nhanVien");
const {testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh, getAllThuocTinh, insertAllThuocTinh} = require("./API/thuocTinh");
const {getNCC, insertNCC, updateNCC, deleteNCC} = require("./API/nhaCungCap");
const {getDanhMucSanPham, insertDanhMucSanPham, updateDanhMucSanPham, deleteDanhMucSanPham} = require("./API/sanPham");
const {getConfigures, insertConfigure, updateConfigure, deleteConfigure,} = require('./API/configures')


async function createNhanVien(number) {
  return await insertNhanVien(new Array(number).fill(0).map(genNhanVien));
}

async function createKhachHang(number) {
  return await insertKhachHang(new Array(number).fill(0).map(genKhachHang))
}

async function createNhaCungCap(number) {
  return await insertNCC(new Array(number).fill(0).map(genNhaCungCap))
}

async function createThuocTinh(number) {
  return insertAllThuocTinh(genRam, genRom, genXuatXu, genHeDieuHanh, genThuongHieu, genMauSac)
}

async function createDanhMucSanPham(number) {
  const [xuatXu, heDieuHanh, thuongHieu] = await Promise.all([
    testGetThuocTinh("xuatXu").then(i => i.attributes),
    testGetThuocTinh("heDieuHanh").then(i => i.attributes),
    testGetThuocTinh("thuongHieu").then(i => i.attributes),
  ])
  // console.log(xuatXu, heDieuHanh, thuongHieu)

  // console.log(xuatXu)
  return insertDanhMucSanPham(
    new Array(number)
    .fill(0)
    .map(genDanhMucSanPham.bind({}, xuatXu, heDieuHanh, thuongHieu)))
}


async function createCauHinh(number) {
  const [ram, rom, mauSac] = await Promise.all([
    testGetThuocTinh("ram").then(i => i.attributes),
    testGetThuocTinh("rom").then(i => i.attributes),
    testGetThuocTinh("mauSac").then(i => i.attributes),
  ])
  const danhMucSanPham = await getDanhMucSanPham().then(i => i.products)

  return insertConfigure(new Array(number).fill(0).map(genCauHinh.bind({}, danhMucSanPham, rom, ram, mauSac)))
}

async function createPhieuNhap(number) {
  const [nhaCungCap, nhanVien] = await Promise.all([
    getNCC().then(i => i.suppliers),
    getNhanVien().then(i => i.employees)
  ])


}
createPhieuNhap()
// createNhaCungCap(1000).then(console.log)

// createKhachHang(1000).then(console.log)

// createNhanVien(1000).then(console.log);

// createThuocTinh(100).then(console.log)

// createDanhMucSanPham(100)
// createDanhMucSanPham(10000).then(console.log)

// createCauHinh(100000).then(console.log)