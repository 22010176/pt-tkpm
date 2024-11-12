import { url } from ".."

async function getQuyenHan() {
  return fetch(url + "/api/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(a => a.json())
    .then(console.log)
}
async function getQuyenHanNhomQuyen(roleID) {
  return fetch(url + `/api/roles/${roleID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(a => a.json())
    .then(console.log)
}
// getQuyenHanNhomQuyen(41)


async function insertNhomQuyen(nhomQuyen) {
  return fetch(url + "/api/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nhomQuyen)
  }).then(a => a.json())
    .then(console.log)
}

async function updateNhomQuyen(nhomQuyen) {
  return fetch(url + "/api/roles", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nhomQuyen)
  }).then(a => a.json())
    .then(console.log)
}
async function deleteNhomQuyen(nhomQuyen) {
  return fetch(url + "/api/roles", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nhomQuyen)
  }).then(a => a.json())
    .then(console.log)
}



// getQuyenHan()
//
// deleteNhomQuyen({tenNhomQuyen: "test123", tenHienThi: "test2", ghiChu: "", maNhomQuyen: 7})