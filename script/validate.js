const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrClass,
  errClass,
}) => {
  const hasInvalidInput = inputList => inputList.some(inputElement => !inputElement.validity.valid);

  const toggleShowButton = (inputList, button) => {
    if (hasInvalidInput(inputList)) {
      button.classList.add(inactiveButtonClass);
      button.setAttribute('disabled', '');
    } else {
      button.classList.remove(inactiveButtonClass);
      button.removeAttribute('disabled', '');
    }
  };

  const showInputError = (form, input, error) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.add(inputErrClass);
    errorElement.textContent = error;
    errorElement.classList.add(errClass);
  };

  const hideInputError = (form, input) => {
    const errorElement = form.querySelector(`.${input.id}-error`);
    input.classList.remove(inputErrClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errClass);
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (inputElement.validity.valid) {
      hideInputError(formElement, inputElement);
    } else {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  };

  const setListeners = form => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);
    toggleShowButton(inputList, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        toggleShowButton(inputList, buttonElement);
        checkInputValidity(form, inputElement);
      });
    });
  };

  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(formElement => setListeners(formElement));
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrClass: 'popup__input_type_error',
  errClass: 'popup__error_visible',
});
