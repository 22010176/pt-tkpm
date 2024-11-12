const { v4 } = require('uuid');
const { randDate, randStr } = require('../../utitlies');
const { url } = require('..');

const insertNhanVien = sp => fetch(url + '/api/employees', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
  .then(response => response.json())

const getNhanVien = sp => fetch(url + '/api/employees', {
  method: 'GET', headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())

const updateNhanVien = nhanVien => fetch(url + '/api/employees', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(nhanVien)
})
  .then(response => response.json())

const deleteNhanVien = sp => fetch(url + '/api/employees', {
  method: 'DELETE', headers: {
    'Content-Type': 'application/json'
  }, body: JSON.stringify(sp)
})
  .then(response => response.json())


module.exports = {
  insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien
}