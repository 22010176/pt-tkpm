const pool = require('../models')
const jwt = require('jsonwebtoken')

function parseToken(token = "") {
  if (!token.length) return ""
  return token.split(" ")[1]
}

function getSecretKey() { return "mySecretKey" }

// Generate login token
function createToken(rootID, email, password) {
  const token = jwt.sign({ id: rootID, email, password }, getSecretKey())
  return `Bearer ${token}`;
}

function decodeToken(token) {
  try {
    return jwt.verify(parseToken(token), getSecretKey())
  } catch (error) {
    return {}
  }
}

// return user if true
async function verifyToken(token, email) {
  const data = decodeToken(token)
  const connection = await pool.getConnection();
  const [result] = await connection.query(`
SELECT * FROM taiKhoan
WHERE matKhau = ? AND email = ? AND ma = ?;`,
    [data.password, data.email, data.id])

  if (!result.length) {
    connection.destroy()
    return { body: [], success: false, message: "can't find user" };
  }

  connection.destroy()
  return { body: [], success: true, message: "success" };
}

module.exports = { createToken, decodeToken, verifyToken }