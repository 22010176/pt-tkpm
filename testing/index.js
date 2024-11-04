const {
        genNhanVien, genTaiKhoan,

        genNhaCungCap, genKhachHang,

        genXuatXu, genHeDieuHanh, genThuongHieu, genMauSac, genRam, genRom,

        genDanhMucSanPham, genCauHinh,

        genSanPham, genPhieuNhapKho, genPhieuXuatKho
      } = require('./sampleGenerate');

const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender, compareArr} = require("./utitlies");

const {insertKhachHang, getKhachHang, deleteKhachHang, updateKhachHang} = require('./API/Partners/khachHang')
const {insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien} = require("./API/Roles/nhanVien");
const {testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh, getAllThuocTinh, insertAllThuocTinh} = require("./API/Products/thuocTinh");
const {getNCC, insertNCC, updateNCC, deleteNCC} = require("./API/Partners/nhaCungCap");
const {getDanhMucSanPham, insertDanhMucSanPham, updateDanhMucSanPham, deleteDanhMucSanPham} = require("./API/Products/sanPham");
const {getConfigures, insertConfigure, updateConfigure, deleteConfigure,} = require('./API/Products/configures')
const {updateImport, deleteImport, insertImport, getImports} = require('./API/Warehouse/imports')

const {updateExport, deleteExport, insertExport, getExports} = require('./API/Warehouse/exports')
const {updateItem, deleteItem, insertItem, getItems, getTinhTrang} = require('./API/Warehouse/items')

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
  return insertAllThuocTinh(genRam, genRom, genXuatXu, genHeDieuHanh, genThuongHieu, genMauSac, number)
}

async function createDanhMucSanPham(number) {
  const [xuatXu, heDieuHanh, thuongHieu] = await Promise.all([
    testGetThuocTinh("xuatXu").then(i => i.attributes), testGetThuocTinh("heDieuHanh").then(i => i.attributes), testGetThuocTinh("thuongHieu").then(i => i.attributes),
  ])
  // console.log(xuatXu, heDieuHanh, thuongHieu)

  // console.log(xuatXu)
  return insertDanhMucSanPham(new Array(number)
  .fill(0)
  .map(genDanhMucSanPham.bind({}, xuatXu, heDieuHanh, thuongHieu)))
}


async function createCauHinh(number) {
  const [ram, rom, mauSac] = await Promise.all([
    testGetThuocTinh("ram").then(i => i.attributes), testGetThuocTinh("rom").then(i => i.attributes), testGetThuocTinh("mauSac").then(i => i.attributes),
  ])
  const danhMucSanPham = await getDanhMucSanPham().then(i => i.products)

  return insertConfigure(new Array(number).fill(0).map(genCauHinh.bind({}, danhMucSanPham, rom, ram, mauSac)))
}

async function createPhieuNhap(number) {
  const [nhaCungCap, nhanVien] = await Promise.all([
    getNCC().then(i => i.suppliers), getNhanVien().then(i => i.employees)
  ])

  return insertImport(new Array(number).fill(0).map(genPhieuNhapKho.bind({}, nhaCungCap, nhanVien)))
}

async function createPhieuXuat(number) {
  const [khachHang, nhanVien] = await Promise.all([
    getKhachHang().then(i => i.customers), getNhanVien().then(i => i.employees)
  ])
  return insertExport(new Array(number).fill(0).map(genPhieuXuatKho.bind({}, khachHang, nhanVien)))
}

async function createItems(number) {
  const [
          cauHinh,
          nhapKho,
          xuatKho,
          tinhTrang
        ] = await Promise.all([
    getConfigures().then(i => i.configures),
    getImports().then(i => i.entries),
    getExports().then(i => i.entries),
    getTinhTrang().then(i => i.itemState)
  ])

  return insertItem(new Array(number).fill(0).map(genSanPham.bind({}, cauHinh, nhapKho, xuatKho, tinhTrang)))
}

async function genSampleData(number) {
  console.log("Create KhachHang, NhaCungCap, NhanVien, ThuocTinhn")
  console.log(await Promise.all([
    createKhachHang(number),
    createNhaCungCap(number),
    createNhanVien(number),
    createThuocTinh(number)
  ]).then(a => a.map(i => i.success)))

  console.log("Create DanhMucSanPham, PhieuNhap, PhieuXuat")
  console.log(await Promise.all([
    createDanhMucSanPham(number),
    createPhieuNhap(number * 10),
    createPhieuXuat(number * 10),
  ]).then(a => a.map(i => i.success)))

  console.log("Create Items")
  await createCauHinh(number * 100).then(A => console.log(A.success))
  await createItems(number * 100).then(A => console.log(A.success))
}

// createItems(50).then(console.log)
genSampleData(700)
// createItems()
// createPhieuXuat(100).then(console.log)

// createPhieuNhap()
// createNhaCungCap(1000).then(console.log)

// createKhachHang(1000).then(console.log)
//
// createNhanVien(1000).then(console.log);
// createPhieuNhap(1000).then(console.log)

// createThuocTinh(1000).then(console.log)
// createPhieuXuat(1000).then(console.log)

// createDanhMucSanPham(10000).then(console.log)

// createCauHinh(100000).then(console.log)