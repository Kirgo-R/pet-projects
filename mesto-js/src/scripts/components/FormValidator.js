export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector
    this._inputSelector = config.inputSelector
    this._submitButtonSelector = config.submitButtonSelector
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._errorClass = config.errorClass
    this._form = form
    this._inputsArray = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    )
    this._submitButton = this._form.querySelector(this._submitButtonSelector)
  }

  _checkInputValidity(input) {
    const errorMessage = document.querySelector(`#${input.id}-error`)

    if (input.checkValidity()) {
      input.classList.remove(this._inputErrorClass)
      errorMessage.classList.remove(this._errorClass)
      errorMessage.textContent = ''
    } else {
      input.classList.add(this._inputErrorClass)
      errorMessage.classList.add(this._errorClass)
      errorMessage.textContent = input.validationMessage
    }
  }

  _toggleButtonValidity() {
    if (this._form.checkValidity()) {
      this.enableButton()
    } else {
      this.disableButton()
    }
  }

  _setValidationListener(input) {
    input.addEventListener('input', () => {
      this._checkInputValidity(input)
      this._toggleButtonValidity()
    })
  }

  disableButton() {
    this._submitButton.setAttribute('disabled', '')
    this._submitButton.classList.add(this._inactiveButtonClass)
  }

  enableButton() {
    this._submitButton.removeAttribute('disabled')
    this._submitButton.classList.remove(this._inactiveButtonClass)
  }

  enableValidation() {
    this._inputsArray.forEach((input) => {
      this._setValidationListener(input)
    })
  }

  resetValidation() {
    this._inputsArray.forEach((input) => {
      const errorMessage = document.querySelector(`#${input.id}-error`)
      input.classList.remove(this._inputErrorClass)
      errorMessage.classList.remove(this._errorClass)
      errorMessage.textContent = ''
    })
  }
}
