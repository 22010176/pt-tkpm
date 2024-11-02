const testGetThuocTinh = thuocTinh =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method: "GET",
  })
  .then(response => response.json())

const testInsertThuocTinh = (thuocTinh, value) =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:    JSON.stringify(value)
  })
  .then(response => response.json())

const testUpdateThuocTinh = (thuocTinh, value) =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method:  "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body:    JSON.stringify(value)
  })
  .then(response => response.json())

const testDeletethuocTinh = (thuocTinh, value) =>
  fetch(`http://localhost:3001/api/product-attributes/${thuocTinh}`, {
    method:  "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body:    JSON.stringify(value)
  })
  .then(response => response.json())

const getAllThuocTinh = async () => {
  const [xuatXu, heDieuHanh, thuongHieu, Rom, Ram, mauSac] = await Promise.all([
    testGetThuocTinh('xuatXu'),
    testGetThuocTinh('heDieuHanh'),
    testGetThuocTinh('thuongHieu'),
    testGetThuocTinh('Rom'),
    testGetThuocTinh('Ram'),
    testGetThuocTinh('mauSac'),
  ])

  return {xuatXu, heDieuHanh, thuongHieu, Rom, Ram, mauSac};
}

const insertAllThuocTinh = async (genRam, genRom, genXuatXu, genHeDieuHanh, genThuongHieu, genMauSac, num = 100) =>
  new Array(num).fill(0).map((_, i) => [
    typeof genRam === 'function' && testInsertThuocTinh('ram', genRam()),
    typeof genRom === 'function' && testInsertThuocTinh('rom', genRom()),
    typeof genXuatXu === 'function' && testInsertThuocTinh('xuatxu', genXuatXu()),
    typeof genHeDieuHanh === 'function' && testInsertThuocTinh('hedieuhanh', genHeDieuHanh()),
    typeof genThuongHieu === 'function' && testInsertThuocTinh('thuonghieu', genThuongHieu()),
    typeof genMauSac === 'function' && testInsertThuocTinh('mausac', genMauSac()),
  ])

module.exports = {
  testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh,
  getAllThuocTinh, insertAllThuocTinh
}

