import {
  checkResponse,
  getToken
} from "../authentication";

export async function getProductState() {

  return fetch(`/api/warehouse/item-state`, {
    method:  "GET",
    headers: {
      "Content-Type":  "application/json",
      'authorization': getToken(),
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}

export async function getProductFromConfigureState({madanhmucsanpham, macauhinh, matinhtrang}) {
  return fetch(`/api/warehouse/items?madanhmucsanpham=${madanhmucsanpham}&macauhinh=${macauhinh}&matinhtrang=${matinhtrang}`, {
    method:  "GET",
    headers: {
      "Content-Type":  "application/json",
      'authorization': getToken(),
    }
  })
  .then(response => response.json())
  .then(checkResponse)
}