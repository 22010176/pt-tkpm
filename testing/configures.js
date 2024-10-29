const {randInt} = require("./utitlies");

async function getConfigures() {
  return fetch('http://localhost:3001/api/configures', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
}

async function insertConfigure({giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac}) {
  return fetch('http://localhost:3001/api/configures', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({giaNhap, giaXuat, danhMucSanPham, ram, rom, mauSac})
  }).then(response => response.json());
}

async function insertMulipleConfigure(data = []) {
  return fetch('http://localhost:3001/api/configures/add-multiple', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

function genConfigure() {
  return {
    giaNhap: randInt(1, 1000000),
    giaXuat: randInt(1, 1000000),
    danhMucSanPham: randInt(1, 6705),
    ram: randInt(1, 100),
    rom: randInt(1, 100),
    mauSac: randInt(1, 100)
  }
}

insertMulipleConfigure(new Array(1000000).fill(0).map(genConfigure))
.then(console.log)


getConfigures().then(console.log);