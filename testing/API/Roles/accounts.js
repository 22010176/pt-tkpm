const { v4 } = require('uuid')
const { randInt, randStr } = require('../../utitlies');
const { url } = require('..');

const getTaiKhoan = () =>
  fetch(url + '/api/accounts', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(console.log);

const insertTaiKhoan = (accounts) =>
  fetch(url + '/api/accounts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accounts)
  })
    .then(response => response.json())
    .then(console.log);

// insertTaiKhoan([{vaitro: 1, matkhau: "admin", nhanvien: 1}])
// login({mail: "root@mail", password: "admin"})

const updateTaiKhoan = accounts =>
  fetch(url + '/api/accounts', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accounts)
  })
    .then(response => response.json())
    .then(console.log);

const deleteTaiKhoan = accounts =>
  fetch(url + '/api/accounts', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accounts)
  })
    .then(response => response.json())
    .then(console.log);


module.exports = {
  insertTaiKhoan, deleteTaiKhoan, getTaiKhoan, updateTaiKhoan
}


async function login({ mail, password }) {
  return fetch(url + `/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail, password })
  })
    .then(response => response.json())
    .then(console.log);
}



// for (let i = 0; i < 50; ++i) insertTaiKhoan(genTaiKhoan());


