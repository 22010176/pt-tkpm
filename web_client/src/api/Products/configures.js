import {checkResponse} from "../authentication";

export async function getConfigures(token = "") {
  return fetch('api/configures', {
    method:  'GET',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function getProductConfigures(product, token = "") {
  return fetch(`/api/configures/${product}`, {
    method:  'GET',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function insertConfigure(config, token = "") {
  return fetch('/api/configures', {
    method:  'POST',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    },
    body:    JSON.stringify(config)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function updateConfigure(config, token = "") {
  return fetch('/api/configures', {
    method:  'PUT',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    },
    body:    JSON.stringify(config)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function deleteConfigure(config, token = "") {
  return fetch('/api/configures', {
    method:  'DELETE',
    headers: {
      'Authorization': token,
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    },
    body:    JSON.stringify(config)
  })
  .then(response => response.json())
  .then(checkResponse)
}