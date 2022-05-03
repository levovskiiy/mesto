const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".profile__button-edit");
const popup = document.querySelector(".popup");
const closeBtnPopup = popup.querySelector(".popup__button-close");
const form = document.querySelector(".popup__form");
const nameInput = form.querySelector(".popup__input_type_name");
const jobInput = form.querySelector(".popup__input_type_descr");

const insertValues = function (name, description) {
  nameInput.value = name;
  jobInput.value = description;
};

const openPopup = function () {
  popup.classList.add("popup_opened");
  insertValues(profileName.textContent, profileDescription.textContent);
};

const closePopup = function () {
  popup.classList.remove("popup_opened");
};

const formSubmitHandler = function (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
};

form.addEventListener("submit", formSubmitHandler);
profileEditButton.addEventListener("click", openPopup);
closeBtnPopup.addEventListener("click", closePopup);
