import {checkResponse, getToken} from "../authentication";

export async function findExports({makhachhang, manhanvien, tungay, denngay, tusotien, densotien}, token = "") {
  return fetch(`/api/warehouse/export?makhachhang=${makhachhang}&manhanvien=${manhanvien}&tungay=${tungay}&denngay=${denngay}&tusotien=${tusotien}&densotien=${densotien}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': sessionStorage.getItem('Authorization')
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function getFreeExport() {
  return fetch(`/api/warehouse/free-export/`, {
    method: 'GET',
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(checkResponse)
}
