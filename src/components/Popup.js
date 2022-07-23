export default class Popup {
  constructor({ opened, closeButton }, popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButton);
    this._openedClass = opened;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.classList.add(this._openedClass);
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove(this._openedClass);
  }

  setEventListener() {
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', event =>
      this._handleOverlayClose(event)
    );
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
