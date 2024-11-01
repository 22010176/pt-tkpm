const {v4} = require("uuid");
const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender} = require("./utitlies");

const {insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien} = require("./nhanVien");
const {
        testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh
      } = require("./thuocTinh");

function genNhanVien() {
  return {
    hoten: v4(), ngaysinh: randDate(new Date(1950), new Date()), sodienthoai: genPhoneNum(), gioitinh: randGender(), mail: randomEmail(),
  }
}

function genNhaCungCap() {
  return {
    tennhacungcap: v4(), diachi: v4(), mail: randomEmail(), sodienthoai: genPhoneNum(),
  }
}

function genKhachHang() {
  return {tenkhachhang: v4(), ngaysinh: randDate(new Date(1950), new Date()), diachi: v4(), sodienthoai: genPhoneNum(), mail: randomEmail(),}
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
  return {dungluongram: randInt(1, 999999999)}
}

function genRom() {
  return {dungluongrom: randInt(0, 999999999)}
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

function testAPI(genFunction, getFunc, insertFunc, deleteFunc, updateFunc, keys = [], resultDataKey = '', ...genParams) {
  const numberRow = 5

  return async function () {
    const testSample = new Array(numberRow).fill().map(genFunction.bind({}, ...genParams))
    console.log(testSample)
    const primaryKey = keys[0]
    const dataCol = keys.slice(1)
    try {
      // Insert
      console.log("Testing insert")
      const insertResult = await insertFunc(testSample)
      console.log(insertResult)
      if (!compareArr(
        insertResult[resultDataKey],
        testSample,
        (i, j) => dataCol.every(key => i[key] === j[key]) // remove first primary key column
      )) throw "Insert error"
      console.log("Insert Success\n")

      // Delete
      console.log("Testing delete")
      await deleteFunc(insertResult[resultDataKey])
      let query = await getFunc()
      if (!query.success) throw "Delete error"
      if (insertResult[resultDataKey].some(i => query[resultDataKey].some(j => i[primaryKey] === j[primaryKey]))) throw deleteFunc.name + " error"
      console.log("Delete success\n")

      // Update
      console.log("Testing update")
      const temp = await insertFunc([genFunction()])
      const newEmp = genFunction()
      newEmp[primaryKey] = temp[resultDataKey][0][primaryKey]

      const result = await updateFunc(newEmp)

      query = await getFunc()
      if (!query[resultDataKey]
      .some(i => (i, j) => keys.every(key => i[key] === j[key]))) throw 'Update Error'
      console.log("Update success\n")

      console.log("Clean up")
      await deleteFunc([newEmp])

    } catch (e) {
      console.error(e)
    }
  }

}

const nhanVienTest = testAPI(
  genNhanVien,
  getNhanVien,
  insertNhanVien,
  deleteNhanVien,
  updateNhanVien,
  ['manhanvien', 'hoten', 'sodienthoai', 'gioitinh', 'mail'],
  'employees'
)

const ramTest = testAPI(
  genThuongHieu,
  testGetThuocTinh.bind({}, 'thuonghieu'),
  testInsertThuocTinh.bind({}, 'thuonghieu'),
  testDeletethuocTinh.bind({}, 'thuonghieu'),
  testUpdateThuocTinh.bind({}, 'thuonghieu'),
  ['mathuonghieu', 'tenthuonghieu'],
  'attributes'
)
// nhanVienTest()
ramTest()
// async function testNhanVien(num = 3000) {
//   if (!num) return
//   const testSample = new Array(num).fill(0).map(genNhanVien)
//
//   try {
//     // Insert test
//     let insertResult = await insertNhanVien(testSample)
//     if (!compareArr(
//       insertResult.employees,
//       testSample,
//       (i, j) => i.hoten === j.hoten && i.mail === j.mail && i.sodienthoai === j.sodienthoai && i.gioitinh === j.gioitinh)) throw "Insert NhanVien Error"
//
//     // Delete test
//     await deleteNhanVien(insertResult.employees)
//     let query = await getNhanVien()
//     if (!query.success) throw "Delete: Get NhanVien Error"
//     if (insertResult.employees.some(i => query.employees.some(j => i.manhanvien === j.manhanvien))) throw "Delete NhanVien Error"
//
//     // Update test
//     const temp = await insertNhanVien([genNhanVien()])
//     const newEmp = genNhanVien()
//     newEmp.manhanvien = temp.employees[0].manhanvien
//
//     const result = await updateNhanVien(newEmp)
//
//     query = await getNhanVien()
//     if (!query.employees
//               .some(i => i.manhanvien === newEmp.manhanvien && i.hoten === newEmp.hoten && i.mail === newEmp.mail && i.gioitinh === newEmp.gioitinh && i.sodienthoai === newEmp.sodienthoai)) throw 'Update NhanVien Error'
//
//
//     console.log("Success NhanVien API")
//   } catch (e) {
//     console.error(e)
//   }
// }

// testNhanVien()

function genRandomSample() {

}