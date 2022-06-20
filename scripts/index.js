import Card from './Card.js';

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const editProfileButton = profile.querySelector('.profile__button-edit');
const newCardButton = profile.querySelector('.profile__button-add');

const closingButtonList = document.querySelectorAll('.popup__button-close');
const cardsContainer = document.querySelector('.card-list');

const profilePopup = document.querySelector('.popup_type_edit');
const newPlacePopup = document.querySelector('.popup_type_add-card');
const zoomPhotoPopup = document.querySelector('.popup_type_open-photo');
const imagePlace = zoomPhotoPopup.querySelector('.popup__image');
const caption = zoomPhotoPopup.querySelector('.popup__image-caption');

const forms = document.forms;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const escapeClosePopup = evt => {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
};

const overlayClosePopup = evt => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
};

const openPopup = popup => {
  document.addEventListener('keydown', escapeClosePopup);
  popup.addEventListener('click', overlayClosePopup);

  popup.classList.add('popup_opened');
};

/**
 * @param {HTMLElement} popup
 */
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
  popup.removeEventListener('click', overlayClosePopup);
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
  }
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
    }
    const cardElement = new Card(settings, '#card');
    cardsContainer.append(cardElement.createCard());
  });
};

const insertValues = (/** @type {string} */ name, /** @type {string} */ description) => {
  forms.editProfile.username.value = name;
  forms.editProfile.description.value = description;
};

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

newCardButton.addEventListener('click', () => openPopup(newPlacePopup));

editProfileButton.addEventListener('click', () => {
  openPopup(profilePopup);
  insertValues(profileName.textContent, profileDescription.textContent);
  forms.editProfile.username.value = profileName.textContent;
  forms.editProfile.description.value = profileDescription.textContent;
});

closingButtonList.forEach(closingButton => {
  closingButton.addEventListener('click', () => closePopup(closingButton.closest('.popup')));
});

initCards();
