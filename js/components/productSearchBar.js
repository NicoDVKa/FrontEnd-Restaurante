

export function renderProductsSearchBar() {
    return `
    <section class="mt-5 container d-flex justify-content-between" id="search-container">
    <form class="w-100" id="search-product-form">
      <div class="input-group mb-3">
        <input type="text" id="search-product-input" class="form-control"  placeholder="Buscar por nombre" >
        <button class="btn nav-bg text-light border border-start-0" id="search-btn" type="submit"><i class="bi bi-search"></i></button>
      </div>
    </form>
  
    <select id="search-product-by-category" class="form-select form-select-sm mb-3 ms-4">
      <option disabled selected hidden class="default" value="">Buscar por categoria</option>
      <option value="">Todo</option>
      <option value="1">Entradas</option>
      <option value="2">Minutas</option>
      <option value="3">Pastas</option>
      <option value="4">Parrilla</option>
      <option value="5">Pizzas</option>
      <option value="6">Sandwiches</option>
      <option value="7">Ensaladas</option>
      <option value="8">Bebidas</option>
      <option value="9">Cerveza Artesanal</option>
      <option value="10">Postres</option>
    </select>
    <select id="search-product-by-price" class="form-select form-select-sm mb-3 ms-4">
      <option disabled selected hidden class="default" value="">Ordenar por</option>
      <option value="category">Categoria</option>
      <option value="id_asc">Id ascendente</option>
      <option value="id_desc">Id descendente</option>
      <option value="asc">Precio ascendente</option>
      <option value="desc">Precio descendiente</option>
    </select>
    <button type="button" class="btn btn-dark ms-4 mb-3 rounded-5 border text-nowrap" data-bs-toggle="modal" data-bs-target="#create-product-modal" id="add-product-btn">Agregar producto <i class="bi bi-plus-circle ms-1"></i></button>
  </section>
  <section id="table-wrapper">
  <table id="products-table" class="table table-dark table-striped">
  <thead>
  <tr>
  <th scope="col" class="text-center">Id</th>
  <th scope="col" class="text-center">Nombre</th>
  <th scope="col" class="text-center">Categoria</th>
  <th scope="col" class="text-center">Precio</th>
  <th scope="col" class="text-center">Acciones</th>
  </tr>
  </thead>
  <tbody id="table-products-body">
    </tbody>
  </table>
    <div id="message-products-container">
    </div>
    </section>
    `;
  
}