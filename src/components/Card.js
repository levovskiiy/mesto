export default class Card {
  /**
   * @constructor
   * @param {object} cardData
   * @param likeHandler
   * @param unlikeHandler
   * @param deleteHandler
   * @param {string} selector
   * @param {function} openPopupHandler
   */
  constructor({
    cardData,
    openPopupHandler,
    likeHandler,
    unlikeHandler,
    deleteHandler,
    selector,
  }) {
    this._namePlace = cardData.name;
    this._linkImage = cardData.link;
    this._likes = cardData.likes;
    this._owner = cardData.owner;
    this._id = cardData._id;
    this._userId = cardData.userId;
    this._selector = selector;
    this._openPopupHandler = openPopupHandler;
    this._likeHandler = likeHandler;
    this._deleteHandler = deleteHandler;
    this._unlikeHandler = unlikeHandler;
    this._isLiked = false;
  }

  get cardId() {
    return this._id;
  }

  get likes() {
    return this._likes;
  }

  get owner() {
    return this._owner;
  }

  get isLiked() {
    return this._isLiked;
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
   * @public
   */
  delete() {
    this._element.remove();
    this._element = null;
  }

  _setLikes() {
    this._isLiked = this._likeButtonElement.classList.contains(
      'card-list__button-like_state_active'
    );

    if (!this._isLiked) {
      this._likeHandler();
    } else {
      this._unlikeHandler();
    }
  }

  /**
   * Вешает все необходимые обработчики карточки.
   * @private
   */
  _setCardListeners() {
    this._imageElement.addEventListener('click', () => this._open());
    this._likeButtonElement.addEventListener('click', () => {
      this._setLikes();
    });
    this._trashButtonElement.addEventListener('click', () =>
      this._deleteHandler(this)
    );
  }

  _handleDeleteButton() {
    if (this._userId !== this.owner._id) {
      this._trashButtonElement.remove();
      this._trashButtonElement = null;
    }
  }

  _handleLikeState() {
    const isLiked = this._likes.some(user => this._userId === user._id);

    if (isLiked) {
      this.addLike();
    } else {
      this.removeLike();
    }
  }

  /**
   * @param {Array<Object>} newArray
   */
  setCountLikes(newArray) {
    this._likesElement.textContent = newArray.length;
  }

  addLike() {
    this._likeButtonElement.classList.add(
      'card-list__button-like_state_active'
    );
  }

  removeLike() {
    this._likeButtonElement.classList.remove(
      'card-list__button-like_state_active'
    );
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
    this._likesElement = this._element.querySelector('.card-list__likes');
    this._trashButtonElement = this._element.querySelector('.card-list__trash');

    this._placeElement.textContent = this._namePlace;
    this._imageElement.src = this._linkImage;
    this._imageElement.alt = this._namePlace;
    this._likesElement.textContent = this._likes.length;

    this._setCardListeners();
    this._handleDeleteButton();
    this._handleLikeState();
    return this._element;
  }
}
