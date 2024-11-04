const {v4} = require('uuid');
const {randDate, randStr} = require('../../utitlies')

const insertNhanVien = sp => fetch('http://localhost:3001/api/employees', {
  method:  'POST',
  headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
.then(response => response.json())

const getNhanVien = sp => fetch('http://localhost:3001/api/employees', {
  method: 'GET', headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())

const updateNhanVien = nhanVien => fetch('http://localhost:3001/api/employees', {
  method:  'PUT',
  headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(nhanVien)
})
.then(response => response.json())

const deleteNhanVien = sp => fetch('http://localhost:3001/api/employees', {
  method:  'DELETE', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
.then(response => response.json())

// insertNhanVien(genNhanVien())
// deleteSanPham({
//   chipXuLy: "test", dungLuongPin: 29, kichThuongManHinh: 33, cameraTruoc: 44, cameraSau: 55, phienBanHeDieuHanh: "dd", thoiGianBaoHanh: 44, hinhAnh: "@!12", xuatXu: 14, heDieuHanh: 9, thuongHieu: 22, maDanhMucSanPham: 7
// })
// deleteNhanVien({maNhanVien: 1})
// getNhanVien()
// for (let i = 0; i < 5000; ++i) insertSanPham(genNhanVien()).then(console.log)
// updateNhanVien({
//     maNhanVien: 1,
//     hoTen: '95c52746-6a64-4a1c-a8e8-ab4418abb75b',
//     gioiTinh: 'Nam',
//     ngaySinh: '2024-02-06',
//     mail: 'bce0eb2f-df30-4a5f-976e-b39a70561f6b',
//     soDienThoai: randStr(10),
//     tenNhomQuyen: null
//   }
// )
// .then(getSanPham)

// insertNhanVien(new Array(100).fill(0).map(genNhanVien))
module.exports = {
  insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien
}