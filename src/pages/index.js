import './index.css';

import Card from 'components/Card';
import Section from 'components/Section';
import PopupWithImage from 'components/PopupWithImage';
import PopupWithForm from 'components/PopupWithForm';
import UserInfo from 'components/UserInfo';
import FormValidator from 'components/FormValidator';

import { cardTemplateSelector, FORMS, initialCards } from 'utils/constants';
import {
  PROFILE_SELECTORS,
  FORM_SETTINGS,
  POPUP_SELECTORS,
} from 'utils/selectors';
import { addButton, editButton } from 'utils/profile';

const makeCard = (data, handler, selector) =>
  new Card(data, handler, selector).createCard();

const popupWithImage = new PopupWithImage(
  POPUP_SELECTORS,
  POPUP_SELECTORS.type.photo
);

const userInfo = new UserInfo(PROFILE_SELECTORS);

const cardList = new Section(
  {
    items: initialCards,
    renderer: item => {
      const card = makeCard(
        item,
        data => popupWithImage.open(data),
        cardTemplateSelector
      );
      cardList.add(card);
    },
  },
  '.card-list'
);

const popupWithAddCard = new PopupWithForm(
  {
    classes: POPUP_SELECTORS.classes,
    formSelector: FORM_SETTINGS.formSelector,
    inputSelector: FORM_SETTINGS.inputSelector,
  },
  POPUP_SELECTORS.type.add,
  values => {
    const card = makeCard(
      values,
      data => popupWithImage.open(data),
      cardTemplateSelector
    );
    cardList.prepend(card);
    popupWithAddCard.close();
  }
);

const popupWithProfile = new PopupWithForm(
  {
    classes: POPUP_SELECTORS.classes,
    formSelector: FORM_SETTINGS.formSelector,
    inputSelector: FORM_SETTINGS.inputSelector,
  },
  POPUP_SELECTORS.type.edit,

  values => {
    userInfo.setUserInfo(values);
    popupWithProfile.close();
  }
);

function setPopupListeners() {
  popupWithAddCard.setEventListener();
  popupWithImage.setEventListener();
  popupWithProfile.setEventListener();
}

function setValidationForms() {
  [...FORMS].forEach(form => {
    new FormValidator(form, FORM_SETTINGS).enableValidation();
  });
}

function app() {
  setPopupListeners();

  setValidationForms();

  editButton.addEventListener('click', () => {
    popupWithProfile.open(userInfo.getUserInfo());
  });
  addButton.addEventListener('click', () => popupWithAddCard.open());

  cardList.render();
}

app();
