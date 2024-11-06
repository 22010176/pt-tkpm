import {
  checkResponse,
  getToken
} from "../authentication";

export async function getEmployees() {
  return fetch('/api/employees', {
    method:  'GET',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': getToken(),
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function getEmployeeNoAccount() {
  return fetch('/api/employees/no-account', {
    method:  'GET',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': getToken(),
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function insertEmployee(employee,) {
  return fetch('/api/employees', {
    method:  'POST',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': getToken(),
    },
    body:    JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function updateEmployee(employee,) {
  return fetch('/api/employees', {
    method:  'PUT',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': getToken(),
    },
    body:    JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function deleteEmployee(employee,) {
  return fetch('/api/employees', {
    method:  'DELETE',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'authorization': getToken(),
    },
    body:    JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(checkResponse)
}