import {checkResponse} from "../authentication";

export async function findImports({manhacungcap, manhanvien, tungay, denngay, tusotien, densotien}, token = "") {
  return fetch(`/api/warehouse/import?manhacungcap=${manhacungcap}&manhanvien=${manhanvien}&tungay=${tungay}&denngay=${denngay}&tusotien=${tusotien}&densotien=${densotien}`, {
    method:  'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
      authorization:  ""
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function findImportProducts({maphieunhap}, token) {
  return fetch(`/api/warehouse/import/${maphieunhap}`, {
    method:  "GET",
    headers: {
      "Content-Type": "application/json",
      authorization:  token
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}