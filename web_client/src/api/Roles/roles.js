import {checkResponse} from "../authentication";

export function getRoles() {
  return fetch("/api/roles", {
    method:  "GET",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
      "Content-Type":  "application/json"
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function insertRole(role,) {
  return fetch("/api/roles", {
    method:  "POST",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
      "Content-Type":  "application/json"
    },
    body:    JSON.stringify(role)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function updateRole(role,) {
  return fetch("/api/roles", {
    method:  "PUT",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
      "Content-Type":  "application/json"
    },
    body:    JSON.stringify(role)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function deleteRole(role,) {
  return fetch("/api/roles", {
    method:  "DELETE",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
      "Content-Type":  "application/json"
    },
    body:    JSON.stringify(role)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function getPermissionData() {
  return fetch("/api/roles/permissions", {
    method:  "GET",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
      "Content-Type":  "application/json"
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function getRolePermissions(role,) {
  return fetch(`/api/roles/${role}`, {
    method:  "GET",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function insertPermission(data) {
  return fetch(`/api/roles/update-permission`, {
    method:  "POST",
    headers: {
      'authorization': sessionStorage.getItem('Authorization'),
      "Content-Type":  "application/json"
    },
    body:    JSON.stringify(data)
  })
  .then(response => response.json())
  .then(checkResponse)
}