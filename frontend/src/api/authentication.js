import { createContext } from "react"

export const UserContext = createContext()

export async function getPermissions(token) {
  const perm = await fetch("/api/quyen-han/chuc-nang-tai-khoan/", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    }
  }).then(data => data.json())

  if (!perm.success) return []
  return perm.body.map(({ maTaiKhoan, maHanhDong, maVaiTro, tenChucNang, tenHanhDong, tenVaiTro }) => ({ maTaiKhoan, maHanhDong, maVaiTro, tenChucNang, tenHanhDong, tenVaiTro }))
}

export async function getUserData(token) {
  console.log(token)
  const account = await fetch("/api/tai-khoan/thong-tin-ca-nhan", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": token
    }
  }).then(data => data.json())

  if (!account.success) return

  return account.body[0]
}

export async function loginAccount(email, password) {
  return fetch("/api/tai-khoan/dang-nhap", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${email}&password=${password}`
  }).then(a => a.json())
}