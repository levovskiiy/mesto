const FORM_SETTINGS = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const PROFILE_SELECTORS = {
  username: '.profile__name',
  description: '.profile__description',
  buttons: {
    add: '.profile__button-add',
    edit: 'profile__button-edit',
  },
};

const POPUP_SELECTORS = {
  type: {
    add: '.popup_type_add-card',
    photo: '.popup_type_open-photo',
    edit: 'popup_type_edit',
  },
  classes: {
    opened: 'popup_opened',
    closeButton: '.popup__button-close',
  },
  imageSelector: '.popup__image',
  captionSelector: '.popup__image-caption',
};

export { PROFILE_SELECTORS, FORM_SETTINGS, POPUP_SELECTORS };
