import {checkResponse} from "../authentication";

export async function getSuppliers(token = '') {
  return fetch('/api/suppliers', {
    method:  'GET',
    headers: {
      'Content-Type':  'application/json',
      'authorization': token
    }
  })
  .then(res => res.json())
  .then(checkResponse)
}

export async function insertSupplier(supplier, token = '') {
  return fetch('/api/suppliers', {
    method:  'POST',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': token,
    },
    body:    JSON.stringify(supplier)
  })
  .then(res => res.json())
  .then(checkResponse)
}

export async function updateSupplier(supplier, token = '') {
  console.log(supplier)
  return fetch('/api/suppliers', {
    method:  'PUT',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': token,
    },
    body:    JSON.stringify(supplier)
  })
  .then(res => res.json())
  .then(checkResponse)
}

export async function deleteSupplier(supplier, token = '') {
  return fetch('/api/suppliers', {
    method:  'DELETE',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': token,
    },
    body:    JSON.stringify(supplier)
  })
  .then(res => res.json())
  .then(checkResponse)
}