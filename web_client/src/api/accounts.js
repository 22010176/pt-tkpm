import {checkResponse} from "./authentication";


export async function getAccounts(token = "") {
  return fetch("/api/accounts", {
    method:  "GET",
    headers: {
      "Content-Type": "application/json",
      authorization:  token,
    },

  })
  .then(response => response.json())
  .then(checkResponse)
}


export async function insertAccount(account, token = "") {
  return fetch("/api/accounts", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      authorization:  token,
    },
    body:    JSON.stringify(account)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function updateAccount(account, token = "") {
  return fetch("/api/accounts", {
    method:  "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization:  token,
    },
    body:    JSON.stringify(account)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function deleteAccount(account, token = "") {
  return fetch("/api/accounts", {
    method:  "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization:  token,
    },
    body:    JSON.stringify(account)
  })
  .then(response => response.json())
  .then(checkResponse)
}
