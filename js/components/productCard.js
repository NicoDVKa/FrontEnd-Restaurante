import {addProductToCart} from "../helpers/cart/cart.js";


function ProductCard(product) {
  let descripcion = product.tipo.descripcion;
  descripcion = descripcion.toLowerCase().replace(/\s+/g, '');
  descripcion = descripcion.charAt(0).toLowerCase() + descripcion.slice(1);

  return `
    <div class="col-12 col-md-4 col-lg-3 card-container mb-4">
      <div class="card text-light nav-bg rounded-top-4 rounded-bottom-0 h-100">
        <img
          src="${product.imagen}"
          class="card-img rounded rounded-4 img-fluid px-2 pt-2"
          alt="${product.nombre}"
          onclick="showIngredientsModal(${product.id})"
        />

        <div class="card-body">
          <h5 class="card-title text-center" onclick="showIngredientsModal(${product.id})">${product.nombre}</h5>
          <div class="d-flex">
            <h4 class="me-auto mb-0 mt-1 fw-normal">$${product.precio.toLocaleString()}</h4>
            <button type="button" class="btn btn-outline-primary rounded-5" 
                     onclick="addProductToCart(${product.id})">
                     Agregar al carrito <i class="bi bi-cart-plus"></i></button>
          </div>
        </div>
      </div>
      <div class="py-1 bg-bottom-card-${descripcion} rounded-bottom-4"></div>
    </div>
  `;
}


window.addProductToCart = addProductToCart;

export { ProductCard };
