export default class FormValidator {
  /**
   * @constructor
   * @param {HTMLFormElement} form
   * @param {object} formSettings
   * @param {string} inputSelector - селектор поля ввода формы
   * @param {string} submitButtonSelector - селектор кнопки отправки формы
   * @param {string} inputErrorClass - класс для ошибки поля ввода
   * @param {string} errorClass - класс для подсказки ошибки
   */
  constructor(
    form,
    { inputSelector, submitButtonSelector, inputErrorClass, errorClass }
  ) {
    this._formElement = form;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  /**
   * Функция проверяет невалидно ли поле ввода.
   * @returns {boolean}
   * @private
   */
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  /**
   * Меняет состояние кнопки в зависимости от валидности полей формы.
   * @private
   */
  _toggleStateButton() {
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  /**
   * Показывает текст ошибки.
   * @param {HTMLInputElement} inputElement
   * @param {string} errorMessage
   * @private
   */
  _showErrorInput(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  /**
   * Скрывает текст ошибки
   * @param {HTMLInputElement} inputElement
   * @private
   */
  _hideErrorInput(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  /**
   * Проверяет поле ввода на валидность и показывает или скрывает текст ошибки.
   * @param inputElement
   * @private
   */
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorInput(inputElement, inputElement.validationMessage);
    } else {
      this._hideErrorInput(inputElement);
    }
  }

  /**
   * Устанавливает слушатели событий на форму и ее поля ввода.
   * @private
   */
  _setListenersForm() {
    this._toggleStateButton();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleStateButton();
        this._checkInputValidity(inputElement);
      });
    });
  }

  initialState() {
    this._inputList.forEach(input => {
      this._hideErrorInput(input);
      this._toggleStateButton();
    });
  }

  /**
   * Метод включает валидацию формы.
   */
  enableValidation() {
    this._setListenersForm();
  }
}
