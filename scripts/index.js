const form = document.forms.petitionCheck;
const petitionField = form.elements.petition;
const resetButton = document.querySelector('#resetButton');
const formSection = document.querySelector('.chcekform');
const resultSection = document.querySelector('.checkresult');
const rowContainer = resultSection.querySelector('.checkresult__container');
import { FormValidator } from './FormValidator.js';
import { CheckLine } from './CheckLine.js';

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: '',
  inputErrorClass: '',
  errorClass: 'form__error_visible'
}
const poets = ['А.С.Пушкин', 'М.Ю.Лермонтов', 'В.А.Жуковский', 'А.А.Блок', 'М.И.Цветаева', 'В.В.Маяковский'];

const formValidation = new FormValidator(validationSettings, form);
formValidation.enableValidation();

function addRow(textLine, source) {
  const newRow = new CheckLine(textLine, source);
  rowContainer.append(newRow.generateRow());
}

function getRandom(poets) {
  const rand = Math.floor(Math.random() * poets.length);
  return poets[rand];
}

function showResult(rowList) {
  while (rowContainer.firstChild) {rowContainer.removeChild(rowContainer.firstChild);}
  rowList.forEach(function(row) {
    addRow(row, getRandom(poets));
  });
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
  const petitionText = petitionField.value;
  const rowList = petitionText.split('\n'); 
  showResult(rowList);
});

resetButton.addEventListener('click', function() {
  showForm();
});



