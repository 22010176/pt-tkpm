const getKhachHang = () =>
  fetch('http://localhost:3001/api/suppliers', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(console.log);

const insertKhachHang = (khachHang) =>
  fetch('http://localhost:3001/api/suppliers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);

const updateKhachHang = khachHang =>
  fetch('http://localhost:3001/api/suppliers', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);

const deleteKhachHang = khachHang =>
  fetch('http://localhost:3001/api/suppliers', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);

// getKhachHang()

getKhachHang()