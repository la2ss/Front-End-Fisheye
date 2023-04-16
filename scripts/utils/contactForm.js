const contactModal = document.getElementById("contact_modal");
const modalBtn = document.querySelector(".open_btn");
const validBtn = document.querySelector(".valid_btn");
const closeBtn = document.querySelector(".close_btn");

const focuss = document.querySelector(".modal");

const first =  document.getElementById("first");
const firstError =  document.getElementById("error_first");
const last =  document.getElementById("last")
const lastError =  document.getElementById("error_last");
const email =  document.getElementById("email");
const emailError =  document.getElementById("error_email");
const message =  document.getElementById("message");
const messageError =  document.getElementById("error_message");

modalBtn.addEventListener("click", displayModal);
closeBtn.addEventListener("click", closeModal);

validBtn.addEventListener("click", onSubmit);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});


function onSubmit(event) {

let validEmail = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
let isValid = true;
 
  if (first.value === '' || first.value.length < 2){ 
  
    firstError.textContent ="Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    firstError.style.fontSize = "14px"; 
    firstError.style.color ="white"; 
    firstError.style.background ="red";  
    isValid = false;  
  }
  else{
    firstError.textContent ="";
    

  }
  if (last.value === '' || last.value.length < 2){ 

    lastError.textContent ="Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    lastError.style.fontSize = "14px"; 
    lastError.style.color ="white"; 
    lastError.style.background ="red";
    isValid = false;  
    
  }
  else{
    lastError.textContent ="";


  }
  if (validEmail.test(email.value)) {
    emailError.textContent =" ";
  }
  else  {
 
    emailError.textContent = "Vous devez renseigner une adresse mail.";
    emailError.style.fontSize = "14px"; 
    emailError.style.color ="white"; 
    emailError.style.background ="red";
    isValid = false;  

  } 
  if (message.value === '' || message.value.length < 2){ 
  
    messageError.textContent ="Veuillez écrire votre message.";
    messageError.style.fontSize = "14px"; 
    messageError.style.color ="white"; 
    messageError.style.background ="red";  
    isValid = false;  
  }
  else{
    messageError.textContent ="";
  }
  
  event.preventDefault();
 if (isValid) {
  validBtn.addEventListener("click", closeModal);
  //window.location.reload();
 }



}


function displayModal() {
  
	contactModal.style.display = "block";
  focuss.focus()
}

function closeModal() {
  
	contactModal.style.display = "none";
  
}

