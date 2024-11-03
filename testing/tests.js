const {v4} = require("uuid");
const {randInt, formatDate, randDate, randStr, genPhoneNum, getRand, randomEmail, randGender, compareArr} = require("./utitlies");

const {insertKhachHang, getKhachHang, deleteKhachHang, updateKhachHang} = require('./API/khachHang')
const {insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien} = require("./API/nhanVien");
const {testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh, getAllThuocTinh, insertAllThuocTinh} = require("./API/thuocTinh");
const {getNCC, insertNCC, updateNCC, deleteNCC} = require("./API/nhaCungCap");
const {getSanPham, insertSanPham, updateSanPham, deleteSanPham} = require("./API/sanPham");
const {getConfigures, insertConfigure, updateConfigure, deleteConfigure,} = require('./API/configures')

const {
        genNhanVien,
        genTaiKhoan,

        genNhaCungCap,
        genKhachHang,

        genXuatXu,
        genHedieuHanh,
        genThuongHieu,
        genMauSac,
        genRam,
        genRom,

        genDanhMucSanPham,
        genCauHinh,
      } = require("./sampleGenerate");

function testAPI(numberRow, genFunction, getFunc, insertFunc, deleteFunc, updateFunc, keys = [], resultDataKey = '') {

  return async function () {
    const testSample = new Array(numberRow).fill().map(genFunction)

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
  5000,
  genNhanVien,
  getNhanVien,
  insertNhanVien,
  deleteNhanVien,
  updateNhanVien,
  ['manhanvien', 'hoten', 'sodienthoai', 'gioitinh', 'mail'],
  'employees'
)

// const taiKhoan = testAPI()

// const nhomQuyenTest = testAPI(
//
// )

// nhanVienTest()
const khachHangTest = testAPI(
  5000,
  genKhachHang,
  getKhachHang,
  insertKhachHang,
  deleteKhachHang,
  updateKhachHang,
  ['makhachhang', 'tenkhachhang', 'diachi', 'sodienthoai', 'mail'],
  'customers'
)

const nhaCungCapTest = testAPI(
  5000,
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

async function sanPhamTest() {
  let thuongHieu = await testGetThuocTinh('thuongHieu');
  if (thuongHieu.attributes.length < 100)
    thuongHieu = await testInsertThuocTinh('thuonghieu', new Array(100).fill(0).map(genThuongHieu));

  let heDieuHanh = await testGetThuocTinh('heDieuHanh');
  if (heDieuHanh.attributes.length < 100)
    heDieuHanh = await testInsertThuocTinh('heDieuHanh', new Array(100).fill(0).map(genHedieuHanh));

  let xuatXu = await testGetThuocTinh('xuatXu');
  if (xuatXu.attributes.length < 100)
    xuatXu = await testInsertThuocTinh('xuatXu', new Array(100).fill(0).map(genXuatXu));

  return testAPI(
    5000,
    genDanhMucSanPham.bind({}, xuatXu.attributes, heDieuHanh.attributes, thuongHieu.attributes,),
    getSanPham,
    insertSanPham,
    deleteSanPham,
    updateSanPham,
    ['madanhmucsanpham', 'tendanhmucsanpham', 'chipxuly', 'dungluongpin', 'kichthuongmanhinh', 'cameratruoc', 'camerasau', 'phienbanhedieuhanh', 'thoigianbaohanh', 'xuatxu', 'hedieuhanh', 'thuonghieu'],
    'products',
  )()
}

// sanPhamTest()
const genThuocTinhFunc = {
  xuatxu:     genXuatXu,
  hedieuhanh: genHedieuHanh,
  thuonghieu: genThuongHieu,
  rom:        genRom,
  ram:        genRam,
  mausac:     genMauSac
}

async function cauHinhTest() {
  const thuocTinh = await getAllThuocTinh()

  await Promise.all(Object.entries(thuocTinh).map(async ([key, value]) =>
      value.attributes.length < 100
      && (thuocTinh[key] = await testInsertThuocTinh(key, new Array(100)
      .fill(0)
      .map(genThuocTinhFunc[key.toLowerCase()])))
  ))

  const {xuatXu, heDieuHanh, thuongHieu, Rom, Ram, mauSac} = thuocTinh

  let danhMucSanPham = await getSanPham()

  if (danhMucSanPham.products.length < 100)
    danhMucSanPham = await insertSanPham(
      new Array(100)
      .fill(0)
      .map(genDanhMucSanPham.bind({}, xuatXu.attributes, heDieuHanh.attributes, thuongHieu.attributes)))


  return testAPI(
    500,
    genCauHinh.bind({}, danhMucSanPham.products, Rom.attributes, Ram.attributes, mauSac.attributes),
    getConfigures,
    insertConfigure,
    deleteConfigure,
    updateConfigure,
    ['gianhap', 'giaxuat', 'danhmucsanpham', 'ram', 'rom', 'mausac'],
    'configures'
  )()
}

const quanLySanPhamTest = [
  {name: "San Pham", func: sanPhamTest},
  {name: "Cau Hinh", func: cauHinhTest},
]

const thuocTinhTest = [
  {name: "Thuong Hieu", func: thuongHieuTest},
  {name: "Xuat Xu", func: xuatXuTest},
  {name: "He Dieu Hanh", func: heDieuHanhTest},
  {name: "Mau Sac", func: mauSacTest},
  {name: "Ram", func: ramTest},
  {name: "Rom", func: romTest},
]

const doiTacTest = [
  {name: "Khach Hang", func: khachHangTest},
  {name: "Nha Cung Cap", func: nhaCungCapTest},
]

async function testAPIGroup(test = []) {
  const result = []
  for (const {name, func} of test) {
    console.log(`${result.join('')}${name} Test`)
    try {
      await func()
      console.clear()
      result.push(`${name} Success\n`)
    } catch (err) {
      result.push(`${name} Fail\n` + err)
    }
  }
  console.clear()
  console.log(result.join("\n"))
}

// nhanVienTest()
// testAPIGroup(thuocTinhTest)
// testAPIGroup(doiTacTest)
// testAPIGroup(quanLySanPhamTest)

