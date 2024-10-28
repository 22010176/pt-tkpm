async function getSuppliers(conn) {
  try {
    const [result] = await conn.query(`
        SELECT *
        FROM ptpm_doitac.nhaCungCap
        ORDER BY maNhaCungCap;`);

    return {suppliers: result, success: true};

  } catch (e) {
    return {suppliers: [], success: false}
  }
}

async function insertSupplier(conn, supplier) {
  try {
    const [result] = await conn.query(
      `INSERT INTO ptpm_doitac.nhaCungCap (tenNhaCungCap, diaChi, mail, soDienThoai)
       VALUES (?, ?, ?, ?)`,
      [supplier.tenNhaCungCap, supplier.diaChi, supplier.mail, supplier.soDienThoai]);

    return {message: "Supplier added", success: true};

  } catch (e) {
    return {message: "Added fail", success: false};
  }
}


async function updateSupplier(conn, supplier) {
  try {
    const [result] = await conn.query(
      `UPDATE ptpm_doitac.nhaCungCap
       SET tenNhaCungCap = ?,
           diaChi        = ?,
           mail          = ?,
           soDienThoai   = ?
       WHERE maNhaCungCap = ?;`,
      [supplier.tenNhaCungCap, supplier.diaChi, supplier.mail, supplier.soDienThoai, supplier.maNhaCungCap]);

    return {message: "Supplier updated", success: true};

  } catch (e) {
    return {message: "Updated fail", success: false};
  }
}

async function deleteSupplier(conn, supplier) {
  try {
    const [result] = await conn.query(
      `DELETE
       FROM ptpm_doitac.nhaCungCap
       WHERE maNhaCungCap = ?;`,
      [supplier.maNhaCungCap]);
    
    return {message: "Supplier deleted", success: true};

  } catch (e) {
    return {message: "Deleted fail", success: false};
  }
}

module.exports = {deleteSupplier, getSuppliers, insertSupplier, updateSupplier}