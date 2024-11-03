async function getExports() {
  return fetch('http://localhost:3001/api/warehouse/export', {
    method:  'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(res => res.json())
}

async function insertExport(imports = [], token = "") {
  return fetch(`http://localhost:3001/api/warehouse/export/`, {
    method:  'POST',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(imports)
  })
  .then(response => response.json())
}

async function updateExport(obj, token = "") {
  return fetch(`http://localhost:3001/api/warehouse/export/`, {
    method:  'PUT',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(obj)
  })
  .then(response => response.json())
}

async function deleteExport(imports = [], token = "") {
  return fetch(`http://localhost:3001/api/warehouse/export/`, {
    method:  'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(imports)
  })
  .then(response => response.json())
}

// insertExport([
//   {nhanvienxuat: 34, khachhang: 33},
//   {nhanvienxuat: 34, khachhang: 33},
//   {nhanvienxuat: 34, khachhang: 33},
//   {nhanvienxuat: 34, khachhang: 33},
//   {nhanvienxuat: 34, khachhang: 33},
// ]).then(console.log)
// updateExport({
//   maphieuxuat:  6,
//   khachhang:    44,
//   nhanvienxuat: 420
// }).then(console.log)

// getExports().then(console.log)

module.exports = {
  updateExport, deleteExport, insertExport, getExports
}