import { createContext } from "react"

export const UserContext = createContext()

export async function authToken() {
  const token = sessionStorage.getItem("accountToken")
  if (!token && document.location.pathname !== "/dang-nhap") document.location.replace("/dang-nhap")

  // Check token if valid
  // const res = await fetch("/api/auth/authToken", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   body: `token=${token}`
  // }).then(a => a.json())
  // console.log(res, token)
  console.log(token)
  if (token && document.location.pathname === "/dang-nhap") document.location.replace("/")
}

export async function authAccount(email, password) {
  return fetch("/api/tai-khoan/dang-nhap", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${email}&password=${password}`
  }).then(a => a.json())
    .then(data => {
      if (!data.body.length) return data

      return data;
    })
}