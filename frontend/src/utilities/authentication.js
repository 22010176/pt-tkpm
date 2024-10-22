export async function authToken(email, password) {
  const token = sessionStorage.getItem("accountToken")

  // fetch("api/auth", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "x-www-form-urlencoded"
  //   },
  //   body: `email=${email}&password=${password}`
  // })
  //   .then(a => a.json())
  //   .then(console.log)
  if (!token && document.location.pathname !== "/dang-nhap") document.location.replace("/dang-nhap")
}

export async function authAccount(email, password) {
  fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
}