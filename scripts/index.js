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
} from './constants.js';

import { closePopup, openPopup } from './popup.js';

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

  setButtonsListeners();

  const validator = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  });

  validator.enableValidation();
}

app();
