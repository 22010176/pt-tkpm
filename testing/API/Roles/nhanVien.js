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


module.exports = {
  insertNhanVien, deleteNhanVien, getNhanVien, updateNhanVien
}