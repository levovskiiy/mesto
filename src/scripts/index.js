import '../pages/index.css';

import Card from './Card';
import FormValidator from './FormValidator';
import {
  profileDescription,
  profileName,
  profilePopup,
  forms,
  zoomPopup,
  zoomPopupCaption,
  zoomPopupImage,
  newCardButton,
  cardsContainer,
  closingButtonList,
  editProfileButton,
  newPlacePopup,
  initialCards,
  formSettings,
  popups,
} from './constants';

/**
 * @param {HTMLElement} popup
 */
const openPopup = popup => {
  document.addEventListener('keydown', escapeClosePopup);
  popup.classList.add('popup_opened');
};

const openZoomPopup = ({ link, caption, alt }) => {
  openPopup(zoomPopup);
  zoomPopupImage.src = link;
  zoomPopupImage.alt = alt;
  zoomPopupCaption.textContent = caption;
};

/**
 * @param {HTMLElement} popup
 */
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClosePopup);
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

const makeCard = (name = '', link = '') => {
  const settings = {
    namePlace: name,
    linkImage: link,
    popupElement: zoomPopup,
    openPopupHandler: openZoomPopup,
  };

  return new Card(settings, '#card').createCard();
};

/**
 * Функция добавляет 1 карточку в начало списка.
 * @param {object} card
 * @returns
 */
const addCard = ({ name, link }) => {
  cardsContainer.prepend(makeCard(name, link));
};

/**
 * Добавляет начальные карточки из массива.
 */
const initCards = () => {
  initialCards.forEach(({ name, link }) => {
    cardsContainer.append(makeCard(name, link));
  });
};

/**
 * Обработчик закрытия попапа по нажатию на Escape
 * @param evt
 */
function escapeClosePopup(evt) {
  if (evt.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');
    closePopup(currentPopup);
  }
}

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
    evt.target.reset();
    addCard({
      name: forms.newPlace.name.value,
      link: forms.newPlace.link.value,
    });
    closePopup(newPlacePopup);
  });
}

function setButtonsListeners() {
  newCardButton.addEventListener('click', () => {
    openPopup(newPlacePopup);
  });

  editProfileButton.addEventListener('click', () => {
    openPopup(profilePopup);
    forms.editProfile.username.value = profileName.textContent;
    forms.editProfile.description.value = profileDescription.textContent;
  });

  closingButtonList.forEach(closingButton => {
    closingButton.addEventListener('click', () =>
      closePopup(closingButton.closest('.popup'))
    );
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
