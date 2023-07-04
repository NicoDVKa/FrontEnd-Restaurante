import { SearchMercaderiaWithOptions } from "../services/fetchMercaderiaServices.js";
import { GetMercaderiaById } from "../services/fetchMercaderiaServices.js";
import { ProductCard } from "../components/productCard.js";
import { renderCartBody, cartBadgeHandler } from "../helpers/cart/cart.js";
import { SpinnerWithText } from "../components/spinner.js";


let products = [];

document.addEventListener("DOMContentLoaded", async () => {
  await renderProductCards("", "", "");
  cartBadgeHandler();
});

async function renderProductCards(name, category, price) {
  const cardsContainer = document.getElementById("cards-container");
  cardsContainer.innerHTML = SpinnerWithText("Productos");

  let productCards = [];
  let response = await SearchMercaderiaWithOptions(category, name, price);


  products = response.product;

  if (category == "" && price == "") {
    products?.sort((a, b) => a.tipo.id - b.tipo.id);
  }
  cardsContainer.innerHTML = "";
  if (products?.length > 0) {
    products.map((i) => productCards.push(ProductCard(i)));
    productCards.map((i) => (cardsContainer.innerHTML += i));
  } else {
    cardsContainer.innerHTML = `<div class='text-center'>
    <h1 class='text-light'>Lo sentimos, no hemos encontrado el producto que buscabas</h1>
    </div>`;
  }
}
const cartBadge = document.getElementById("cart-open-button");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchByCategory = document.getElementById("search-by-category");
const searchByPrice = document.getElementById("search-by-price");

cartBadge.addEventListener("click", async (e) => {
  await renderCartBody();
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await renderProductCards(
    searchInput.value,
    searchByCategory.value,
    searchByPrice.value
  );
});
searchByCategory.addEventListener("change", async () =>
  await renderProductCards(
    searchInput.value,
    searchByCategory.value,
    searchByPrice.value
  )
);
searchByPrice.addEventListener("change", async () =>
  await renderProductCards(
    searchInput.value,
    searchByCategory.value,
    searchByPrice.value
  )
);

const productDetailsModal = new bootstrap.Modal(document.getElementById("product-details-modal"));
const productDetailsModalBody = document.getElementById("product-details-modal-body");
const productDetailsModalTitle = document.getElementById("product-details-modal-title");

async function showIngredientsModal(id) {
  const res = await GetMercaderiaById(id);
  const product = res.product;
  let ingredients = product.ingredientes.split(", ").map((item) => [item]);
  ingredients = ingredients.map(
    (i) => `<li class="text-justified ms-1">${i}</li>`
  );
  const productNameUppercase =
    product.nombre.charAt(0).toUpperCase() + product.nombre.slice(1);
  productDetailsModalTitle.innerText =
    product.tipo.descripcion + " > " + productNameUppercase;
  productDetailsModalBody.innerHTML = `
  <div class="text-center">
  <img src="${product.imagen}" alt="" class="img-fluid w-75 rounded"/>
</div>
  <h4 class="fst-italic fw-light my-4">Ingredientes</h4>
  <ul>
  ${ingredients.join("")}
  </ul>`;
  productDetailsModal.show();
}

window.showIngredientsModal = showIngredientsModal;
