const { url } = require("..")

const testGetThuocTinh = thuocTinh =>
  fetch(url + `/api/product-attributes/${thuocTinh}`, {
    method: "GET",
  })
    .then(response => response.json())

const testInsertThuocTinh = (thuocTinh, value) =>
  fetch(url + `/api/product-attributes/${thuocTinh}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value)
  })
    .then(response => response.json())

const testUpdateThuocTinh = (thuocTinh, value) =>
  fetch(url + `/api/product-attributes/${thuocTinh}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value)
  })
    .then(response => response.json())

const testDeletethuocTinh = (thuocTinh, value) =>
  fetch(url + `/api/product-attributes/${thuocTinh}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value)
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

  return { xuatXu, heDieuHanh, thuongHieu, Rom, Ram, mauSac };
}

const insertAllThuocTinh = async (genRam, genRom, genXuatXu, genHeDieuHanh, genThuongHieu, genMauSac, num = 100) =>
  Promise.all([
    typeof genRam === 'function' && testInsertThuocTinh('ram', new Array(num).fill(0).map(genRam)),
    typeof genRom === 'function' && testInsertThuocTinh('rom', new Array(num).fill(0).map(genRom)),
    typeof genXuatXu === 'function' && testInsertThuocTinh('xuatxu', new Array(num).fill(0).map(genXuatXu)),
    typeof genHeDieuHanh === 'function' && testInsertThuocTinh('hedieuhanh', new Array(num).fill(0).map(genHeDieuHanh)),
    typeof genThuongHieu === 'function' && testInsertThuocTinh('thuonghieu', new Array(num).fill(0).map(genThuongHieu)),
    typeof genMauSac === 'function' && testInsertThuocTinh('mausac', new Array(num).fill(0).map(genMauSac)),
  ])

module.exports = {
  testGetThuocTinh, testInsertThuocTinh, testUpdateThuocTinh, testDeletethuocTinh,
  getAllThuocTinh, insertAllThuocTinh
}

