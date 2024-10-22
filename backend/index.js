const express = require("express")
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// Authentication
app.use('/auth', require("./src/routes/auth"))
app.use('/nhan-vien', require('./src/routes/nhanVien'))
app.use('/thuoc-tinh', require('./src/routes/thuocTinh'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})