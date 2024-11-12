const { v4 } = require('uuid');
const { randDate, randInt } = require('../../utitlies');
const { url } = require('..');


const getKhachHang = () => fetch(url + '/api/customers', {
  method: 'GET', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }
})
  .then(response => response.json())

const insertKhachHang = (customer) => fetch(url + '/api/customers', {
  method: 'POST', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, body: JSON.stringify(customer)
})
  .then(response => response.json())

const insertMultipleKhachHang = (customer) => fetch(url + '/api/customers/add-multiple', {
  method: 'POST', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(customer)
})
  .then(response => response.json())

// insertMultipleKhachHang(new Array(100).fill().map(genKhachHang))

const updateKhachHang = khachHang => fetch(url + '/api/customers', {
  method: 'PUT', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(khachHang)
})
  .then(response => response.json())

const deleteKhachHang = khachHang => fetch(url + '/api/customers', {
  method: 'DELETE', headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  }, body: JSON.stringify(khachHang)
})
  .then(response => response.json())

function genKhachHang() {
  return {
    tenKhachHang: v4(), ngaySinh: randDate(), diaChi: v4(), soDienThoai: v4(), mail: v4()
  }
}

module.exports = {
  insertKhachHang, getKhachHang, deleteKhachHang, updateKhachHang
}

