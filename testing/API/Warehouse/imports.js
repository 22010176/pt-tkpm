async function getImports() {
  return fetch('http://localhost:3001/api/warehouse/import', {
    method:  'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(res => res.json())
}
getImports().then(console.log)
async function insertImport(imports = [], token = "") {
  return fetch(`http://localhost:3001/api/warehouse/import/`, {
    method:  'POST',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(imports)
  })
  .then(response => response.json())
}

async function updateImport(obj, token = "") {
  return fetch(`http://localhost:3001/api/warehouse/import/`, {
    method:  'PUT',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(obj)
  })
  .then(response => response.json())
}

async function deleteImport(imports = [], token = "") {
  return fetch(`http://localhost:3001/api/warehouse/import/`, {
    method:  'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
    },
    body:    JSON.stringify(imports)
  })
  .then(response => response.json())
}

// updateImport({
//   maphieunhap: 44,
//   nhacungcap:  44,
//   nhanviennhap:    420
// }).then(console.log)

// getImports().then(console.log)
// deleteImport([
//   {maphieunhap: 3}
//
// ]).then(console.log)
module.exports = {
  updateImport, deleteImport, insertImport, getImports
}