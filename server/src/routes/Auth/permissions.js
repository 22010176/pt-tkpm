const pool = require('../../models')


async function getAllPerm() {
  const [res] = await pool.query(
    `SELECT q.maquyenhan, cn.tenchucnang chucnang, hd.tenhanhdong hanhdong
     FROM ptpm_taikhoan.quyenhan q
              INNER JOIN ptpm_taikhoan.chucnang cn ON q.chucnang = cn.machucnang
              INNER JOIN ptpm_taikhoan.hanhdong hd ON q.hanhdong = hd.mahanhdong
     ORDER BY cn.machucnang, hd.mahanhdong;`)
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