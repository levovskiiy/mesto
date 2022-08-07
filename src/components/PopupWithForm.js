import Popup from './Popup';

export default class PopupWithForm extends Popup {
  constructor({ classes, formSelector, inputSelector }, popupSelector, submitHandler) {
    super(classes, popupSelector);
    this._form = this._popup.querySelector(formSelector);
    this._inputList = [...this._form.querySelectorAll(inputSelector)];
    this._submitHandler = submitHandler;
    this._submitButton = this._popup.querySelector('.popup__button_operation_submit');
    this._submitButtonText = this._submitButton?.querySelector('.popup__button-text');
  }

  handleSubmitButtonState(isLoading) {
    if (isLoading) {
      this._submitButtonText.classList.add('popup__button-text_hidden');
      this._submitButton.classList.add('popup__button_state_loading');
    } else {
      this._submitButtonText.classList.remove('popup__button-text_hidden');
      this._submitButton.classList.remove('popup__button_state_loading');
    }
  }

  setInputList(values) {
    this._inputList.forEach(input => {
      input.value = values[input.name] ?? '';
    });
  }

  open(values = {}) {
    super.open();
    this.setInputList(values);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListener() {
    super.setEventListener();

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._getFormValues());
    });
  }

  _getFormValues() {
    return this._inputList.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }
}
