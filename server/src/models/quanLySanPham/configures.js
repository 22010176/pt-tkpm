async function getConfigures(conn) {

  try {
    const [result] = await conn.query(
      `SELECT *
       FROM cauhinh
       ORDER BY macauhinh DESC;`)
    return {configures: result, success: true};
  } catch (e) {
    console.log(e)
    return {configures: [], success: false}
  }
}

async function getProductConfigures(conn, danhmucsanpham) {
  try {
    const [result] = await conn.query(
      `SELECT c.*, ra.dungluongram, ro.dungluongrom, m.tenmausac
       FROM cauhinh c
                INNER JOIN ram ra ON c.ram = ra.maram
                INNER JOIN rom ro ON ro.marom = c.rom
                INNER JOIN mausac m ON m.mamausac = c.mausac
       WHERE danhmucsanpham = ?
       ORDER BY macauhinh DESC;`, [danhmucsanpham])

    return {configures: result, success: true};
  } catch (e) {
    console.log(e)
    return {configures: [], success: false}
  }
}

async function insertConfigure(conn, configures = []) {
  try {
    console.log(configures)
    await conn.query(
      `INSERT INTO cauhinh (gianhap, giaxuat, danhmucsanpham, ram, rom, mausac)
       VALUES ?`,
      [
        configures.map(({gianhap, giaxuat, danhmucsanpham, ram, rom, mausac}) =>
          [gianhap, giaxuat, danhmucsanpham, ram, rom, mausac])
      ])
    const arr = {
      gianhap:        [],
      giaxuat:        [],
      danhmucsanpham: [],
      ram:            [],
      rom:            [],
      mausac:         [],
    }
    configures.forEach(configure => {
      const data = Object.entries(configure)
      data.forEach(([key, value]) => arr[key].push(value))
    })
    const {gianhap, giaxuat, danhmucsanpham, ram, rom, mausac} = arr
    const [result] = await conn.query(
      `SELECT *
       FROM cauhinh
       WHERE gianhap IN ?
         AND giaxuat IN ?
         AND danhmucsanpham IN ?
         AND ram IN ?
         AND rom IN ?
         AND mausac IN ?
       LIMIT ?`,
      [[gianhap], [giaxuat], [danhmucsanpham], [ram], [rom], [mausac], configures.length]
    )
    return {message: "Configures added", success: true, configures: result};

  } catch (e) {
    console.log(e)
    return {message: "Added fail", success: false, configures: []};
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

async function deleteConfigure(conn, configures = []) {
  try {
    await conn.query(
      `DELETE
       FROM cauhinh
       WHERE macauhinh IN ?`,
      [[configures.map(({macauhinh}) => macauhinh)]])
    return {message: "configures deleted", success: true}
  } catch (e) {
    console.log(e)
    return {message: "Deleted fail", success: false}
  }
}

module.exports = {
  getConfigures, insertConfigure, updateConfigure, deleteConfigure, getProductConfigures
}