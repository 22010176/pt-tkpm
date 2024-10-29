async function getQuyenHan() {
  return fetch("http://localhost:3001/api/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(a => a.json())
  .then(console.log)
}


async function insertNhomQuyen(nhomQuyen) {
  return fetch("http://localhost:3001/api/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nhomQuyen)
  }).then(a => a.json())
  .then(console.log)
}

async function updateNhomQuyen(nhomQuyen) {
  return fetch("http://localhost:3001/api/roles", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nhomQuyen)
  }).then(a => a.json())
  .then(console.log)
}
async function deleteNhomQuyen(nhomQuyen) {
  return fetch("http://localhost:3001/api/roles", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nhomQuyen)
  }).then(a => a.json())
  .then(console.log)
}



getQuyenHan()

deleteNhomQuyen({tenNhomQuyen: "test123", tenHienThi: "test2", ghiChu: "", maNhomQuyen: 7})