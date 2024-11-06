import {
  checkResponse,
  getToken
} from "../authentication";

export async function getConfigures() {
  return fetch('api/configures', {
    method:  'GET',
    headers: {
      'authorization': getToken(),
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
      'authorization': getToken(),
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
      'authorization': getToken(),
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
      'authorization': getToken(),
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
      'authorization': getToken(),
      'Content-Type':  'application/json',
      'Accept':        'application/json',
    },
    body:    JSON.stringify(config)
  })
  .then(response => response.json())
  .then(checkResponse)
}