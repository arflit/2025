const form = document.forms.petitionCheck;
const formElement = document.querySelector('.form');
const about = document.querySelector('.about');
const checkresult = document.querySelector('.checkresult');
const analytics = document.querySelector('.analytics');
const backButton = document.querySelector('.checkresult__backbutton');
const acceptButton = document.querySelector('.analytics__accept-button');

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
  formElement.classList.add('hidden');
  about.classList.add('hidden');
  checkresult.classList.remove('hidden');
  analytics.classList.remove('hidden');
});

function closeResult() {
  formElement.classList.remove('hidden');
  about.classList.remove('hidden');
  checkresult.classList.add('hidden');
  analytics.classList.add('hidden');
}

backButton.addEventListener('click', closeResult);
acceptButton.addEventListener('click', function() {
  form.reset();
  closeResult();
});