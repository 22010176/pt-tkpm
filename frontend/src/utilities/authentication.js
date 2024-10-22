

export async function authToken() {
  const token = sessionStorage.getItem("accountToken")
  const res = await fetch("/auth/authToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `token=${token}`
  }).then(a => a.json())
  console.log(res, token)
  // if (res && document.location.pathname === "/dang-nhap") document.location.replace("/")
  // if (!token && document.location.pathname !== "/dang-nhap") document.location.replace("/dang-nhap")
}

export async function authAccount(email, password) {
  return fetch("/auth/authToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${email}&password=${password}`
  }).then(a => a.json())
    .then(data => {
      const token = data.body;
      console.log(data)
      sessionStorage.setItem("accountToken", data.token)
      return token;
    })
}