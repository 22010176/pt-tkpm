const express = require("express")
const cors = require('cors')

const handler = require("./src")

const app = express()
const port = 3001

app.use(cors())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.all('/api/*', async (req, res) => {
  // console.log(req)
  return res.json(await handler(req))
})



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})