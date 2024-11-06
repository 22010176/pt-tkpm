const pool = require('../../models')
const jwt = require('jsonwebtoken')

const {permissions} = require('./permissions')
const {v4} = require("uuid");

function parseToken(token) {
  if (!token || token.length < 1) return
  const realToken = token?.replaceAll("Bearer ", "")
  return jwt.verify(realToken, getSecretKey())
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
  return 0;
}

module.exports = {createToken, verifyToken, parseToken, getSecretKey}