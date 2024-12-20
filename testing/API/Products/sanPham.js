const { v4 } = require('uuid');
const { url } = require('..');

const insertDanhMucSanPham = sp => fetch(url + '/api/products', {
  method: 'POST', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
  .then(response => response.json())


const getDanhMucSanPham = sp => fetch(url + '/api/products', {
  method: 'GET', headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())


const updateDanhMucSanPham = sp => fetch(url + '/api/products', {
  method: 'PUT', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
  .then(response => response.json())

const deleteDanhMucSanPham = sp => fetch(url + '/api/products', {
  method: 'DELETE', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
  .then(response => response.json())

function genSanPham(maDanhMucSanPham = 0) {
  return {
    chipXuLy: v4(), tenDanhMucSanPham: v4(), dungLuongPin: randInt(10, 100), kichThuongManHinh: randInt(10, 100), cameraTruoc: randInt(10, 100), cameraSau: randInt(10, 100), phienBanHeDieuHanh: v4(), thoiGianBaoHanh: randInt(10, 100), hinhAnh: v4(), xuatXu: randInt(1, 100), heDieuHanh: randInt(1, 100), thuongHieu: randInt(1, 100), maDanhMucSanPham
  }
}


module.exports = {
  getDanhMucSanPham, insertDanhMucSanPham, updateDanhMucSanPham, deleteDanhMucSanPham
}
// deleteSanPham({
//   chipXuLy: "test", dungLuongPin: 29, kichThuongManHinh: 33, cameraTruoc: 44, cameraSau: 55, phienBanHeDieuHanh: "dd", thoiGianBaoHanh: 44, hinhAnh: "@!12", xuatXu: 14, heDieuHanh: 9, thuongHieu: 22, maDanhMucSanPham: 7
// })


// for (let i = 0; i < 5000; ++i) insertSanPham(genSanPham()).then(console.log)
// getProducts
// .then(getSanPham)
