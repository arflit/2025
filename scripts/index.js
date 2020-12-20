const form = document.forms.petitionCheck;
const petitionField = form.elements.petition;
const resetButton = document.querySelector('#resetButton');
const formSection = document.querySelector('.form');
const about = document.querySelector('.about');
const checkresult = document.querySelector('.checkresult');
const analytics = document.querySelector('.analytics');
const testButton = document.querySelector('.about__testbutton');
const resultSection = document.querySelector('.checkresult');
const backButton = document.querySelector('.checkresult__backbutton');
const rowContainer = resultSection.querySelector('.checkresult__rowcontainer');
import { CheckLine } from './CheckLine.js';
/* import { FormValidator } from './FormValidator.js';
const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: '',
  inputErrorClass: '',
  errorClass: 'form__error_visible'
}
const formValidation = new FormValidator(validationSettings, form);
formValidation.enableValidation(); */

const testText = `Безмолвное море, лазурное море,
Стою очарован над бездной твоей.
Ты живо; ты дышишь; смятенной любовью,
Тревожною думой наполнено ты.
Безмолвное море, лазурное море,
Открой мне глубокую тайну твою.
Что движет твое необъятное лоно?
Чем дышит твоя напряженная грудь?
Иль тянет тебя из земныя неволи
Далекое, светлое небо к себе?..
Таинственной, сладостной полное жизни,
Ты чисто в присутствии чистом его:
Ты льешься его светозарной лазурью,
Вечерним и утренним светом горишь,
Ласкаешь его облака золотые
И радостно блещешь звездами его.
Когда же сбираются темные тучи,
Чтоб ясное небо отнять у тебя -
Ты бьешься, ты воешь, ты волны подъемлешь,
Ты рвешь и терзаешь враждебную мглу...
И мгла исчезает, и тучи уходят,
Но, полное прошлой тревоги своей,
Ты долго вздымаешь испуганны волны,
И сладостный блеск возвращенных небес
Не вовсе тебе тишину возвращает;
Обманчив твоей неподвижности вид:
Ты в бездне покойной скрываешь смятенье,
Ты, небом любуясь, дрожишь за него.`;

function checkRow() {
  const number = Math.random();
  const isGood = (number < 0.7);
  return isGood;
}

function addRow(textLine, number, isgood) {
  const newRow = new CheckLine(textLine, number, isgood);
  rowContainer.append(newRow.generateRow());
}

function showResult(rowList) {
  while (rowContainer.firstChild) {rowContainer.removeChild(rowContainer.firstChild);}
  rowList.forEach(function(row, number) {
    if (row) {
      const isGood = checkRow();
      addRow(row, number, isGood);
    }
  });
  formSection.classList.add('hidden');
  about.classList.add('hidden');
  checkresult.classList.remove('hidden');
  analytics.classList.remove('hidden');
}

function showForm() {
  formSection.classList.remove('hidden');
  about.classList.remove('hidden');
  checkresult.classList.add('hidden');
  analytics.classList.add('hidden');
}

testButton.addEventListener('click', function() {
  petitionField.value = testText;
})

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const petitionText = petitionField.value;
  const rowList = petitionText.split('\n'); 
  showResult(rowList);
});

backButton.addEventListener('click', showForm);
resetButton.addEventListener('click', function() {
  form.reset();
  showForm();
});



