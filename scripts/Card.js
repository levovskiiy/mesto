export default class Card {
  /**
   * @constructor
   * @param {string} namePlace
   * @param {string} linkImage
   * @param {function} openPopupHandler
   * @param {Element} popupElement
   * @param {Element} popupImageElement
   * @param {Element} popupCaptionElement
   * @param {String} selector
   */
  constructor(
    { namePlace,
      linkImage,
      openPopupHandler,
      popupElement,
      popupImageElement,
      popupCaptionElement
    },
    selector
  ) {
    this._namePlace = namePlace;
    this._linkImage = linkImage;
    this._selector = selector;
    this._openPopupHandler = openPopupHandler;
    this._popupElement = popupElement;
    this._popupImageElement = popupImageElement;
    this._popupCaptionElement = popupCaptionElement;
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
    this._openPopupHandler(this._popupElement);
    this._popupImageElement.src = this._linkImage;
    this._popupImageElement.alt = this._namePlace;
    this._popupCaptionElement.textContent = this._namePlace;
  }

  /**
   * Меняет состояние иконки лайка.
   * @private
   */
  _like() {
    this._likeButtonElement.classList.toggle('card-list__button-like_state_active');
  }

  /**
   * Удаляет элемент из DOM.
   * @private
   */
  _delete() {
    this._element.remove();
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
    this._likeButtonElement = this._element.querySelector('.card-list__button-like');
    this._trashButtonElement = this._element.querySelector('.card-list__trash');

    this._placeElement.textContent = this._namePlace;
    this._imageElement.src = this._linkImage;
    this._imageElement.alt = this._namePlace;

    this._setCardListeners();

    return this._element;
  }
}
