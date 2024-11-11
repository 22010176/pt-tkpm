import {checkResponse, getToken} from "./authentication";

export async function getOverall() {
  return fetch('/api/statistics/overall', {
    method: 'GET',
    headers: {
      'authorization': getToken()
    }
  })
    .then(response => response.json())
    .then(checkResponse)
}

export async function getSupplierStat(startDate = '1900-1-1', endDate = '3000-01-01', token = '') {
  return fetch(`/api/statistics/suppliers?ngaybatdau=${startDate}&ngayketthuc=${endDate}`, {
    method: 'GET',
    headers: {
      'authorization': getToken()
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
    method: 'GET',
    headers: {
      'authorization': getToken()
    }
  })
    .then((response) => response.json())
    .then(checkResponse);
}

export async function getMonthProfits(nam = 2024, token = '') {
  return fetch(`/api/statistics/profits/month?nam=${nam}`, {
    method: 'GET',
    headers: {
      'authorization': getToken()
    }
  })
    .then((response) => response.json())
    .then(checkResponse);
}

export async function getDayProfit(date = new Date(), token = '') {
  return fetch(`/api/statistics/profits/date?nam=${date.getFullYear()}&thang=${date.getMonth() + 1}`, {
    method: 'GET',
    headers: {
      'authorization': getToken()
    }
  })
    .then((response) => response.json())
    .then(checkResponse);
}

export async function getMaxAndDay(token = '') {
  return fetch(`/api/statistics/date`, {
    method: 'GET',
    headers: {
      'authorization': getToken()
    }
  })
    .then((response) => response.json())
    .then(checkResponse);
}

export async function getTonKho(token = '',
                                ngaybatdau = "2000-01-01",
                                ngayketthuc = new Date().toISOString().split('T')[0]
) {
  return fetch(`/api/statistics/getTonKho?ngaybatdau=${ngaybatdau}&ngayketthuc=${ngayketthuc}`, {
    method: 'GET',
    headers: {
      'authorization': getToken()
    }
  })
    .then((response) => response.json())
    .then(checkResponse);
}
