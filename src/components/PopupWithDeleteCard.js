import Popup from './Popup';

export default class PopupWithDeleteCard extends Popup {
  constructor(classes, selector, submitHandler) {
    super(classes, selector);
    this._submitHandler = submitHandler;
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
