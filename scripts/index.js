const form = document.forms.petitionCheck;
const resetButton = document.querySelector('#resetButton');
const formSection = document.querySelector('.chcekform');
const resultSection = document.querySelector('.checkresult');


import { FormValidator } from './FormValidator.js';
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: '',
  inputErrorClass: '',
  errorClass: 'form__error_visible'
}
const formValidation = new FormValidator(validationSettings, form);
formValidation.enableValidation();


function showResult() {
  formSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
}

function showForm() {
  form.reset();
  formSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
}

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  showResult();
});

resetButton.addEventListener('click', function() {
  showForm();
});