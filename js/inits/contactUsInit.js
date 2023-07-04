import { emailValidation } from "../helpers/validators/emailValidation.js";
import { nameValidation } from "../helpers/validators/nameValidation.js";
import { Spinner } from "../components/spinner.js";

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const messageTextArea = document.getElementById("message-textarea");
const sendMessageBtn = document.getElementById("send-message-btn");
const messageCaracterCount = document.getElementById("message-character-count");

let successModal = new bootstrap.Modal(document.getElementById("success-modal"));
const successModalTextContainer = document.getElementById("success-modal-body-text");

let errorModal = new bootstrap.Modal(document.getElementById("error-modal"));
const errorModalTextContainer = document.getElementById("error-modal-body-text");

messageTextArea.addEventListener("keyup", () => {
  messageCaracterCount.innerText = messageTextArea.value.length;
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessageBtn.disabled = false
  sendMessageBtn.innerHTML = "Enviar";
  nameInput.classList.remove("is-invalid");
  lastNameInput.classList.remove("is-invalid");
  emailInput.classList.remove("is-invalid");
  messageTextArea.classList.remove("is-invalid");

  if (!nameValidation(nameInput.value)) {
    return nameInput.classList.add("is-invalid");
  }

  if (!nameValidation(lastNameInput.value)) {
    return lastNameInput.classList.add("is-invalid");
  }
  if (!emailValidation(emailInput.value)) {
    return emailInput.classList.add("is-invalid");
  }

  if (messageTextArea.value.length < 1 || messageTextArea.value.length > 400) {
    return messageTextArea.classList.add("is-invalid");
  }

  const message = {
  first_name: nameInput.value,
  last_name: lastNameInput.value,
  email: emailInput.value,
  message: messageTextArea.value,
};
sendMessageBtn.disabled = true
sendMessageBtn.innerHTML = Spinner() + "Enviando";

emailjs.send("service_06torn5", "template_dtawmbt", message).then(
  function (response) {
    sendMessageBtn.disabled = false
    sendMessageBtn.innerHTML = "Enviar";
    contactForm.reset()

    successModalTextContainer.innerHTML = `<h4>Su mensaje ha sido enviado correctamente!</h4>`;
        successModal.show();
        setTimeout(() => {
          successModal.hide();
        }, 3500);
  },
  function (error) {
    sendMessageBtn.disabled = false
    sendMessageBtn.innerHTML = "Enviar";

    errorModal.show();
        errorModalTextContainer.innerHTML = `<h4>Lo sentimos, ha ocurrido un error</h4>`;
        setTimeout(() => {
          errorModal.hide();
        }, 3500);
  }
);
});




