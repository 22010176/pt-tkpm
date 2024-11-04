async function getOverall() {
  return fetch('http://localhost:3001/api/statistics/overall')
  .then((response) => response.json());
}

async function getSupplierStat(startDate = '2010-1-1', endDate= '2010-01-01') {
  return fetch(`http://localhost:3001/api/statistics/suppliers?ngaybatdau=${startDate}&ngayketthuc=${endDate}`)
  .then((response) => response.json());
}

// getOverall().then(console.log);

getSupplierStat().then(console.log)