import {checkResponse} from "./authentication";

export function getRoles(token = "") {
  return fetch("/api/roles", {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function getPermissionData(token = "") {
  return fetch("/api/roles/permissions", {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export function getRolePermissions(role, token = "") {
  return fetch(`/api/roles/${role}`, {
    method: "GET",
    headers: {
      authorization: token,
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

