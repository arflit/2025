import Api from './Api.js';
import Analytics from './Analytics.js';

// todo: move to util/constants.js module
const baseApiUrl = 'https://backend-2025.herokuapp.com/api/';
const apiObject = new Api(baseApiUrl);

const citateGoodThreshold = 50;

const analytics = new Analytics();

const form = document.forms.petitionCheck;
const counter = document.querySelector('.form__counter');
const petitionField = form.elements.petition;
const resetButton = document.querySelector('#resetButton');
const formSection = document.querySelector('.form');
const about = document.querySelector('.about');
const checkresult = document.querySelector('.checkresult');
const testButton = document.querySelector('.about__testbutton');
const clearButton = document.querySelector('.form__clearbutton');
const resultSection = document.querySelector('.checkresult');
const backButton = document.querySelector('.checkresult__backbutton');
const rowContainer = resultSection.querySelector('.checkresult__rowcontainer');

//todo: import'ы лучше делать до всех объявлений
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

function addRow(textLine, number, isgood) {
  const newRow = new CheckLine(textLine, number, isgood);
  rowContainer.append(newRow.generateRow());
}

function showResult(rowList) {
  // fyi: если хочешь почистить содержимое контейнера, то можно просто сделать 
  // rowContainer.innerHTML = ''; 
  while (rowContainer.firstChild) {rowContainer.removeChild(rowContainer.firstChild);}

  const rowListPromises = rowList.map(function (rowItem) {
    if (rowItem) {
      return apiObject.verifyCitate(rowItem);
    }
  });  

  Promise.all(rowListPromises)
    .then((citatesOutputs) => {
      let goodCount = 0;
      citatesOutputs.forEach(function(row, i) {
          const isGood = row['score'] >= citateGoodThreshold;
          if (isGood) {
            goodCount += 1;
          }
          const number = i + 1;
          addRow(row['query'], number, isGood);
      });

      if (citatesOutputs) {
        analytics.setCorrectPercent(100*goodCount/citatesOutputs.length);
      }

      formSection.classList.add('hidden');
      about.classList.add('hidden');
      checkresult.classList.remove('hidden');
      analytics.show();
    })
    .catch((err) => { 
      //todo: тут надо сделать показ всплывающего окна с ошибками api
      console.log(err);
    })
}

function showForm() {
  formSection.classList.remove('hidden');
  about.classList.remove('hidden');
  checkresult.classList.add('hidden');
  analytics.hide();
}

testButton.addEventListener('click', function() {
  petitionField.value = testText;
  countInput(testText);
})

clearButton.addEventListener('click', () => {
  form.reset();
  countInput('');
})

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const petitionText = petitionField.value;
  const rowList = petitionText.split('\n'); 
  showResult(rowList);
});

function countInput(text) {
  const count = text.length;
  counter.textContent = `${count} / 1000`;
  if (count >= 1000) {
    counter.classList.add('form__counter_err');
  } else {
    counter.classList.remove('form__counter_err');
  }
}

petitionField.addEventListener('input', () => {
  const text = petitionField.value;
  countInput(text);
})

backButton.addEventListener('click', showForm);
resetButton.addEventListener('click', function() {
  form.reset();
  showForm();
});



