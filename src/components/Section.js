export default class Section {
  /**
   * @param {(HTMLElement) => void} renderer
   * @param {string} selector
   */
  constructor(renderer, selector) {
    this._handler = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  render(items) {
    items.forEach(item => {
      this._handler(item);
    });
  }

  add(item) {
    this._container.append(item);
  }

  prepend(item) {
    this._container.prepend(item);
  }
}
