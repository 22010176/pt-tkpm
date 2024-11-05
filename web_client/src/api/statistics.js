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
  return fetch(`/api/statistics/customers?ngaybatdau=${startDate}&ngayketthuc=${endDate}`, {
    method: 'GET',
  })
  .then((response) => response.json())
  .then(checkResponse);
}

export async function getYearProfits(token = '') {
  return fetch(`/api/statistics/profits/year`, {
    method:  'GET',
    headers: {
      authorization: token,
    }
  })
  .then((response) => response.json())
  .then(checkResponse);
}

export async function getMonthProfits(nam = 2024, token = '') {
  return fetch(`/api/statistics/profits/month?nam=${nam}`, {
    method:  'GET',
    headers: {
      authorization: token,
    }
  })
  .then((response) => response.json())
  .then(checkResponse);
}

export async function getDayProfit(date = new Date(), token = '') {
  return fetch(`/api/statistics/profits/date?nam=${date.getFullYear()}&thang=${date.getMonth() + 1}`, {
    method:  'GET',
    headers: {
      authorization: token,
    }
  })
  .then((response) => response.json())
  .then(checkResponse);
}

export async function getMaxAndDay(token = '') {
  return fetch(`/api/statistics/date`, {
    method:  'GET',
    headers: {
      authorization: token,
    }
  })
  .then((response) => response.json())
  .then(checkResponse);
}
