import {checkResponse} from "./authentication";

export async function getOverall(token) {
  return fetch('/api/statistics/overall', {
    method:  'GET',
    headers: {
      authorization: 'Bearer ' + token
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function getSupplierStat(startDate = '1900-1-1', endDate = '3000-01-01', token = '') {
  return fetch(`/api/statistics/suppliers?ngaybatdau=${startDate}&ngayketthuc=${endDate}`, {
    method:  'GET',
    headers: {
      'Authorization': token,
    }
  })
  .then((response) => response.json())
  .then(checkResponse)
}

export async function getCustomerStat(startDate = '1900-1-1', endDate = '3000-01-01', token = '') {
  return fetch(`http://localhost:3001/api/statistics/customers?ngaybatdau=${startDate}&ngayketthuc=${endDate}`, {
    method: 'GET',
  }).then((response) => response.json())
    .then(checkResponse);
}