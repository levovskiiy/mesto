export default class Card {
  /**
   * @constructor
   * @param {object} settings
   * @param {string} selector
   * @param {function} openPopupHandler
   */
  constructor({ name, link }, openPopupHandler, selector) {
    this._namePlace = name;
    this._linkImage = link;
    this._selector = selector;
    this._openPopupHandler = openPopupHandler;
  }

  /**
   * Находит template по заданному селектору и возвращает копию его содержимого
   * @returns {object}
   * @private
   */
  _getTemplate() {
    return document
      .querySelector(this._selector)
      .content.querySelector('.card-list__item')
      .cloneNode(true);
  }

  /**
   * Метод обработки события по клику на картинку. Открывает Popup с картинкой и описанием.
   * @private
   */
  _open() {
    this._openPopupHandler({
      link: this._linkImage,
      caption: this._namePlace,
    });
  }

  /**
   * Меняет состояние иконки лайка.
   * @private
   */
  _like() {
    this._likeButtonElement.classList.toggle(
      'card-list__button-like_state_active'
    );
  }

  /**
   * Удаляет элемент из DOM.
   * @private
   */
  _delete() {
    this._element.remove();
    this._element = null;
  }

  /**
   * Вешает все необходимые обработчики карточки.
   * @private
   */
  _setCardListeners() {
    this._imageElement.addEventListener('click', () => this._open());
    this._likeButtonElement.addEventListener('click', () => this._like());
    this._trashButtonElement.addEventListener('click', () => this._delete());
  }

  /**
   * Наполняет карточку данными и возвращает элемент.
   * @returns {HTMLElement}
   */
  createCard() {
    this._element = this._getTemplate();

    // Достаем все необходимые элементы из template
    this._imageElement = this._element.querySelector('.card-list__image');
    this._placeElement = this._element.querySelector('.card-list__place');
    this._likeButtonElement = this._element.querySelector(
      '.card-list__button-like'
    );
    this._trashButtonElement = this._element.querySelector('.card-list__trash');

    this._placeElement.textContent = this._namePlace;
    this._imageElement.src = this._linkImage;
    this._imageElement.alt = this._namePlace;

    this._setCardListeners();

    return this._element;
  }
}
