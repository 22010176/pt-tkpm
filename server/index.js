const express = require("express")
const cors = require('cors')


const app = express()

const port = 3001

const path = require("path");
const fs = require('fs')
const https = require('https')

const { authAccount, authPermission, getAllPerm } = require('./src/routes/Auth/permissions')
const { parseToken, getSecretKey } = require('./src/routes/Auth/validateToken')
const { getAccountPermisisonsQuery } = require("./src/models/quanLyTaiKhoan/roles");
const pool = require('./src/models')

const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
}


async function parseAccountData(req, res, next) {
  try {
    const token = req.headers.authorization
    res.locals.user = parseToken(token)
  } catch (error) {
  }
  next()
}

async function initialDBConnection(req, res, next) {
  console.log(req.method.padEnd(10, " "), req.path)

  try {
    res.locals.conn = await pool.getConnection()
  } catch (e) {
    console.error(e)
    return res.json({ message: "Connection Error" })
  }

  next();
}

async function getPermission(req, res, next) {
  if (!res.locals.user) return next()
  res.locals.permissions = await getAccountPermisisonsQuery(res.locals.conn, res.locals.user)

  next()
}

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "500mb" }))
app.use(express.json({ limit: "500mb" }))
app.use('/api/images', express.static(path.join(__dirname, 'images')))

app.use(parseAccountData)
app.use(initialDBConnection)
app.use(getPermission)

app.use("/api/auth",
  require("./src/routes/Auth"))

app.use("/api/roles",
  // authAccount,
  // authPermission(6, false, false),
  // authPermission(7, true, false),
  require("./src/routes/Employees/roles"))

app.use("/api/accounts",
  // authAccount,
  // authPermission(9, false, false),
  // authPermission(4, true, false),
  require("./src/routes/Employees/accounts"))

app.use("/api/products",
  // authAccount,
  // authPermission(8, true, false),
  // authPermission(10, true, false),
  require("./src/routes/Products/products"))

app.use("/api/product-attributes",
  // authAccount,
  // authPermission(10, true, false),
  require("./src/routes/Products/product-attributes"))

app.use("/api/customers",
  // authAccount,
  // authPermission(2, true, false),
  require("./src/routes/Partners/customers"))

app.use("/api/suppliers",
  // authAccount,
  // authPermission(3, true),
  require("./src/routes/Partners/suppliers"))

app.use("/api/warehouse",
  // authAccount,
  // authPermission(5,),
  // authPermission(11, true),
  require("./src/routes/Warehouse/warehouse"))

app.use("/api/configures",
  // authAccount,
  require("./src/routes/Products/configures"))

app.use("/api/services",
  // authAccount,
  require("./src/routes/Warehouse/services"))

app.use("/api/statistics",
  // authAccount,
  require("./src/routes/Statistics"))

app.use("/api/employees",
  // authAccount,
  require("./src/routes/Employees/employees"))

app.all('/*', async (req, res) => {
  await res.locals.conn.destroy()
  res.json({ success: false, message: "not found entry" })
});

const server = https.createServer(options, app)


app.listen(port, () => {
  console.log(`Example app listening on port https://localhost:${port}`)
})