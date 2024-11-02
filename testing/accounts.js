const {v4} = require('uuid')
const {randInt, randStr} = require('./utitlies')

const getTaiKhoan = () =>
  fetch('http://localhost:3001/api/accounts', {
    method:  'GET',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(console.log);

const insertTaiKhoan = (accounts) =>
  fetch('http://localhost:3001/api/accounts', {
    method:  'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body:    JSON.stringify(accounts)
  })
  .then(response => response.json())
  .then(console.log);

const updateTaiKhoan = accounts =>
  fetch('http://localhost:3001/api/accounts', {
    method:  'PUT',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body:    JSON.stringify(accounts)
  })
  .then(response => response.json())
  .then(console.log);

const deleteTaiKhoan = accounts =>
  fetch('http://localhost:3001/api/accounts', {
    method:  'DELETE',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json'
    },
    body:    JSON.stringify(accounts)
  })
  .then(response => response.json())
  .then(console.log);


module.exports = {
  insertTaiKhoan, deleteTaiKhoan, getTaiKhoan, updateTaiKhoan
}

// for (let i = 0; i < 50; ++i) insertTaiKhoan(genTaiKhoan());


