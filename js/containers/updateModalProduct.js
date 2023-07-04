import { UpdateMercaderia, GetMercaderiaById } from "../services/fetchMercaderiaServices.js";
import { nameValidation } from "../helpers/validators/nameValidation.js";
import { maxLengthValidation } from "../helpers/validators/maxLengthValidation.js";
import { validateIntMaxValue } from "../helpers/validators/validateIntMaxValue.js";
import { Spinner } from "../components/spinner.js";
import { renderProducts } from "../inits/adminProductoInit.js";

export async function listenersModalUpdateProduct(successModal,successModalTextContainer, errorModal, errorModalTextContainer)
{
    const editNameInput = document.getElementById("edit-name-input");
    const editIdForm = document.getElementById("edit-id");
    const editPriceInput = document.getElementById("edit-price-input");
    const editCategorySelect = document.getElementById("edit-category");
    const editCategorySelectDefaultValue = document.getElementById("edit-default-value");
    const editIngredientsTextarea = document.getElementById("edit-ingredients-textarea");
    const ingredientsCaracterCount = document.getElementById("ingredients-character-count");
    const editRecipeTextarea = document.getElementById("edit-recipe-textarea");
    const recipeCaracterCount = document.getElementById("recipe-character-count");
    const editImageInput = document.getElementById("edit-image-input");
    const editImagePreview = document.getElementById("edit-image-preview");
    const submitEditBtn = document.getElementById("submit-edit-btn");
    
    editIngredientsTextarea.addEventListener("keyup", () => {
      ingredientsCaracterCount.innerText = editIngredientsTextarea.value.length;
    });
    
    editRecipeTextarea.addEventListener("keyup", () => {
      recipeCaracterCount.innerText = editRecipeTextarea.value.length;
    });
    
    const editForm = document.getElementById("edit-form");
    
    editImageInput.addEventListener("keyup", () => {
      editImagePreview.src = editImageInput.value;
    });
    
    let editModal = new bootstrap.Modal(document.getElementById("edit-product-modal"));
    
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();
    
      editNameInput.classList.remove("is-invalid");
      editPriceInput.classList.remove("is-invalid");
      editIngredientsTextarea.classList.remove("is-invalid");
      editRecipeTextarea.classList.remove("is-invalid");
      editImageInput.classList.remove("is-invalid");
    
      if (!nameValidation(editNameInput.value)) {
        return editNameInput.classList.add("is-invalid");
      }
    
      if (!validateIntMaxValue(editPriceInput.value)) {
        return editPriceInput.classList.add("is-invalid");
      }
    
      if (!maxLengthValidation(editIngredientsTextarea.value)) {
        return editIngredientsTextarea.classList.add("is-invalid");
      }
    
      if (!maxLengthValidation(editRecipeTextarea.value)) {
        return editRecipeTextarea.classList.add("is-invalid");
      }
    
      if (!maxLengthValidation(editImageInput.value)) {
        return editImageInput.classList.add("is-invalid");
      }
    
      submitEditBtn.disabled = true;
      submitEditBtn.innerHTML = Spinner() + " Guardando cambios";
      const submitObj = {
        nombre: editNameInput.value,
        tipo: editCategorySelect.value,
        precio: editPriceInput.value,
        ingredientes: editIngredientsTextarea.value,
        preparacion: editRecipeTextarea.value,
        imagen: editImageInput.value,
      };
    
      const res = await UpdateMercaderia(submitObj, parseInt(editIdForm.value));
      if (res.status == 200) {
      submitEditBtn.disabled = false;
        submitEditBtn.innerHTML = "Guardar cambios";
        successModalTextContainer.innerHTML = `<h4>El producto ha sido modificado exitosamente!</h4>`;
        successModal.show();
        editModal.hide();
        renderProducts();
        setTimeout(() => {
          successModal.hide();
        }, 3500);
      } else if (res?.body?.message) {
        submitEditBtn.disabled = false;
        submitEditBtn.innerHTML = "Guardar cambios";
        errorModal.show();
        errorModalTextContainer.innerHTML = `<h4>${res.body.message}</h4>`;
        setTimeout(() => {
          errorModal.hide();
        }, 3500);
      } else {
        submitEditBtn.disabled = false;
        submitEditBtn.innerHTML = "Guardar cambios";
        errorModal.show();
        errorModalTextContainer.innerHTML = `<h4>Lo sentimos, ha ocurrido un error</h4>`;
        setTimeout(() => {
          errorModal.hide();
        }, 3500);
      }
    });
}

export async function renderEditModalBody(id) {
    const editForm = document.getElementById("edit-form");
    const editNameInput = document.getElementById("edit-name-input");
    const editIdForm = document.getElementById("edit-id");
    const editPriceInput = document.getElementById("edit-price-input");
    const editCategorySelectDefaultValue = document.getElementById("edit-default-value");
    const editIngredientsTextarea = document.getElementById("edit-ingredients-textarea");
    const ingredientsCaracterCount = document.getElementById("ingredients-character-count");
    const editRecipeTextarea = document.getElementById("edit-recipe-textarea");
    const recipeCaracterCount = document.getElementById("recipe-character-count");
    const editImageInput = document.getElementById("edit-image-input");
    const editImagePreview = document.getElementById("edit-image-preview");
    editForm.reset()
    let response = await GetMercaderiaById(id);
    let product = response.product;
    editNameInput.value = product.nombre;
    editIdForm.value = product.id;
    editPriceInput.value = product.precio;
    editCategorySelectDefaultValue.value = product.tipo.id;
    editCategorySelectDefaultValue.innerHTML = product.tipo.descripcion;
    editIngredientsTextarea.value = product.ingredientes;
    editRecipeTextarea.value = product.preparacion;
    editImageInput.value = product.imagen;
    editImagePreview.src = product.imagen;
    ingredientsCaracterCount.innerText = editIngredientsTextarea.value.length;
    recipeCaracterCount.innerText = editRecipeTextarea.value.length;
}