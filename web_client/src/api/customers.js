import {checkResponse} from "./authentication";

export async function getCustomers() {
  return fetch('/api/customers', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function insertCustomer(customer, token = "") {
  return fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization": token,
    },
    body: JSON.stringify(customer)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function updateCustomer(customer, token = "") {
  return fetch('/api/customers', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization": token,
    },
    body: JSON.stringify(customer)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function deleteCustomer(customer, token = "") {
  return fetch('/api/customers', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization": token,
    },
    body: JSON.stringify(customer)
  })
  .then(response => response.json())
  .then(checkResponse)
}