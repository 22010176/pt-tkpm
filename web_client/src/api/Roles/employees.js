import {checkResponse} from "../authentication";

export async function getEmployees(token = "") {
  return fetch('/api/employees', {
    method:  'GET',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      Authorization:  token
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function getEmployeeNoAccount(token = "") {
  return fetch('/api/employees/no-account', {
    method:  'GET',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
      Authorization:  token
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function insertEmployee(employee, token = "") {
  return fetch('/api/employees', {
    method:  'POST',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      "authorization": token,
    },
    body:    JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function updateEmployee(employee, token = "") {
  return fetch('/api/employees', {
    method:  'PUT',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      "authorization": token,
    },
    body:    JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function deleteEmployee(employee, token = "") {
  return fetch('/api/employees', {
    method:  'DELETE',
    headers: {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      "authorization": token,
    },
    body:    JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(checkResponse)
}