
// Dang nhap 

const dangNhapTest = (email, password) => fetch("http://localhost:3001/api/tai-khoan/dang-nhap", {
  // method: "POST",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `email=${email}&password=${password}`
})
  .then(a => a.json())


// Dang suat
const dangSuatTest = (token, email) => fetch("http://localhost:3001/api/tai-khoan/dang-suat", {
  // method: "POST",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": token
  },
  body: `email=${email}`
})
  .then(a => a.json())

const xoaTest = (token, email, password) => fetch("http://localhost:3001/api/tai-khoan/xoa-tai-khoan", {
  // method: "POST",
  // method: "POST",
  method: "DELETE",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": token
  },
  body: `email=${email}&password=${password}`
})
  .then(a => a.json())

xoaTest(
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkBnIiwiaWQiOjcsInBhc3N3b3JkIjoiYWRtaW4yIiwiaWF0IjoxNzI5NjUxNTQ0fQ.Qdvr-dJlXIYpkpdyjuGlaXK6SIymHKCAuD11c9QjVBI',
  "@g",
  "admin2").then(console.log)
// email=admin2@g&password=admin
// dangNhapTest('admin2@g', 'admin')
//   .then(a => {
//     console.log(a)
//     return dangSuatTest(a.body[0].token)
//   })
//   .then(console.log)
// dangSuatTest("d", "")

// dangNhapTest('@g', 'admin2')
//   .then(console.log)
// dangSuatTest(
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkBnIiwiaWQiOjcsInBhc3N3b3JkIjoiYWRtaW4yIiwiaWF0IjoxNzI5NjUxNTQ0fQ.Qdvr-dJlXIYpkpdyjuGlaXK6SIymHKCAuD11c9QjVBI',
//   '@g'
// ).then(console.log)