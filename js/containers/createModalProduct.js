import { CreateMercaderia } from "../services/fetchMercaderiaServices.js";
import { nameValidation } from "../helpers/validators/nameValidation.js";
import { maxLengthValidation } from "../helpers/validators/maxLengthValidation.js";
import { validateIntMaxValue } from "../helpers/validators/validateIntMaxValue.js";
import { Spinner } from "../components/spinner.js";
import { renderProducts } from "../inits/adminProductoInit.js";


export async function listenersModalCreateProduct(successModal,successModalTextContainer, errorModal, errorModalTextContainer){
    const createProductForm = document.getElementById("create-product-form");
    const createNameInput = document.getElementById("create-name-input");
    const createPriceInput = document.getElementById("create-price-input");
    const createCategorySelect = document.getElementById("create-category-select");
    const createIngredientsTextarea = document.getElementById("create-ingredients-textarea");
    const ingredientsCharacterCount = document.getElementById("create-ingredients-character-count")
    const createRecipeTextarea = document.getElementById("create-recipe-textarea");
    const recipeCharacterCount = document.getElementById("create-recipe-character-count")
    const createImageInput = document.getElementById("create-image-input");
    const createImagePreview = document.getElementById("create-image-preview");
    
    createIngredientsTextarea.addEventListener("keyup",()=>{
      ingredientsCharacterCount.innerText = createIngredientsTextarea.value.length
    })
    
    createRecipeTextarea.addEventListener("keyup",()=>{
      recipeCharacterCount.innerText = createRecipeTextarea.value.length
    })
    
    createImageInput.addEventListener("keyup", () => {
      createImagePreview.src = createImageInput.value;
    });
    
    const submitCreateProductBtn = document.getElementById("submit-create-product-btn");
    
    let createModal = new bootstrap.Modal(document.getElementById("create-product-modal"));
    
    createProductForm.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      createNameInput.classList.remove("is-invalid");
      createPriceInput.classList.remove("is-invalid");
      createIngredientsTextarea.classList.remove("is-invalid");
      createRecipeTextarea.classList.remove("is-invalid");
      createImageInput.classList.remove("is-invalid");
      createCategorySelect.classList.remove("is-invalid");
    
      if (!nameValidation(createNameInput.value)) {
        return createNameInput.classList.add("is-invalid");
      }
    
      if (!validateIntMaxValue(createPriceInput.value)) {
        return createPriceInput.classList.add("is-invalid");
      }
    
      if (!createCategorySelect.value) {
        return createCategorySelect.classList.add("is-invalid");
      }
    
      if (!maxLengthValidation(createIngredientsTextarea.value)) {
        return createIngredientsTextarea.classList.add("is-invalid");
      }
    
      if (!maxLengthValidation(createRecipeTextarea.value)) {
        return createRecipeTextarea.classList.add("is-invalid");
      }
    
      if (!maxLengthValidation(createImageInput.value)) {
        return createImageInput.classList.add("is-invalid");
      }
      const createObj = {
        nombre: createNameInput.value,
        tipo: createCategorySelect.value,
        precio: createPriceInput.value,
        ingredientes: createIngredientsTextarea.value,
        preparacion: createRecipeTextarea.value,
        imagen: createImageInput.value,
      };
      submitCreateProductBtn.disabled = true;
      submitCreateProductBtn.innerHTML = Spinner() + "Creando producto";
      const res = await CreateMercaderia(createObj);
  
      if (res.status == 201) {
        createModal.hide();
        successModalTextContainer.innerHTML = `<h4>El producto ha sido creado exitosamente!</h4>`;
        successModal.show();
        renderProducts();
        setTimeout(() => {
          successModal.hide();
        }, 3500);
      } else if (res?.body?.message) {
        submitCreateProductBtn.disabled = false;
        submitCreateProductBtn.innerHTML = "Crear producto";
        errorModal.show();
        errorModalTextContainer.innerHTML = `<h4>${res.body.message}</h4>`;
        setTimeout(() => {
          errorModal.hide();
        }, 3500);
      } else {
        submitCreateProductBtn.disabled = false;
        submitCreateProductBtn.innerHTML = "Crear producto";
        errorModal.show();
        errorModalTextContainer.innerHTML = `<h4>Lo sentimos, ha ocurrido un error</h4>`;
        setTimeout(() => {
          errorModal.hide();
        }, 3500);
      }
      submitCreateProductBtn.disabled = false;
      submitCreateProductBtn.innerHTML = "Crear producto";
    });
}
