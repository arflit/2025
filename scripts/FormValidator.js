export class FormValidator {
  constructor (settings, formElement) {
    this._formElement = formElement; //вся форма
    this._inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); //массив с полями ввода формы
    /* this._inactiveButtonClass = settings.inactiveButtonClass; */
    this._buttonElement = formElement.querySelector(settings.submitButtonSelector);
    /* this._inputErrorClass = settings.inputErrorClass; */
    this._errorClass = settings.errorClass; 
  } 

  _enableButton() {
    /* this._buttonElement.classList.remove(this._inactiveButtonClass); */
    this._buttonElement.removeAttribute('disabled');
  }
  
  _disableButton() {
    /* this._buttonElement.classList.add(this._inactiveButtonClass); */
    this._buttonElement.setAttribute('disabled', '');
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _showInputError(field) {
    const errorElement = this._formElement.querySelector(`.${field.id}-error`);
    /* field.classList.add(this._inputErrorClass); */
    errorElement.textContent = field.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(field) {
    const errorElement = this._formElement.querySelector(`.${field.id}-error`);
    /* field.classList.remove(this._inputErrorClass); */
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(field) {
    if (!field.validity.valid) {
      this._showInputError(field);
    } else {
      this._hideInputError(field);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation () {
    this._setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._disableButton();
    });
    this._toggleButtonState();
  }
}

