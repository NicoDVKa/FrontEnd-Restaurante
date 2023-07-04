import { ProductCardCart } from "../../components/productCardCart.js";
import { GetMercaderiaById } from "../../services/fetchMercaderiaServices.js";


 function cartBadgeHandler(){
    const cartBadge = document.getElementById("cart-badge");
    let comanda = JSON.parse(localStorage.getItem("comanda"));
    let comandaProducts = comanda?.map(i => i.quantity)
    let totalProducts = 0;
    let productsSum = comandaProducts?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      totalProducts
    );
    if (!comanda || productsSum == 0) {
      cartBadge.classList.add("d-none");
    } else {
      cartBadge.innerText = productsSum
      cartBadge.classList.remove("d-none");
    }
}

async function addProductToCart(id) {

    let comanda = JSON.parse(localStorage.getItem("comanda")) || [];
    let existingProduct = comanda.find((i) => i.productID == id);
    
    if (existingProduct) {
      const index = comanda.findIndex((i) => i.productID == id);
      comanda[index].quantity++;
    } else {
      let res = await GetMercaderiaById(id);
      let product = res.product;
      comanda.push({ productID: product.id, 
                     quantity: 1, 
                     productName : product.nombre,  
                     productImg : product.imagen,
                     productPrice : product.precio
                  });
    }
    localStorage.setItem("comanda", JSON.stringify(comanda));
    cartBadgeHandler();
}

function renderCartBody() {
 
    const cartBody = document.getElementById("cart-body");
    cartBody.innerHTML = "";
    const paymentDetails = document.getElementById("payment-details");
    let comanda = JSON.parse(localStorage.getItem("comanda"));
    let total = 0;
  
    if (comanda && comanda.length !== 0) {
  
      for (let i = 0; i < comanda.length; i++) {
        let product = {
          nombre : comanda[i].productName,
          precio : comanda[i].productPrice,
          imagen : comanda[i].productImg,
          id : comanda[i].productID
        }
        cartBody.innerHTML += ProductCardCart(product, comanda[i].quantity);
        total += comanda[i].quantity * product.precio;
      }
  
      let totalFormatted = total.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
      });
  
      paymentDetails.innerHTML = `<div class="d-flex justify-content-around">
        <h5 class="text-light mt-2">Total: ${totalFormatted}</h5>
        <a href="/views/finalizar-pedido.html">
        <button type="button" class="btn btn-dark me-4 rounded-5 border" id="finalizar-pedido">Finalizar pedido</button>
        </a>
      </div>`
  
    } else {
      cartBody.innerHTML = `<div class='text-center'>
       <h5 class='text-light'>Tu carrito está vacio</h5>
       </div>`;
      paymentDetails.innerHTML = ``; 
    }
}

function productSubtractHandler(id) {
    let comanda = JSON.parse(localStorage.getItem("comanda"));
    let productIndex = comanda.findIndex(i => i.productID == id)
    comanda[productIndex].quantity --;
    if (comanda[productIndex].quantity == 0) {
      comanda.splice(productIndex,1);
    } 
    
    localStorage.setItem("comanda", JSON.stringify(comanda))
    cartBadgeHandler();
    renderCartBody();
}

function productAddHandler(id) {
    let comanda = JSON.parse(localStorage.getItem("comanda"));
    let productIndex = comanda.findIndex(i => i.productID == id);
    comanda[productIndex].quantity ++;
    localStorage.setItem("comanda", JSON.stringify(comanda));
    cartBadgeHandler();
    renderCartBody() ;
}

function productRemoveHandler(id){
    let comanda = JSON.parse(localStorage.getItem("comanda"));
    let productIndex = comanda.findIndex(i => i.productID == id);
   comanda.splice(productIndex, 1);
   localStorage.setItem("comanda", JSON.stringify(comanda));
   cartBadgeHandler();
   renderCartBody() ;
}


export  {
    cartBadgeHandler,
    addProductToCart,
    renderCartBody,
    productSubtractHandler,
    productAddHandler,
    productRemoveHandler
};