const pool = require('../models')


async function getAllPerm() {
  const [chucNang] = await pool.query(`SELECT *
                                       FROM chucNang
                                       ORDER BY maChucNang;`)
  const [hanhDong] = await pool.query(`SELECT *
                                       FROM hanhDong
                                       ORDER BY maHanhDong;`)
  
  console.log('permissions', {hanhDong, chucNang})
  return Object.freeze({hanhDong, chucNang})
}

const permissions = getAllPerm()

async function authAccount(req, res, next) {
  const account = res.locals.account
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `SELECT *
       FROM taiKhoan
       WHERE email = ?
         AND matKhau = ?
       LIMIT 1`,
      [account.email, account.password])
    connection.destroy()
    if (!result.length) return res.json({body: [], success: false, message: "not registered"})
  } catch (error) {

    connection.destroy()
    return res.json({body: [], success: false, message: "Error while validating your account."})
  }

  next()
}

function authPermission({chucNangID = 0, hanhDongID = 0, optional = true, last = false}) {
  return async function (req, res, next) {
    if (res.locals.permissionCheck && optional) return next()
    res.locals.permissionCheck = false;

    const perms = res.locals.permissions
    for (let perm of perms)
      if (perm.maChucNang === chucNangID && perm.maHanhDong === hanhDongID) {
        res.locals.permissionCheck = true;
        return next()
      }

    if (last) return res.json({body: [], message: "invalid action", success: false})
    next()
  }
}

module.exports = {
  authAccount,
  authPermission,
  permissions
}