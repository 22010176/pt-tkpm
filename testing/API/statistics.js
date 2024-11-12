import { url } from ".";


async function getOverall() {

  return fetch(url + '/api/statistics/overall')
    .then((response) => response.json())
}

async function getSupplierStat(startDate = '2010-1-1', endDate = '2010-01-01') {
  return fetch(url + `/api/statistics/suppliers?ngaybatdau=${startDate}&ngayketthuc=${endDate}`)
    .then((response) => response.json());
}

// getOverall().then(console.log);
async function getCustomerStat(startDate = '2010-1-1', endDate = '2010-01-01') {
  return fetch(url + `/api/statistics/customers`, {
    method: 'GET',
  }).then((response) => response.json());
}
// getCustomerStat(startDate = '2010-1-1', endDate = '2013-01-01') .then(console.log)
// getSupplierStat().then(console.log)