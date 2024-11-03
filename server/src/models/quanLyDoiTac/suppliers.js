async function getSuppliers(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM nhacungcap
       ORDER BY manhacungcap;`);

    return {suppliers: result, success: true};

  } catch (e) {
    return {suppliers: [], success: false}
  }
}

async function insertSupplier(conn, suppliers = []) {
  try {
    await conn.query(`INSERT INTO nhacungcap (tennhacungcap, diachi, mail, sodienthoai)
                      VALUES ?`, [
      suppliers.map(({tennhacungcap, diachi, mail, sodienthoai}) => [tennhacungcap, diachi, mail, sodienthoai])
    ]);
    const [result] = await conn.query(
      `SELECT *
       FROM nhacungcap
       WHERE mail IN ?
         AND sodienthoai IN ?;`,
      [[suppliers.map(({mail}) => mail)], [suppliers.map(({sodienthoai}) => sodienthoai)]])
    return {message: "Supplier added", success: true, suppliers: result};

  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false, suppliers: []};
  }
}


async function updateSupplier(conn, {tennhacungcap, diachi, mail, sodienthoai, manhacungcap}) {
  try {
    const [result] = await conn.query(`UPDATE nhacungcap
                                       SET tennhacungcap = ?,
                                           diachi        = ?,
                                           mail          = ?,
                                           sodienthoai   = ?
                                       WHERE manhacungcap = ?;`, [tennhacungcap, diachi, mail, sodienthoai, manhacungcap]);

    return {message: "Supplier updated", success: true};

  } catch (e) {
    return {message: "Updated fail", success: false};
  }
}

async function deleteSupplier(conn, suppliers = []) {
  try {
    await conn.query(`DELETE
                      FROM nhacungcap
                      WHERE manhacungcap IN ?;`, [[suppliers.map(({manhacungcap}) => manhacungcap)]]);

    return {message: "Supplier deleted", success: true};
  } catch (e) {
    return {message: "Deleted fail", success: false};
  }
}

module.exports = {deleteSupplier, getSuppliers, insertSupplier, updateSupplier}