import { GetComandaById } from "../services/fetchComandaServices.js";

export function tableComandasRow(comanda) {
    return `<tr>
      <td class="text-center">${comanda.id}</td>
      <td class="text-center">${comanda.formaEntrega.descripcion}</td>
      <td class="text-center">$${comanda.total.toLocaleString()}</td>
      <td class="text-center">${comanda.fecha.slice(0, 10)}</td>
      <td class="text-center"><button type="button" data-bs-toggle="modal" data-bs-target="#comanda-modal" onclick="renderDetailsModal('${comanda.id}')" 
      class="btn btn-dark rounded-5 border" id="comandas-btn">Ver detalle</button></td>
    </tr>`;
}

async function renderDetailsModal(id) {
    let comanda = await GetComandaById(id);
    let products = [];
    let comandaModalTitle = document.getElementById("comanda-modal-title");
    let tableComandasModal = document.getElementById("table-comandas-modal");
    comandaModalTitle.innerText = comanda.id;
    tableComandasModal.innerHTML = "";
  
    const productsId = [];
    for (let i = 0; i < comanda.mercaderias.length; i++) {
      productsId.push(comanda.mercaderias[i].id);
    }
  
    const uniqueProducts = [...new Set(productsId)];
    uniqueProducts.map((i) =>
      products.push({
        id: i,
        plate: "",
        unitPrice: 0,
        quantity: 0,
        totalPrice: 0,
      })
    );
  
    for (let i = 0; i < comanda.mercaderias.length; i++) {
      for (let j = 0; j < uniqueProducts.length; j++) {
        if (comanda.mercaderias[i].id == products[j].id) {
          products[j].unitPrice = comanda.mercaderias[i].precio;
          products[j].plate = comanda.mercaderias[i].nombre;
          products[j].totalPrice += comanda.mercaderias[i].precio;
          products[j].quantity++;
        }
      }
    }
  
    products.map(
      (i) =>
        (tableComandasModal.innerHTML += `
  <td><a href="/views/detalle-producto.html?id=${i.id}"> ${i.plate}</a></td>
  <td class="text-center">$${i.unitPrice.toLocaleString()}</td>
  <td class="text-center">${i.quantity}</td>
  <td class="text-center">$${i.totalPrice.toLocaleString()}</td>
  `)
    );
}
window.renderDetailsModal = renderDetailsModal;