const {v4} = require('uuid')
const {randInt, randStr} = require('./utitlies')

const getTaiKhoan = () =>
  fetch('http://localhost:3001/api/accounts', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(console.log);

const insertTaiKhoan = (khachHang) =>
  fetch('http://localhost:3001/api/accounts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);

const updateTaiKhoan = khachHang =>
  fetch('http://localhost:3001/api/accounts', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);

const deleteTaiKhoan = khachHang =>
  fetch('http://localhost:3001/api/accounts', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);


function genTaiKhoan() {
  return {matkhau: v4(), vaitro: randInt(1, 3), nhanvien: randInt(1, 100)}
}

for (let i = 0; i < 50; ++i) insertTaiKhoan(genTaiKhoan());
