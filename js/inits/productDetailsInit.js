import { GetMercaderiaById } from "../services/fetchMercaderiaServices.js";
import { ProductDetail } from "../components/productDetail.js";

let productDetailsContainer = document.getElementById("product-details-container");

document.addEventListener("DOMContentLoaded", () => {
  renderProductDetails();
});

async function renderProductDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  let id = searchParams.get("id");
  let res = await GetMercaderiaById(id);
  if(!res.ok){
    if(res.statusCode == 404 || res.statusCode == 400){
      window.location = '../../views/404.html';
    }
  }
  let product = res.product;
  const productNameUppercase = product.nombre.charAt(0).toUpperCase() + product.nombre.slice(1);
  document.title = "Herlan Resto Bar | " + productNameUppercase

  productDetailsContainer.innerHTML = ProductDetail(product);
}

