import { renderEditModalBody } from "../containers/updateModalProduct.js";
import { renderDeleteProductBody } from "../components/modalDeleteProduct.js";

export function tableProductsRow(product) {
    return `<tr>
    <td class="text-center">${product.id}</td>
    <td><a href="/views/detalle-producto.html?id=${product.id}"> ${
      product.nombre
    }</a></td>
      <td class="text-center">${product.tipo.descripcion}</td>
      <td class="text-center">$${product.precio.toLocaleString()}</td>
      <td class="text-center">  <button type="button" class="btn btn-primary me-1" data-bs-toggle="modal" data-bs-target="#edit-product-modal"  onclick="renderEditModalBody('${
        product.id
      }')">Editar<i class="bi bi-pencil ms-1"></i></button> <button type="button" class="btn btn-danger ms-1" data-bs-toggle="modal" data-bs-target="#delete-product-modal" onclick="renderDeleteProductBody('${
      product.imagen
    }','${product.nombre}','${
      product.id
    }')">Eliminar<i class="bi bi-trash ms-1"></i></button> </td>
    </tr>`;
}

window.renderEditModalBody = renderEditModalBody;
window.renderDeleteProductBody = renderDeleteProductBody; 