import {checkResponse} from "../authentication";

export async function findExports({makhachhang, manhanvien, tungay, denngay, tusotien, densotien}, token = "") {
  return fetch(`/api/warehouse/export?makhachhang=${makhachhang}&manhanvien=${manhanvien}&tungay=${tungay}&denngay=${denngay}&tusotien=${tusotien}&densotien=${densotien}`, {
    method:  'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
      authorization:  token
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}