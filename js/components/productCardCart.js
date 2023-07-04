import {productAddHandler, productSubtractHandler, productRemoveHandler} from "../helpers/cart/cart.js";

function ProductCardCart(product, quantity) {
  const totalProductPrice = product.precio * quantity;
  let totalProductPriceFormatted = totalProductPrice.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
  const id = product.id;

  return `
  <div class="card mb-3 body-bg text-light me-2">
  <div class="row g-0">
    <div class="col-md-4">
      <img
        src="${product.imagen}"
        class="img-fluid cart-card-img rounded-start"
        alt="${product.nombre}"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <div class="row">
          <div class="col-10">
            <h5 class="card-title">${product.nombre}</h5>
          </div>
          <div class="col-1">
            <div data-bs-theme="dark">
              <button
                type="button"
                class="btn-close"
                onclick="productRemoveHandler('${id}')"
                aria-label="Close"
              ></button>
            </div>
          </div>
       <h5 class="fw-light">${totalProductPriceFormatted}</h5>
        </div>
        <div
          class="btn-group btn-group-sm pt-auto"
          role="group"
          aria-label="Small button group"
        >
          <button
            type="button"
            class="btn btn-primary rounded-start-5"
            onclick="productSubtractHandler('${id}')"
          >
            -
          </button>
          <button type="button" class="btn btn-primary">${quantity}</button>
          <button
            type="button"
            class="btn btn-primary rounded-end-5"
            onclick="productAddHandler('${id}')"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

window.productAddHandler = productAddHandler;
window.productSubtractHandler = productSubtractHandler;
window.productRemoveHandler = productRemoveHandler;


export { ProductCardCart };