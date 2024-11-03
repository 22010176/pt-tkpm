const pool = require('../models')


async function getAllPerm() {
  const [res] = await pool.query(
    `SELECT q.maQuyenHan, cN.tenChucNang chucNang, hD.tenHanhDong hanhDong
     FROM ptpm_taikhoan.quyenHan q
              INNER JOIN ptpm_taikhoan.chucNang cN on q.chucNang = cN.maChucNang
              INNER join ptpm_taikhoan.hanhDong hD on q.hanhDong = hD.maHanhDong
     ORDER BY cN.maChucNang, hD.maHanhDong;`)
  // console.log('permissions', res)

  return Object.freeze(res)
}

const permissions = getAllPerm()

async function authAccount(req, res, next) {

}

function authPermission({maQuyenHan = 0, optional = true, last = false}) {
  return async function (req, res, next) {
    if (res.locals.permissionCheck && optional) return next()
    res.locals.permissionCheck = false;

    const perms = res.locals.permissions
    for (let perm of perms)
      if (perm.maQuyenHan === maQuyenHan) {
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