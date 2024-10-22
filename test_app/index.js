
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
const dangSuatTest = token => fetch("http://localhost:3001/api/tai-khoan/dang-suat", {
  // method: "POST",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `token=${token}`
})
  .then(a => a.json())


// email=admin2@g&password=admin
dangNhapTest('admin2@g', 'admin')
  .then(a => {
    console.log(a)
    return dangSuatTest(a.body[0].token)
  })
  .then(console.log)