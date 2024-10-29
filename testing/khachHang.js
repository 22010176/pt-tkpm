const getKhachHang = () =>
  fetch('http://localhost:3001/api/customers', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(console.log);

const insertKhachHang = (customer) =>
  fetch('http://localhost:3001/api/customers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
  })
  .then(response => response.json())
  .then(console.log);



const updateKhachHang = khachHang =>
  fetch('http://localhost:3001/api/customers', {
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
  fetch('http://localhost:3001/api/customers', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(khachHang)
  })
  .then(response => response.json())
  .then(console.log);

getKhachHang()

// deleteKhachHang({
//   maKhachHang: 3,
//   tenKhachHang: "te3st1",
//   ngaySinh: "2004-01-22",
//   diaChi: "teest",
//   soDienThoai: Math.random() + "-Dadd",
//   mail: Math.random() + "test@test.com",
// }).then(getAccount);