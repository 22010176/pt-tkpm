const { url } = require("..");
const { randInt } = require("../../utitlies");

async function getConfigures() {
  return fetch(url + '/api/configures', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
}

async function insertConfigure(data = []) {
  return fetch(url + '/api/configures', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

async function deleteConfigure(data = []) {
  return fetch(url + '/api/configures', {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}

async function updateConfigure(data = []) {
  return fetch(url + '/api/configures', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.json());
}


module.exports = {
  getConfigures, insertConfigure, updateConfigure, deleteConfigure,
}