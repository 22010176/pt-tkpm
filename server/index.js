const express = require("express")
const cors = require('cors')

const {authAccount, authPermission, getAllPerm} = require('./src/routes/Auth/permissions')
const app = express()

const port = 3001

const {parseToken} = require('./src/routes/Auth/validateToken')
const pool = require('./src/models')
const path = require("node:path");


setInterval(() => {
  pool.removeAllListeners()
}, 10000)

async function initialDBConnection(req, res, next) {
  console.log(req.method.padEnd(10, " "), req.path)

  try {
    res.locals.conn = await pool.getConnection()
  } catch (e) {
    console.error(e)
    return res.json({message: "Connection Error"})
  }
  next();
}

async function getPermission(req, res, next) {

  next()
}

async function parseAccountData(req, res, next) {
  try {
  } catch (error) {
  }
  next()
}

app.use(cors())
app.use(express.urlencoded({extended: true, limit: "100mb"}))
app.use(express.json({limit: "100mb"}))
app.use('/api/images', express.static(path.join(__dirname, 'images')))


app.use(parseAccountData)
app.use(initialDBConnection)
app.use(getPermission)


app.use("/api/auth",
  require("./src/routes/Auth"))

app.use("/api/roles",
  require("./src/routes/Employees/roles"))

app.use("/api/accounts",
  require("./src/routes/Employees/accounts"))

app.use("/api/products",
  require("./src/routes/Products/products"))

app.use("/api/product-attributes",
  require("./src/routes/Products/product-attributes"))

app.use("/api/customers",
  require("./src/routes/Partners/customers"))

app.use("/api/suppliers",
  require("./src/routes/Partners/suppliers"))

app.use("/api/warehouse",
  require("./src/routes/Warehouse/warehouse"))

app.use("/api/configures",
  require("./src/routes/Products/configures"))

app.use("/api/services",
  require("./src/routes/Warehouse/services"))

app.use("/api/statistics",
  require("./src/routes/Statistics"))

app.use("/api/employees",
  require("./src/routes/Employees/employees"))

app.all('/*', async (req, res) => {
  await res.locals.conn.destroy()
  res.json({success: false, message: "not found entry"})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})