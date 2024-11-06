const bcrypt = require('bcrypt')


let a = 'eeeeee';
bcrypt.genSalt(10, function (err, salt) {
  if (err) return console.log(err)
  bcrypt.hash(a, salt, function (err, hash) {
    if (err) return console.log(err)
    console.log(hash)
    bcrypt.compare(e, a)
  })

})


