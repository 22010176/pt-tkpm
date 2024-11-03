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
  const token = jwt.sign({userID, mail, password}, getSecretKey())
  return `Bearer ${token}`;
}

// return user if true
async function verifyToken(conn, token) {
  const data = parseToken(token)
  const [result] = await conn.query(
    `SELECT 1
     FROM taikhoan
     WHERE matkhau = ?
       AND mail = ?
       AND mataikhoan = ?
     LIMIT 1;`,
    [data.password, data.email, data.userID])

  return result.length > 0;
}

module.exports = {createToken, verifyToken, parseToken}