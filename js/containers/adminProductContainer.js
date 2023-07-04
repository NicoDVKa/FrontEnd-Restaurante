import { renderProducts } from "../inits/adminProductoInit.js";


export async function listenersAdminProductContainer() {

    const searchProductForm = document.getElementById("search-product-form");
    const searchProductInput = document.getElementById("search-product-input");
    const searchProductByCategory = document.getElementById("search-product-by-category");
    const searchProductByPrice = document.getElementById("search-product-by-price");
  
    searchProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await renderProducts(
        searchProductInput.value,
        searchProductByCategory.value,
        searchProductByPrice.value
      );
    });
  
    searchProductByCategory.addEventListener("change", async() =>
      await renderProducts(
        searchProductInput.value,
        searchProductByCategory.value,
        searchProductByPrice.value
      )
    );
    searchProductByPrice.addEventListener("change", async () =>
      await renderProducts(
        searchProductInput.value,
        searchProductByCategory.value,
        searchProductByPrice.value
      )
    );
  
    await renderProducts("", "", "");
}