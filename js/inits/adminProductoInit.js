import { SearchMercaderiaWithOptions, 
         DeleteMercaderiaById
       } from "../services/fetchMercaderiaServices.js";

import { renderProductsSearchBar } from "../components/productSearchBar.js";
import { listenersAdminProductContainer } from "../containers/adminProductContainer.js";
import { tableProductsRow } from "../components/tableRowProduct.js";
import { listenersModalCreateProduct } from "../containers/createModalProduct.js";
import { listenersModalUpdateProduct } from "../containers/updateModalProduct.js";
import { SpinnerWithText } from "../components/spinner.js";


let products;
const componentContainer = document.getElementById("admin-component-container");

export async function renderProducts(name, category, order) {
  
  document.getElementById("spinner").classList.remove("d-none");

  const messageProductsContainer = document.getElementById("message-products-container");
  const productsTableHeader = document.getElementById("products-table");
  const productsTable = document.getElementById("table-products-body");
  messageProductsContainer.innerHTML = "";
  productsTable.innerHTML = "";
  let productRows = [];
  productsTableHeader.classList.remove("d-none");

  if (order == "category" || order == "id_asc" || order == "id_desc") {
    let response = await SearchMercaderiaWithOptions(category, name, "");
    products = response.product;
    order == "category"
      ? products.sort((a, b) => a.tipo.id - b.tipo.id)
      : undefined;
    order == "id_asc" ? products.sort((a, b) => a.id - b.id) : undefined;
    order == "id_desc" ? products.sort((a, b) => b.id - a.id) : undefined;
  } else {
      let response = await SearchMercaderiaWithOptions(category, name, order);
      products = response.product;
  }

  document.getElementById("spinner").classList.add("d-none");

  if (products.length > 0) {
    products.map((i) => productRows.push(tableProductsRow(i)));
    productRows.map((i) => (productsTable.innerHTML += i));
  } else {
    messageProductsContainer.innerHTML = `<div class="w-100 text-center">
    <h5 class="text-light">Lo sentimos,no hemos podido encontrar lo que buscabas.</h5>
  </div>`;
    productsTableHeader.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
    componentContainer.innerHTML = renderProductsSearchBar();
    componentContainer.innerHTML += SpinnerWithText("Productos");
    await renderProducts();
    await listenersAdminProductContainer();
    await listenersModalCreateProduct(successModal,successModalTextContainer, errorModal, errorModalTextContainer);
    await listenersModalUpdateProduct(successModal,successModalTextContainer, errorModal, errorModalTextContainer);
});


let successModal = new bootstrap.Modal(document.getElementById("success-modal"));
const successModalTextContainer = document.getElementById("success-modal-body-text");
  
let errorModal = new bootstrap.Modal(document.getElementById("error-modal"));
const errorModalTextContainer = document.getElementById("error-modal-body-text");


export async function deleteProduct(id) {
    const res = await DeleteMercaderiaById(id);
    if (res.status == 200) {
      successModalTextContainer.innerHTML = `<h4>El producto ha sido eliminado exitosamente!</h4>`;
      successModal.show();
      renderProducts();
      setTimeout(() => {
        successModal.hide();
      }, 3500);
    } else if (res?.body?.message) {
      errorModal.show();
      errorModalTextContainer.innerHTML = `<h4>${res.body.message}</h4>`;
      setTimeout(() => {
        errorModal.hide();
      }, 3500);
    } else {
      errorModal.show();
      errorModalTextContainer.innerHTML = `<h4>Lo sentimos, ha ocurrido un error</h4>`;
      setTimeout(() => {
        errorModal.hide();
      }, 3500);
    }
}

