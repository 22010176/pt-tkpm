const {v4} = require('uuid');
const {randDate, randInt} = require('./utitlies');

const getKhachHang = () => fetch('http://localhost:3001/api/customers', {
  method: 'GET', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(console.log);

const insertKhachHang = (customer) => fetch('http://localhost:3001/api/customers', {
  method: 'POST', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(customer)
})
.then(response => response.json())
.then(console.log);

const insertMultipleKhachHang = (customer) => fetch('http://localhost:3001/api/customers/add-multiple', {
  method: 'POST', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(customer)
})
.then(response => response.json())
.then(console.log);

insertMultipleKhachHang(new Array(100).fill().map(genKhachHang))

const updateKhachHang = khachHang => fetch('http://localhost:3001/api/customers', {
  method: 'PUT', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(khachHang)
})
.then(response => response.json())
.then(console.log);

const deleteKhachHang = khachHang => fetch('http://localhost:3001/api/customers', {
  method: 'DELETE', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(khachHang)
})
.then(response => response.json())
.then(console.log);

function genKhachHang() {
  return {
    tenKhachHang: v4(), ngaySinh: randDate(), diaChi: v4(), soDienThoai: v4(), mail: v4()
  }
}

// deleteKhachHang({
//   maKhachHang: 3,
//   tenKhachHang: "te3st1",
//   ngaySinh: "2004-01-22",
//   diaChi: "teest",
//   soDienThoai: Math.random() + "-Dadd",
//   mail: Math.random() + "test@test.com",
// }).then(getAccount);