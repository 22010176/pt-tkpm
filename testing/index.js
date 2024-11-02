const {v4, MAX} = require("uuid");
const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender} = require("./utitlies");

const {insertKhachHang, getKhachHang, deleteKhachHang, updateKhachHang} = require('./khachHang')
const {insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien} = require("./nhanVien");
const {testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh} = require("./thuocTinh");
const {getNCC, insertNCC, updateNCC, deleteNCC} = require("./nhaCungCap");

function genNhanVien() {
  return {
    hoten: v4(), ngaysinh: randDate(new Date(1950), new Date()), sodienthoai: genPhoneNum(), gioitinh: randGender(), mail: randomEmail(),
  }
}

function genNhaCungCap() {
  return {tennhacungcap: v4(), diachi: v4(), mail: randomEmail(), sodienthoai: genPhoneNum(),}
}

function genKhachHang() {
  return {
    tenkhachhang: v4(),
    ngaysinh:     randDate(new Date(1950), new Date()),
    diachi:       v4(),
    sodienthoai:  genPhoneNum(),
    mail:         randomEmail(),
  }
}

function genXuatXu() {
  return {tenxuatxu: v4()}
}

function genHedieuHanh() {
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
    matkhau: v4(), nhanvien: nhanVien[randInt(0, nhanVien.length - 1)].manhanvien, vaitro: vaiTro[randInt(0, vaiTro.length - 1)].manhomquyen,
  }
}

function genDanhMucSanPham(xuatXu = [], heDieuHanh = [], thuongHieu) {
  return {
    tendanhmucsanpham: v4(), chipxuly: v4(), dungluongpin: randInt(0, 10000), kichthuongmanhinh: randInt(0, 10000), cameratruoc: randInt(0, 10000), camerasau: randInt(0, 10000), phienbanhedieuhanh: v4(), thoigianbaohanh: randInt(0, 100), xuatxu: getRand(xuatXu).maxuatxu, hedieuhanh: getRand(heDieuHanh).mahedieuhanh, thuonghieu: getRand(thuongHieu).mathuonghieu
  }
}

function genCauHinh(danhMucSanPham = [], rom = [], ram = [], mauSac = []) {
  return {
    gianhap: randInt(0, 100000), giaxuat: randInt(0, 100000), danhmucsanpham: getRand(danhMucSanPham).madanhmucsanpham, ram: getRand(ram).maram, rom: getRand(rom).marom, mausac: getRand(mauSac).mamausac
  }
}

function genPhieuNhapKho(nhaCungCap = [], nhanVien = []) {
  return {
    thoigiannhap: randDate(new Date(1900), new Date()), nhacungcap: getRand(nhaCungCap).manhacungcap, nhanviennhap: getRand(nhanVien).manhanvien
  }
}

function genPhieuXuatKho(khachHang = [], nhanVien = []) {
  return {
    thoigianxuat: randDate(new Date(1900), new Date()), khachhang: getRand(khachHang).makhachhang, nhanvienxuat: getRand(nhanVien).manhanvien
  }
}

function genSanPham(cauHinh = [], phieuNhap = [], phieuXuat = [], tinhTrang = []) {
  return {
    maIMEI: v4(), cauhinh: getRand(cauHinh).macauhinh, phieunhap: getRand(phieuNhap).maphieunhapkho, phieuxuat: getRand(phieuXuat).maphieuxuatkho, tinhtrang: getRand(tinhTrang).matinhtrang
  }
}

// getNhanVien()

// insertNhanVien([
//   genNhanVien(),
//   genNhanVien(),
// ])

function compareArr(arr1 = [], arr2 = [], cmp) {
  if (typeof cmp !== 'function') return false;
  return arr1.length === arr2.length && arr1.every(i => arr2.some(j => cmp(i, j)))
}

function testAPI(numberRow, genFunction, getFunc, insertFunc, deleteFunc, updateFunc, keys = [], resultDataKey = '', ...genParams) {

  return async function () {
    const testSample = new Array(numberRow).fill().map(genFunction.bind({}, ...genParams))

    const primaryKey = keys[0]
    const dataCol = keys.slice(1)

    // Insert
    console.log("Testing insert")
    const insertResult = await insertFunc(testSample)
    // console.log(insertResult[resultDataKey])

    if (!compareArr(
      insertResult[resultDataKey], testSample,
      (i, j) => dataCol.every(key => {
        const result = i[key] === j[key]
        // console.log(i[key], j[key], result)
        return result;
      })
    )) throw "Insert error"
    console.log("Insert Success\n")

    // Delete
    console.log("Testing delete")
    await deleteFunc(insertResult[resultDataKey])
    let query = await getFunc()
    if (!query.success) throw "Delete error"
    if (insertResult[resultDataKey]
    .some(i => {
      const result = query[resultDataKey].some(j => i[primaryKey] === j[primaryKey])
      return result
    })
    ) throw deleteFunc.name + " error"
    console.log("Delete success\n")

    // Update
    console.log("Testing update")
    const temp = await insertFunc([genFunction()])
    const newEmp = genFunction()
    newEmp[primaryKey] = temp[resultDataKey][0][primaryKey]

    query = await getFunc()
    if (!query[resultDataKey]
    .some(i => (i, j) => keys.every(key => i[key] === j[key]))) throw 'Update Error'
    console.log("Update success\n")

    console.log("Clean up")
    await deleteFunc([newEmp])
  }
}

