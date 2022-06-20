/**
 * Обработчик закрытия попапа по нажатию на Escape
 * @param evt
 */
const escapeClosePopup = evt => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};

/**
 * Обработчик закрытия попапа по нажатию на оверлей
 * @param evt
 */
const overlayClosePopup = evt => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

/**
 * @param {HTMLElement} popup
 */
const openPopup = popup => {
  if (!popup.classList.contains('popup_type_open-photo')) {
    popup.querySelector('.popup__form').reset();
  }
  document.addEventListener('keydown', escapeClosePopup);
  popup.addEventListener('click', overlayClosePopup);
  popup.classList.add('popup_opened');
};

/**
 * @param {HTMLElement} popup
 */
const closePopup = popup => {
  if (!popup.classList.contains('popup_type_open-photo')) {
    popup.querySelector('.popup__form').reset();
  }
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
  popup.removeEventListener('click', overlayClosePopup);
};

export { closePopup, openPopup };
