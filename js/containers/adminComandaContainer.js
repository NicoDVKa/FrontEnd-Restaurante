import { renderComandas } from "../inits/adminComandaInit.js";
import { GetAllComandasByDate } from "../services/fetchComandaServices.js";



export function listenersComandaContainer(comandasInit) {
  
    let comandas = comandasInit;
    let filteredComandasArray = [...comandas];

    const comandasTable = document.getElementById("comandas-table");
    const searchByDateForm = document.getElementById("search-by-date-form");
    const dateInput = document.getElementById("search-by-date-input");
    const searchByDeliveryOptions = document.getElementById("search-by-delivery-options");
    const searchByPriceComandas = document.getElementById("search-by-price-comandas");
    const searchOrderByDate = document.getElementById("search-by-date-order");


    dateInput.addEventListener("keypress", (e) => {
      if (dateInput.value.length == 4 && e.key !== "Backspace") {
        dateInput.value = dateInput.value + "-";
      } else if (dateInput.value.length == 7 && e.key !== "Backspace") {
        dateInput.value = dateInput.value + "-";
      }
    });
  
    const tableComandasBody = document.getElementById("table-comandas-body");
    const messageContainer = document.getElementById("message-container");
  
    searchByDateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      comandas = await GetAllComandasByDate(dateInput.value);
      if(dateInput.value){
        searchOrderByDate.disabled = true;
        searchOrderByDate.classList.add("d-none");
      }else{
        searchOrderByDate.classList.remove("d-none");
        searchOrderByDate.disabled = false;
      } 
      messageContainer.innerHTML = "";
      comandasTable.classList.remove("d-none");
      dateInput.classList.remove("is-invalid");

      if (comandas?.message) {
        dateInput.classList.add("is-invalid");
      } else if (comandas.length == 0) {
        tableComandasBody.innerHTML = "";
        messageContainer.innerHTML = `<div class="w-100 text-center">
      <h5 class="text-light">Lo sentimos,no hemos podido encontrar lo que buscabas.</h5>
    </div>`;
        comandasTable.classList.add("d-none");
      } else {
        
        filteredComandasArray = [...comandas];
        searchByDeliveryOptions.value = 0;
        searchByPriceComandas.value = "";
        searchOrderByDate.value = "";
        renderComandas(comandas);
      }
    });
  
    
  
    searchByDeliveryOptions.addEventListener("change", () => {
      messageContainer.innerHTML = "";
      comandasTable.classList.remove("d-none");
      filteredComandasArray = [...comandas];
  
      if (searchByDeliveryOptions.value == 0) {
        renderComandas(filteredComandasArray);
      } else {
        filteredComandasArray = filteredComandasArray.filter(
          (comanda) => comanda.formaEntrega.id == searchByDeliveryOptions.value
        );
      }
  
      if (filteredComandasArray.length > 0) {
        renderComandas(filteredComandasArray);
      } else {
        tableComandasBody.innerHTML = "";
        comandasTable.classList.add("d-none");
        messageContainer.innerHTML = `<div class="w-100 text-center">
      <h5 class="text-light">Lo sentimos,no hemos podido encontrar lo que buscabas.</h5>
    </div>`;
      }
    });
  
    
  
    searchByPriceComandas.addEventListener("change", () => {
      searchOrderByDate.value = "";
      if (searchByPriceComandas.value == "asc") {
        filteredComandasArray.sort((a, b) => a.total - b.total);
        renderComandas(filteredComandasArray);
      } else if (searchByPriceComandas.value == "desc") {
        filteredComandasArray.sort((a, b) => b.total - a.total);
        renderComandas(filteredComandasArray);
      }
    });


    searchOrderByDate.addEventListener("change", () => {
      searchByPriceComandas.value = "";
      if (searchOrderByDate.value == "asc") {
        filteredComandasArray.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        renderComandas(filteredComandasArray);
      } else if (searchOrderByDate.value == "desc") {
        filteredComandasArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        renderComandas(filteredComandasArray);
      }
    });
}