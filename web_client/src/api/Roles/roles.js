import {checkResponse} from "../authentication";

export function getRoles(token = "") {
  return fetch("/api/roles", {
    method:  "GET",
    headers: {
      Authorization:  token,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function insertRole(role, token = "") {
  return fetch("/api/roles", {
    method:  "POST",
    headers: {
      Authorization:  token,
      "Content-Type": "application/json"
    },
    body:    JSON.stringify(role)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function updateRole(role, token = "") {
  return fetch("/api/roles", {
    method:  "PUT",
    headers: {
      Authorization:  token,
      "Content-Type": "application/json"
    },
    body:    JSON.stringify(role)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function deleteRole(role, token = "") {
  return fetch("/api/roles", {
    method:  "DELETE",
    headers: {
      Authorization:  token,
      "Content-Type": "application/json"
    },
    body:    JSON.stringify(role)
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function getPermissionData(token = "") {
  return fetch("/api/roles/permissions", {
    method:  "GET",
    headers: {
      Authorization:  token,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function getRolePermissions(role, token = "") {
  return fetch(`/api/roles/${role}`, {
    method:  "GET",
    headers: {
      authorization: token,
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

