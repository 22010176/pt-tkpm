const express = require("express")
const cors = require('cors')

const app = express()
const port = 3001

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

// Authentication


app.use('/api/tai-khoan', require("./src/routes/taiKhoan"))


app.all('/*', (req, res) => res.json({ message: "not found entry" }))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})