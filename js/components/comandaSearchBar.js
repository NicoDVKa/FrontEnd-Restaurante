import { getTodayDate } from "../helpers/date/date.js";

export function renderComandasSearchBar() {
    const date = getTodayDate();
    return `
    <section class="mt-5 container d-flex justify-content-between" id="search-container">
    <form class="w-100" id="search-by-date-form">
    <div class="input-group mb-3 has-validation">
    <input type="text" id="search-by-date-input" class="form-control" id="" placeholder="Buscar por fecha (ej: ${date})" maxlength="10" >
        <button class="btn nav-bg text-light border border-start-0" id="search-btn" type="submit"><i class="bi bi-search"></i></button>
        <div class="invalid-tooltip">
        La fecha ingresada es invalida
       </div>
      </div>
    </form>
    <select id="search-by-delivery-options" class="form-select form-select-sm w-50 mb-3 ms-3">
      <option disabled selected hidden class="default" value="">Forma de entrega</option>
      <option value="0">Todo</option>
      <option value="1">Salon</option>
      <option value="2">Delivery</option>
      <option value="3">Pedidos Ya</option>
    </select>
    <select id="search-by-price-comandas" class="form-select form-select-sm w-50 mb-3 ms-3">
      <option disabled selected hidden class="default" value="">Precio</option>
      <option value="asc">Precio Ascendente</option>
      <option value="desc">Precio Descendiente</option>
    </select>
    <select id="search-by-date-order" class="form-select form-select-sm w-50 mb-3 ms-2">
      <option disabled selected hidden class="default" value="">Fecha</option>
      <option value="asc">Fecha Ascendente</option>
      <option value="desc">Fecha Descendente</option>
    </select>
  </section>
  <section id="table-wrapper">
    <table id="comandas-table" class="table table-dark table-striped">
    <thead>
      <tr>
        <th scope="col" class="text-center">Id</th>
        <th scope="col" class="text-center">Forma de entrega</th>
        <th scope="col" class="text-center">Total</th>
        <th scope="col" class="text-center">Fecha</th>
        <th scope="col" class="text-center">Detalle</th>
      </tr>
    </thead>
    <tbody id="table-comandas-body">
    </tbody>
  </table>
  </section>
    <div id="message-container">
    </div>
    `;
}