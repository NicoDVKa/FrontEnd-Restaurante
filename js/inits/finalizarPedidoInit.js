import { ProductCardCartFinalizarPedido } from "../components/productCardFinalizarPedido.js";
import { CreateComanda } from "../services/fetchComandaServices.js";
import { protectedFinalizarPedidoRoute } from "../routes/protectedFinalizarPedidoRoute.js";
import { nameValidation } from "../helpers/validators/nameValidation.js";

let successModal = new bootstrap.Modal(document.getElementById("success-modal"));
const successModalTextContainer = document.getElementById("success-modal-body-text");

let errorModal = new bootstrap.Modal(document.getElementById("error-modal"));
const errorModalTextContainer = document.getElementById("error-modal-body-text");

document.addEventListener("DOMContentLoaded", () => {
  protectedFinalizarPedidoRoute();
  renderCards();
});

const comanda = JSON.parse(localStorage.getItem("comanda"));
const productCardsContainer = document.getElementById(
  "product-cards-container"
);
const price = document.getElementById("price");

function renderCards() {
  let total = 0;
  for (let i = 0; i < comanda?.length; i++) {

    let product = {
      nombre : comanda[i].productName,
      precio : comanda[i].productPrice,
      imagen : comanda[i].productImg,
      id : comanda[i].productID
    }
    productCardsContainer.innerHTML += ProductCardCartFinalizarPedido(
      product,
      comanda[i].quantity
    );
    total += comanda[i].quantity * product.precio;

    let totalFormatted = total.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
    price.textContent = "Precio total: " + totalFormatted;
  }
}

const deliverySelect = document.getElementById("delivery-select");
const addressInputContainer = document.getElementById("address-input-container");

deliverySelect.addEventListener("change", () => {
  if (deliverySelect.value == 2 || deliverySelect.value == 3) {
    addressInputContainer.classList.remove("d-none");
  } else {
    addressInputContainer.classList.add("d-none");
  }
});

const finalizarPedidoBtn = document.getElementById("finalizar-pedido-btn");
const formFinalizarPedido = document.getElementById("finalizar-pedido-form");
const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const addressInput = document.getElementById("address-input");

formFinalizarPedido.addEventListener("submit", async (e) => {
  e.preventDefault();

  deliverySelect.classList.remove("is-invalid");
  firstNameInput.classList.remove("is-invalid");
  lastNameInput.classList.remove("is-invalid");

  if (!deliverySelect.value) {
    return deliverySelect.classList.add("is-invalid");
  }

  if (!nameValidation(lastNameInput.value)) {
    return lastNameInput.classList.add("is-invalid");
  }

  if (!nameValidation(firstNameInput.value)) {
    return firstNameInput.classList.add("is-invalid");
  }

  if (deliverySelect.value == 2 || deliverySelect.value == 3) {
    if (addressInput.value.length < 1 || addressInput.value.length > 50) {
      return addressInput.classList.add("is-invalid");
    }
  }

  const comandaObj = {
    mercaderias: [],
    formaEntrega: deliverySelect.value,
  };

  for (let i = 0; i < comanda.length; i++) {
    for (let j = 0; j < comanda[i].quantity; j++) {
      comandaObj.mercaderias.push(comanda[i].productID);
    }
  }

  const res = await CreateComanda(comandaObj);
  if (res.status == 201) {
    successModalTextContainer.innerHTML = `<h4>Hemos reicibido su pedido exitosamente!</h4>`;
    successModal.show();
    localStorage.removeItem("comanda");
    setTimeout(() => {
      window.location = "/";
    }, 2500);
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
});
