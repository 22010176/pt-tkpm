const {v4} = require('uuid');

async function getItems() {
  return fetch('http://localhost:3001/api/warehouse/items', {
    method:  'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(res => res.json())
}

async function insertItem(imports = [], token = "") {
  return fetch(`http://localhost:3001/api/warehouse/items/`, {
    method:  'POST',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(imports)
  })
  .then(response => response.json())
}

async function updateItem(obj, token = "") {
  return fetch(`http://localhost:3001/api/warehouse/items/`, {
    method:  'PUT',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(obj)
  })
  .then(response => response.json())
}

async function deleteItem(imports = [], token = "") {
  return fetch(`http://localhost:3001/api/warehouse/items/`, {
    method:  'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(imports)
  })
  .then(response => response.json())
}

async function getTinhTrang() {
  return fetch('http://localhost:3001/api/warehouse/item-state', {
    method:  'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(res => res.json())
}

getTinhTrang().then(console.log)

// insertItem([
//   {maimei: v4(), cauhinh: 33, phieunhap: 55, phieuxuat: 30},
//   {maimei: v4(), cauhinh: 33, phieunhap: 55, phieuxuat: 30},
//   {maimei: v4(), cauhinh: 33, phieunhap: 55, phieuxuat: 30},
//   {maimei: v4(), cauhinh: 33, phieunhap: 55, phieuxuat: 30},
//   {maimei: v4(), cauhinh: 33, phieunhap: 55, phieuxuat: 30},
// ]).then(console.log)
// updateItem({
//   maimei: '333', cauhinh: 2332, phieunhap: 366, phieuxuat: 33, masanpham: 2, tinhtrang: 4
// }).then(console.log)

// deleteItem([
//   {masanpham: 2},
//   {masanpham: 3},
// ]).then(console.log)
// getItems().then(console.log)

module.exports = {
  updateItem, deleteItem, insertItem, getItems, getTinhTrang
}