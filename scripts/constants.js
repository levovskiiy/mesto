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
const popups = document.querySelectorAll('.popup');
const forms = document.forms;

const formSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

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

export {
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
};
