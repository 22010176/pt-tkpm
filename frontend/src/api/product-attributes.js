import {checkResponse} from "./authentication";

export async function getProductAttributes(attributes, token) {
  return await fetch(`/api/product-attributes/${attributes}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function insertProductAttributes(attributes, value, token) {
  return fetch(`/api/product-attributes/${attributes}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token
    },
    body: JSON.stringify(value)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function updateProductAttributes(attributes, value, token) {
  return fetch(`/api/product-attributes/${attributes}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: token
    },
    body: JSON.stringify(value)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function deleteProductAttributes(attributes, value, token) {
  return fetch(`/api/product-attributes/${attributes}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: token
    },
    body: JSON.stringify(value)
  }).then(response => response.json())
  .then(checkResponse)
}
