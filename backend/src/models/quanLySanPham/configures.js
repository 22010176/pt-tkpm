async function getConfigures(conn) {
  try {
    const [result] = await conn.query(
      `SELECT *
       FROM cauhinh
       ORDER BY macauhinh DESC
       LIMIT 200;`)
    return {configurations: result, success: true};
  } catch (e) {
    console.log(e)
    return {configurations: [], success: false}
  }
}

async function getProductConfigures(conn, macauhinh) {
  try {
    const [result] = await conn.query(
      `SELECT *, ra.dungluongram, ro.dungluongrom, m.tenmausac
       FROM cauhinh c
                INNER JOIN ram ra ON c.ram = ra.maram
                INNER JOIN rom ro ON ro.marom = c.rom
                INNER JOIN mausac m ON m.mamausac = c.mausac
       WHERE danhmucsanpham = ?
       ORDER BY macauhinh DESC;`, [macauhinh])

    return {configurations: result, success: true};
  } catch (e) {
    console.log(e)
    return {configurations: [], success: false}
  }
}

async function insertMultipleConfigures(conn, configurations = []) {
  try {
    const [result] = await conn.query(
      `INSERT INTO cauhinh (gianhap, giaxuat, danhmucsanpham, ram, rom, mausac)
       VALUES ?`,
      [
        configurations.map(({gianhap, giaxuat, danhmucsanpham, ram, rom, mausac}) =>
          [gianhap, giaxuat, danhmucsanpham, ram, rom, mausac])
      ])
    return {message: "Configuress added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function insertConfigure(conn, {
  gianhap, giaxuat, danhmucsanpham, ram, rom, mausac
}) {
  try {
    const [result] = await conn.query(
      `INSERT INTO cauhinh (gianhap, giaxuat, danhmucsanpham, ram, rom, mausac)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [gianhap, giaxuat, danhmucsanpham, ram, rom, mausac])
    return {message: "configuress added", success: true};
  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false};
  }
}

async function updateConfigure(conn, {
  gianhap, giaxuat, danhmucsanpham, ram, rom, mausac, macauhinh
}) {
  try {
    await conn.query(
      `UPDATE cauhinh
       SET gianhap        = ?,
           giaxuat        = ?,
           danhmucsanpham = ?,
           ram            = ?,
           rom            = ?,
           mausac         = ?
       WHERE macauhinh = ?;`,
      [gianhap, giaxuat, danhmucsanpham, ram, rom, mausac, macauhinh])
    return {message: "configures updated", success: true}
  } catch (e) {
    console.log((e))
    return {message: "Updated fail", success: false};
  }
}

async function deleteConfigure(conn, {macauhinh}) {
  try {
    await conn.query(
      `DELETE
       FROM cauhinh
       WHERE macauhinh = ?`, [macauhinh])
    return {message: "configures deleted", success: true}
  } catch (e) {
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  getConfigures, insertConfigure, updateConfigure, deleteConfigure, insertMultipleConfigures, getProductConfigures
}