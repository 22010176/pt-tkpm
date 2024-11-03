async function getImports() {
  return fetch('http://localhost:3001/api/warehouse/import', {
    method:  'GET',
    headers: {
      'Accept': 'application/json',
    }
  })
  .then(res => res.json())
}

getImports().then(console.log)