const nhanVienTest = testAPI(
  2000,
  genNhanVien,
  getNhanVien,
  insertNhanVien,
  deleteNhanVien,
  updateNhanVien,
  ['manhanvien', 'hoten', 'sodienthoai', 'gioitinh', 'mail'],
  'employees'
)
// nhanVienTest()
const khachHangTest = testAPI(
  2000,
  genKhachHang,
  getKhachHang,
  insertKhachHang,
  deleteKhachHang,
  updateKhachHang,
  ['makhachhang', 'tenkhachhang', 'diachi', 'sodienthoai', 'mail'],
  'customers'
)

const nhaCungCapTest = testAPI(
  1000,
  genNhaCungCap,
  getNCC,
  insertNCC,
  deleteNCC,
  updateNCC,
  ['manhacungcap', 'tennhacungcap', 'diachi', 'mail', 'sodienthoai'],
  'suppliers'
)

const thuongHieuTest = testAPI(
  10000,
  genThuongHieu,
  testGetThuocTinh.bind({}, 'thuonghieu'),
  testInsertThuocTinh.bind({}, 'thuonghieu'),
  testDeletethuocTinh.bind({}, 'thuonghieu'),
  testUpdateThuocTinh.bind({}, 'thuonghieu'),
  ['mathuonghieu', 'tenthuonghieu'],
  'attributes'
)
const mauSacTest = testAPI(
  10000,
  genMauSac,
  testGetThuocTinh.bind({}, 'mausac'),
  testInsertThuocTinh.bind({}, 'mausac'),
  testDeletethuocTinh.bind({}, 'mausac'),
  testUpdateThuocTinh.bind({}, 'mausac'),
  ['mamausac', 'tenmausac'],
  'attributes'
)

const xuatXuTest = testAPI(
  10000,
  genXuatXu,
  testGetThuocTinh.bind({}, 'xuatxu'),
  testInsertThuocTinh.bind({}, 'xuatxu'),
  testDeletethuocTinh.bind({}, 'xuatxu'),
  testUpdateThuocTinh.bind({}, 'xuatxu'),
  ['maxuatxu', 'tenxuatxu'],
  'attributes'
)

const heDieuHanhTest = testAPI(
  10000,
  genHedieuHanh,
  testGetThuocTinh.bind({}, 'hedieuhanh'),
  testInsertThuocTinh.bind({}, 'hedieuhanh'),
  testDeletethuocTinh.bind({}, 'hedieuhanh'),
  testUpdateThuocTinh.bind({}, 'hedieuhanh'),
  ['mahedieuhanh', 'tenhedieuhanh'],
  'attributes'
)

const ramTest = testAPI(
  10000,
  genRam,
  testGetThuocTinh.bind({}, 'ram'),
  testInsertThuocTinh.bind({}, 'ram'),
  testDeletethuocTinh.bind({}, 'ram'),
  testUpdateThuocTinh.bind({}, 'ram'),
  ['maram', 'dungluongram'],
  'attributes'
)

const romTest = testAPI(
  10000,
  genRom,
  testGetThuocTinh.bind({}, 'rom'),
  testInsertThuocTinh.bind({}, 'rom'),
  testDeletethuocTinh.bind({}, 'rom'),
  testUpdateThuocTinh.bind({}, 'rom'),
  ['marom', 'dungluongrom'],
  'attributes'
)

// ramTest()
// testProductAttributes()

async function testProductAttributes() {
  const result = []

  // Thuong Hieu
  console.log("Thuong Hieu Test")
  try {
    console.clear()
    await thuongHieuTest()
    result.push("Thuong Hieu Success\n")
  } catch (err) {
    result.push("Thuong Hieu Fail\n" + err)
  }

  // Xuat Xu
  console.log("Xuat Xu Test")
  try {
    console.clear()
    await xuatXuTest()
    result.push("Xuat Xu Success\n")
  } catch (err) {
    result.push("Xuat Xu Fail\n" + err)
  }

  // He Dieu Hanh
  console.log("He Dieu Hanh Test")
  try {
    console.clear()
    await heDieuHanhTest()
    result.push("He Dieu Hanh Success\n")
  } catch (err) {
    result.push("He Dieu Hanh Fail\n" + err)
  }

  // Mau Sac
  console.log("Mau Sac Test")
  try {
    console.clear()
    await heDieuHanhTest()
    result.push("Mau Sac Success\n")
  } catch (err) {
    result.push("Mau Sac Fail\n" + err)
  }

  // Rom
  console.log("Rom Test")
  try {
    console.clear()
    await romTest()
    result.push("Rom Success\n")
  } catch (err) {
    result.push("Rom Fail\n" + err)
  }

  // Ram
  console.log("Ram Test")
  try {
    console.clear()
    await ramTest()
    result.push("Ram Success\n")
  } catch (err) {
    result.push("Ram Fail\n" + err)
  }

  console.clear()
  console.log(result.join("\n"))
}

