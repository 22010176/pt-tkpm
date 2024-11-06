const pool = require('../../models')
const jwt = require('jsonwebtoken')

const {permissions} = require('./permissions')
const {v4} = require("uuid");

function parseToken(token = "") {
  if (!token.length) return ""
  try {
    return jwt.verify(parseToken(token.split(" ")[1]), getSecretKey())
  } catch (error) {
    return {}
  }
}

function getSecretKey() {
  return "mySecretKey1234%^&*"
}

// Generate login token
function createToken(userID, mail, password) {
  return jwt.sign({userID, mail, password}, getSecretKey());
}

// return user if true
async function verifyToken(conn, token) {
  const data = parseToken(token)
  const [result] = await conn.query(
    `SELECT 1
     FROM taikhoan
              INNER JOIN ptpm.nhanvien n ON taikhoan.nhanvien = n.manhanvien
     WHERE matkhau = ?
       AND n.mail = ?
       AND mataikhoan = ?
     LIMIT 1;`,
    [data.password, data.mail, data.userID])

  return result.length > 0;
}

module.exports = {createToken, verifyToken, parseToken}