import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  profileDescription,
  profileName,
  profilePopup,
  forms,
  caption,
  newCardButton,
  cardsContainer,
  closingButtonList,
  editProfileButton,
  imagePlace,
  newPlacePopup,
  zoomPhotoPopup,
  initialCards,
  formSettings,
  popups,
} from './constants.js';

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
  document.addEventListener('keydown', escapeClosePopup);
  popup.classList.add('popup_opened');
};

/**
 * @param {HTMLElement} popup
 */
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
};

/**
 * Функция добавляет 1 карточку в начало списка.
 * @param {object} card
 * @returns
 */
const addCard = ({ name, link }) => {
  const settings = {
    namePlace: name,
    linkImage: link,
    popupElement: zoomPhotoPopup,
    popupImageElement: imagePlace,
    popupCaptionElement: caption,
    openPopupHandler: openPopup,
  };
  const cardElement = new Card(settings, '#card');

  cardsContainer.prepend(cardElement.createCard());
};

/**
 * Добавляет начальные карточки из массива.
 */
const initCards = () => {
  initialCards.forEach(({ name, link }) => {
    const settings = {
      namePlace: name,
      linkImage: link,
      popupElement: zoomPhotoPopup,
      popupImageElement: imagePlace,
      popupCaptionElement: caption,
      openPopupHandler: openPopup,
    };
    const cardElement = new Card(settings, '#card');
    cardsContainer.append(cardElement.createCard());
  });
};

function setPopupsListeners() {
  popups.forEach(popup => {
    popup.addEventListener('click', overlayClosePopup);
  });
}

/**
 * Устанавливает слушатели события submit на все формы на странице.
 */
function setFormsListeners() {
  forms.editProfile.addEventListener('submit', evt => {
    evt.preventDefault();
    profileName.textContent = forms.editProfile.username.value;
    profileDescription.textContent = forms.editProfile.description.value;

    closePopup(profilePopup);
  });

  forms.newPlace.addEventListener('submit', evt => {
    evt.preventDefault();
    addCard({
      name: forms.newPlace.name.value,
      link: forms.newPlace.link.value,
    });
    closePopup(newPlacePopup);
  });
}

function setButtonsListeners() {
  newCardButton.addEventListener('click', () => openPopup(newPlacePopup));

  editProfileButton.addEventListener('click', () => {
    openPopup(profilePopup);
    forms.editProfile.username.value = profileName.textContent;
    forms.editProfile.description.value = profileDescription.textContent;
  });

  closingButtonList.forEach(closingButton => {
    closingButton.addEventListener('click', () => closePopup(closingButton.closest('.popup')));
  });
}

function app() {
  initCards();
  setFormsListeners();
  setPopupsListeners();
  setButtonsListeners();

  [...forms].forEach(form => {
    new FormValidator(form, formSettings).enableValidation();
  });
}

app();
