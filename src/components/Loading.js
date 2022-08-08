export default class Loading {
  constructor(container) {
    this._container = document.querySelector(container);
  }

  show() {
    this._container.classList.add('loading');
  }

  hidden() {
    this._container.classList.remove('loading');
  }
}
