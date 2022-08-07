import Popup from './Popup';

export default class PopupWithDeleteCard extends Popup {
  constructor(classes, selector, submitHandler) {
    super(classes, selector);
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

  setEventListener() {
    super.setEventListener();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitHandler(this._element);
    });
  }

  open(card) {
    this._element = card;
    super.open();
  }
}
