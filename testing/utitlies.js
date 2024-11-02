const {generatePhoneNumber, CountryNames} = require('phone-number-generator-js');
const randomEmail = require('random-email');

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randStr(len = 10) {
  const seed = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
  let result = ""
  for (let i = 0; i < len; i++) result += seed[randInt(0, seed.length - 1)];
  return result;
}

function getDayMonth(month) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 2:
      return 28;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
  }
}

function randDate() {
  let month = randInt(1, 12)
  return `${randInt(1950, 2030)}-${month}-${randInt(1, getDayMonth(month))}`;
}

function genPhoneNum() {
  return generatePhoneNumber()
}

function randomDate(start, end) {
  const result = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return result.toISOString().split("T")[0];
}

function formatDate(date) {
  return date.split("T")[0];
}

function randGender() {
  return randInt(0, 1) == 0 ? "Nam" : "Nữ"
}

function getRand(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  formatDate, getRand, randInt, randDate, randStr, genPhoneNum, randomEmail, randGender
}