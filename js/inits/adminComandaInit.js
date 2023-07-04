import { GetAllComandasByDate } from "../services/fetchComandaServices.js";
import { listenersComandaContainer } from "../containers/adminComandaContainer.js";
import { renderComandasSearchBar } from "../components/comandaSearchBar.js";
import { tableComandasRow } from "../components/tableRowComanda.js";
import { SpinnerWithText } from "../components/spinner.js";

let comandas;
const componentContainer = document.getElementById("admin-component-container");

export function renderComandas(array) {
  const tableComandasBody = document.getElementById("table-comandas-body");
  tableComandasBody.innerHTML = "";
  array.map((i) => (tableComandasBody.innerHTML += tableComandasRow(i)));
}

document.addEventListener("DOMContentLoaded", async () => {
    componentContainer.innerHTML = renderComandasSearchBar();
    componentContainer.innerHTML += SpinnerWithText("Comandas");
    comandas = await GetAllComandasByDate();
    renderComandas(comandas);
    componentContainer.lastElementChild.remove();
    listenersComandaContainer(comandas);
});


