import { deleteProduct } from "../inits/adminProductoInit.js";

export function renderDeleteProductBody(image, name, id) {
    const deleteProductModalBody = document.getElementById("delete-modal-body");
      deleteProductModalBody.innerHTML = `<div class="container text-center" >
      <i class="bi bi-exclamation-circle display-1 text-warning"></i>
      <h4 class="mt-1">Estas seguro que deseas eliminar este producto?</h4>
      <div class="card text-bg-dark container border-0 mt-3">
      <img src="${image}" class="card-img img-fluid">
    </div>
    <p class="text-start fst-italic fw-normal">${name}</p>
      <h5 class="fw-normal mt-1">Esta acción es irreversible</h5>
    </div>
    
    <div class="modal-footer border-0">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
      <button type="button" onclick="deleteProduct('${id}')" class="btn btn-danger" data-bs-dismiss="modal">Eliminar</button>
    </div>`;
  }

window.deleteProduct = deleteProduct;