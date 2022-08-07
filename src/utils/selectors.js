const PROFILE_SELECTORS = {
  username: '.profile__name',
  description: '.profile__description',
  avatar: '.profile__avatar',
  buttons: {
    add: '.profile__button-add',
    edit: '.profile__button-edit',
    replaceAvatar: '.profile__avatar-edit',
  },
};

const POPUP_SELECTORS = {
  type: {
    add: '.popup_type_add-card',
    photo: '.popup_type_open-photo',
    edit: '.popup_type_edit',
    deleteCard: '.popup_type_delete-card',
    replaceAvatar: '.popup_type_replace-avatar',
  },
  classes: {
    opened: 'popup_opened',
    closeButton: '.popup__button_operation_close',
  },
  imageSelector: '.popup__image',
  captionSelector: '.popup__image-caption',
};

const FORM_SETTINGS = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_operation_submit',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const POPUP_SETTINGS = {
  classes: POPUP_SELECTORS.classes,
  formSelector: FORM_SETTINGS.formSelector,
  inputSelector: FORM_SETTINGS.inputSelector,
};

export { PROFILE_SELECTORS, FORM_SETTINGS, POPUP_SELECTORS, POPUP_SETTINGS };
