const { emit } = require("../backend/src/models")

// Dang nhap 
const dangNhapTest = (email, password) => fetch("http://localhost:3001/api/tai-khoan/dang-nhap", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `email=${email}&password=${password}`
})
  .then(a => a.json())


// Dang suat
const dangSuatTest = (token, email) => fetch("http://localhost:3001/api/tai-khoan/dang-suat", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": token
  },
  body: `email=${email}`
})
  .then(a => a.json())

// Xoa tai khoan
const xoaTest = (token, email, password) => fetch("http://localhost:3001/api/tai-khoan/xoa-tai-khoan", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": token
  },
  body: `email=${email}&password=${password}`
})
  .then(a => a.json())

dangSuatTest(
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJAYiIsImlkIjo0LCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNzI5Njc2NzUxfQ.OzcRgVDxqWSrhBLSrwTZidAx-aWkgNrI60AD3yKrZBQ',
  "b@b"
).then(console.log)
