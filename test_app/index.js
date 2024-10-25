// Dang nhap 
const dangNhapTest = (email, password) =>
  fetch("http://localhost:3001/api/tai-khoan/dang-nhap", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `email=${email}&password=${password}`
  })
  .then(a => a.json())


// Dang suat
const dangSuatTest = (token, email) =>
  fetch("http://localhost:3001/api/tai-khoan/dang-suat", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    },
    body: `email=${email}`
  })
  .then(a => a.json())

// Xoa tai khoan
const xoaTest = (token, email, password) =>
  fetch("http://localhost:3001/api/tai-khoan/xoa-tai-khoan", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    },
    body: `email=${email}&password=${password}`
  })
  .then(a => a.json())

const xemDanhSachNhomQuyen = (mail, pass) =>
  dangNhapTest(mail, pass).then(async (res) => {
    const body = res.body
    // console.log(res)
    return fetch("http://localhost:3001/api/quyen-han/danh-sach-nhom-quyen", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": body?.[0]?.token
      },
      body: ""
    })
  }).then(a => a.json())

const xemChucNangTaiKhoan = async (mail, pass) => {
  const res = await dangNhapTest(mail, pass)
  const body = res.body
  const a = await fetch("http://localhost:3001/api/quyen-han/chuc-nang-tai-khoan/", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": body?.[0]?.token
    }
  })
  return await a.json()
}

const xemDanhSachChucNang = async (mail, pass) => {
  const res = await dangNhapTest(mail, pass)
  const body = res.body
  const a = await fetch("http://localhost:3001/api/quyen-han/danh-sach-chuc-nang/", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": body?.[0]?.token
    }
  })
  return await a.json()
}

const xemThongTinTaiKhoan = async function (mail, pass) {
  const res = await dangNhapTest(mail, pass)
  const body = res.body
  const a = await fetch("http://localhost:3001/api/tai-khoan/thong-tin-ca-nhan", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": body?.[0]?.token
    }
  })
  return await a.json()

}


xemDanhSachNhomQuyen("nv@mil", "admin")
.then(console.log)
// xemThongTinTaiKhoan("nv@mail", "admin")
// .then(console.log)

// xemDanhSachChucNang("root", "admin")
//   .then(console.log)
