function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randStr(len = 10) {
  const seed = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  let result = ""
  for (let i = 0; i < len; i++) result += seed[randInt(0, seed.length - 1)];
  return result;
}

function randDate() {
  return `${randInt(1950, 2030)}-${randInt(1, 12)}-${randInt(1, 28)}`;
}

console.log(randDate())
module.exports = {
  randInt, randDate, randStr
}