import Popup from './Popup';

export default class PopupWithImage extends Popup {
  constructor({ classes, imageSelector, captionSelector }, selector) {
    super(classes, selector);
    this._imageSelector = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  open({ caption, link }) {
    this._imageSelector.src = link;
    this._imageSelector.alt = caption;
    this._caption.textContent = caption;
    super.open();
  }
}
