export function ProductCardCartFinalizarPedido(product, quantity) {
    const totalProductPrice = product.precio * quantity;
    let totalProductPriceFormatted = totalProductPrice.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
    const id = product.id;
  
    return `
    <div class="card mb-3 nav-bg text-light me-2">
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
              <h5 class="card-title">${product.nombre} <span class="fw-light"> x${quantity}</span></h5>
            </div>
         <h5 class="fw-light">${totalProductPriceFormatted}</h5>
          </div>
          <div
            class="btn-group btn-group-sm pt-auto"
            role="group"
            aria-label="Small button group"
          >
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
  