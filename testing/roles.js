const {randInt} = require('./utitlies');
const {v4} = require('uuid');

async function getRoles() {
  return fetch("http://localhost:3001/api/roles", {
    method:  "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(response => response.json());
}

async function insertRole(roles = []) {
  const result = await Promise.all(roles.map(role => fetch("http://localhost:3001/api/roles", {
      method:  "POST",
      headers: {"Content-Type": "application/json",},
      body:    JSON.stringify(role)
    })
    .then(response => response.json())
  ))
  return {roles: result.map(role => role.body).flat()}
}

// getRoles().then(console.log)


insertRole(new Array(20).fill().map(i => {
  const perms = new Array(96).fill().map(i => i + 1)
  const role = {
    tennhomquyen:  v4(),
    tenhienthi:    v4(),
    ghichu:        "",
    danhsachquyen: new Array(10).fill().map((j, k) => ({maquyenhan: k + 1}))
  }
  return role;
})).then(data => console.log(data.roles[0]))