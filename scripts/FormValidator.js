export default class FormValidator {
  /**
   * @constructor
   * @param {string} formSelector - селектор класса формы
   * @param {string} inputSelector - селектор поля ввода формы
   * @param {string} submitButtonSelector - селектор кнопки отправки формы
   * @param {string} inactiveButtonClass - класс неактивной кнопки
   * @param {string} inputErrClass - класс для ошибки поля ввода
   * @param {string} errorClass - класс для подсказки ошибки
   */
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._forms = document.querySelectorAll(this._formSelector);
  }

  /**
   * Функция проверяет невалидно ли поле ввода.
   * @param {HTMLInputElement[]} inputList
   * @returns {boolean}
   * @private
   */
  _hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  /**
   * Меняет состояние кнопки в зависимости от валидности полей формы.
   * @param {HTMLInputElement[]} inputList
   * @param {HTMLButtonElement} buttonElement
   * @private
   */
  _toggleStateButton(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  /**
   * Показывает текст ошибки.
   * @param {HTMLFormElement} formElement
   * @param {HTMLInputElement} inputElement
   * @param {string} errorMessage
   * @private
   */
  _showErrorInput(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  /**
   * Скрывает текст ошибки
   * @param {HTMLFormElement} formElement
   * @param {HTMLInputElement} inputElement
   * @private
   */
  _hideErrorInput(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /**
   * Проверяет поле ввода на валидность и показывает или скрывает текст ошибки.
   * @param formElement
   * @param inputElement
   * @private
   */
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorInput(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideErrorInput(formElement, inputElement);
    }
  }

  /**
   * Устанавливает слушатели событий на форму и ее поля ввода.
   * @param {HTMLFormElement} formElement
   * @param {HTMLInputElement[]} inputList
   * @param {HTMLButtonElement} buttonElement
   * @private
   */
  _setListenersForm(formElement, inputList, buttonElement) {
    formElement.addEventListener('submit', event => {
      event.preventDefault();
      event.target.reset();
      this._toggleStateButton(inputList, buttonElement);
    });

    formElement.addEventListener('reset', event => {
      event.target.reset();
      this._toggleStateButton(inputList, buttonElement);
    });

    this._toggleStateButton(inputList, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleStateButton(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  }

  /**
   * Метод включает валидацию для всех форм на странице.
   */
  enableValidation() {
    this._forms.forEach(formElement => {
      const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
      const buttonElement = formElement.querySelector(this._submitButtonSelector);

      this._setListenersForm(formElement, inputList, buttonElement);
    });
  }
}
