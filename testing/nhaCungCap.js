const {v4} = require("uuid");

const getNCC = () =>
  fetch('http://localhost:3001/api/suppliers', {
    method:  'GET',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())


const insertNCC = (khachHang) =>
  fetch('http://localhost:3001/api/suppliers', {
    method:  'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body:    JSON.stringify(khachHang)
  })
  .then(response => response.json())


const updateNCC = khachHang =>
  fetch('http://localhost:3001/api/suppliers', {
    method:  'PUT',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body:    JSON.stringify(khachHang)
  })
  .then(response => response.json())


const deleteNCC = khachHang =>
  fetch('http://localhost:3001/api/suppliers', {
    method:  'DELETE',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body:    JSON.stringify(khachHang)
  })
  .then(response => response.json())


function genNCC() {
  return {tenNhaCungCap: v4(), diaChi: v4(), mail: v4(), soDienThoai: v4()}
}

// insertNCC(genNCC())
// insertMultipleNCC(new Array(100).fill().map(genNCC))
module.exports = {
  getNCC, insertNCC, updateNCC, deleteNCC
}

