export const ProductDetail = (product) => {

    let ingredients = product.ingredientes.split(", ").map((item) => [item]);
    ingredients = ingredients.map((i) =>(`<li class="text-justified ms-1">${i}</li>`))
    return `
    <section class="row text-light mt-5">
    <div class="col-12 row border-bottom pb-3">
      <div class="col-3">
        <img src=${product.imagen} class="img-fluid rounded-3" alt="">
      </div>
      <div class="col-9">
         <h1>${product.nombre}</h1>
         <h3 class="mt-auto fw-light">$${product.precio.toLocaleString()}</h3>
         <h5 class="mt-auto fw-light">${product.tipo.descripcion}</h5>
      </div>
    </div>
    <div class="col-12 row mt-3">
      <div class="col-9 border-end ">
        <div class="text-center">
          <h4 class="fw-medium">Preparación</h4>
        </div>
         <p class="text-justified mt-4">${product.preparacion}</p>
        </div>
      <div class="col-3">
        <div class="text-center">
          <h4 class="fw-medium">Ingredientes</h4></div>
          <ul class="mt-4">
          ${ingredients.join("")}
     </ul>
        </div>
    </div>
   </section>
    `;
}