import {checkResponse} from "../authentication";

export async function getProducts(token = "") {
  return await fetch("/api/products", {
    method:  "GET",
    headers: {
      "Content-Type":  "application/json",
      "Accept":        "application/json",
      "Authorization": token
    }
  })
  .then(response => response.json())
  .then(checkResponse);
}

export async function updateProductImage(product, token = "") {
  if (!product.hinhAnh) return;

  const formData = new FormData();
  formData.append("hinhAnh", product.hinhAnh);

  return await fetch(`/api/products/upload-img/${product.maDanhMucSanPham}`, {
    method:  "POST",
    headers: {"Authorization": token},
    body:    formData
  })
  .then(response => response.json())
  .then(checkResponse);
}

export async function insertProduct(product, token = "") {
  return await fetch("/api/products", {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Accept":        "application/json",
      "Authorization": token
    },
    body:    JSON.stringify(product)
  })
  .then(response => response.json())
  .then(checkResponse);
}

export async function updateProduct(product, token = "") {
  return await fetch("/api/products", {
    method:  "PUT",
    headers: {
      "Content-Type":  "application/json",
      "Accept":        "application/json",
      "Authorization": token
    },
    body:    JSON.stringify(product)
  })
  .then(response => response.json())
  .then(checkResponse);
}

export async function deleteProduct(product, token = "") {
  return await fetch(`/api/products`, {
    method:  'DELETE',
    headers: {
      "Content-Type":  "application/json",
      "Accept":        "application/json",
      "Authorization": token
    },
    body:    JSON.stringify(product)
  })
  .then(response => response.json())
  .then(checkResponse);
}