const express = require("express")
const cors = require('cors')

const app = express()
const port = 3001

const {parseToken} = require('./src/utilities/validateToken')
const pool = require('./src/models')

const {authAccount, authPermission, getAllPerm} = require('./src/utilities/permissions')


setInterval(() => {
  pool.removeAllListeners()
}, 10000)

async function initialDBConnection(req, res, next) {
  console.log(req.path)
  res.locals.conn = await pool.getConnection()
  next();
}

async function getPermission(req, res, next) {
  // const conn = res.locals.conn;
  next()
}

async function parseAccountData(req, res, next) {
  try {
    // const userData = parseToken(req.headers.authorization)
    // res.locals.account = userData
  } catch (error) {
  }
  next()
}

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(parseAccountData)
app.use(initialDBConnection)
app.use(getPermission)


app.use("/api/auth",
  require("./src/routes/auth"))

app.use("/api/roles",
  require("./src/routes/roles"))

app.use("/api/accounts",
  require("./src/routes/accounts"))

app.use("/api/products",
  require("./src/routes/products"))

app.use("/api/product-attributes",
  require("./src/routes/product-attributes"))

app.use("/api/customers",
  require("./src/routes/customers"))

app.use("/api/suppliers",
  require("./src/routes/suppliers"))

app.use("/api/warehouse",
  require("./src/routes/warehouse"))

app.use("/api/services",
  require("./src/routes/services"))

app.use("/api/statistics",
  require("./src/routes/statistics"))

app.use("/api/employees",
  require("./src/routes/employees"))

app.all('/*', (req, res) => {
  res.json({success: false, message: "not found entry"})
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})