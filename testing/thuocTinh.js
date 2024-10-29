const testGetThuocTinh = thuocTinh =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method: "GET",
  })
  .then(response => response.json())
// .then(data => console.log(data))

const testInsertThuocTinh = (thuocTinh, value) =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value)
  })
  .then(response => response.json())
// .then(data => console.log(data))

const testUpdateThuocTinh = (thuocTinh, value) =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value)
  })
  .then(response => response.json())
// .then(data => console.log(data))

const testDeletethuocTinh = (thuocTinh, value) =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value)
  })
  .then(response => response.json())
// .then(data => console.log(data))

const getAllThuocTinh = async () => {
  const result = await Promise.all([
    testGetThuocTinh('xuatXu'),
    testGetThuocTinh('heDieuHanh'),
    testGetThuocTinh('thuongHieu'),
    testGetThuocTinh('Rom'),
    testGetThuocTinh('Ram'),
    testGetThuocTinh('mauSac'),
  ])

  return result;
}

const insertAllThuocTinh = async () => {
    new Array(100).fill(0).map((_, i) => [
      testInsertThuocTinh('ram', {dungLuongRam: (i + 1) * 2}),
      testInsertThuocTinh('rom', {dungLuongRom: (i + 1) * 2}),
      testInsertThuocTinh('xuatxu', {tenXuatXu: `${i + 1}`}),
      testInsertThuocTinh('hedieuhanh', {tenHeDieuHanh: `${i + 1}`}),
      testInsertThuocTinh('thuonghieu', {tenThuongHieu: `${i + 1}`}),
      testInsertThuocTinh('mausac', {tenMauSac: `${i + 1}`}),
    ])
  }
;
// getAllThuocTinh()
// .then(a => console.log(a[0]))


