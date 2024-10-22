const express = require("express")

const router = express.Router({ mergeParams: true })

router.route("/account")
  .get((req, res) => {
    res.send("TEST")
  })
  .post((req, res) => {
    // validate data, sending token back


    // return result
    res.json({
      body: [
        { token: "test" }
      ],
      message: "success"
    })

  })

function createToken() {
  return "token" + new Date().toISOString()
}

router.route("/authToken")
  .post((req, res) => {
    res.json({ body: [], message: "success" })
  })


module.exports = router