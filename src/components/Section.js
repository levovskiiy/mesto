export default class Section {
  /**
   *
   * @param {Array} items
   * @param {(HTMLElement) => void} renderer
   * @param {string} selector
   */
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._handler = renderer;
    this._container = document.querySelector(selector);
  }

  clear() {
    this._container.innerHTML = '';
  }

  render() {
    this._items.forEach(item => {
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
