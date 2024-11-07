import {checkResponse, getToken} from "../authentication";

export async function getProducts(token = "") {
  return await fetch("/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'authorization': getToken(),
    }
  })
    .then(response => response.json())
    .then(checkResponse);
}

export async function getProductConfigure() {
  return await fetch("/api/products/product-configures", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'authorization': getToken(),
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'authorization': getToken(),
    },
    body: formData
  })
    .then(response => response.json())
    .then(checkResponse);
}

export async function insertProduct(product, token = "") {
  return await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'authorization': getToken(),
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(checkResponse);
}

export async function updateProduct(product, token = "") {
  return await fetch("/api/products", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'authorization': getToken(),
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(checkResponse);
}

export async function deleteProduct(product, token = "") {
  return await fetch(`/api/products`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'authorization': getToken(),
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(checkResponse);
}

