export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._handler = renderer;
    this._container = document.querySelector(selector);
  }

  render() {
    this._renderer();
  }

  add(item) {
    this._container.append(item);
  }
}
