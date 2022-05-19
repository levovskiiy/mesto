const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__name')
const profileDescription = profile.querySelector('.profile__description')
const profileEditButton = profile.querySelector('.profile__button-edit')
const profileAddButton = profile.querySelector('.profile__button-add')
const closeButtons = document.querySelectorAll('.popup__button-close')
const cardList = document.querySelector('.card-list')

/**
 * Объект представляет из себя все поп-апы со страницы.
 */
const popups = {
  editProfie: {
    element: document.querySelector('.popup_type_edit'),
    name: document.querySelector('.popup__input_type_name'),
    job: document.querySelector('.popup__input_type_descr'),
  },

  addCard: {
    element: document.querySelector('.popup_type_add-card'),
    placeField: document.querySelector('.popup__input_type_place'),
    linkField: document.querySelector('.popup__input_type_link'),
  },

  photo: {
    element: document.querySelector('.popup_type_open-photo'),
    photo: document.querySelector('.popup__image'),
    caption: document.querySelector('.popup__image-caption'),
  },
}

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
]

const resetForm = form => form.reset()
const openPopup = popup => popup.classList.add('popup_opened')
const closePopup = popup => popup.classList.remove('popup_opened')

/**
 * Функция вешает слушатели событий на кнопки лайка, удаления, открытия картинки.
 * @param {HTMLElement} like
 * @param {HTMLElement} trash
 * @param {HTMLElement} image
 */
const setListeners = (like, trash, image) => {
  like.addEventListener('click', () => like.classList.toggle('card-list__button-like_state_active'))

  trash.addEventListener('click', () => trash.closest('.card-list__item').remove())

  image.addEventListener('click', () => {
    openPopup(popups.photo.element)
    popups.photo.photo.src = image.src
    popups.photo.caption.textContent = image.alt
  })
}

/**
 * Функция создает экземпляр карточки, навешывает слушатели событий.
 * @param {object} card
 * @returns {HTMLElement}
 */
const createCard = card => {
  const cardElement = document.querySelector('#card').content.cloneNode(true)

  const cardImage = cardElement.querySelector('.card-list__image')
  cardImage.src = card.link
  cardImage.alt = card.name
  cardElement.querySelector('.card-list__place').textContent = card.name

  const cardButton = cardElement.querySelector('.card-list__button-like')
  const cardTrash = cardElement.querySelector('.card-list__trash')
  setListeners(cardButton, cardTrash, cardImage)

  return cardElement
}

/**
 * Функция добавляет 1 карточку в начало списка.
 * @param {object} card
 * @returns
 */
const addCard = card => cardList.prepend(createCard(card))

/**
 * Добавляет начальные карточки из массива.
 */
const initCards = () => {
  initialCards.forEach(card => cardList.append(createCard(card)))
}

const insertValues = (name, description) => {
  popups.editProfie.name.value = name
  popups.editProfie.job.value = description
}

popups.editProfie.element.addEventListener('submit', evt => {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = popups.editProfie.name.value
  profileDescription.textContent = popups.editProfie.job.value

  closePopup(popups.editProfie.element)
})

popups.addCard.element.addEventListener('submit', evt => {
  evt.preventDefault()
  addCard({
    name: popups.addCard.placeField.value,
    link: popups.addCard.linkField.value,
  })
  resetForm(popups.addCard.element.querySelector('.popup__form'))
  closePopup(popups.addCard.element)
})

profileAddButton.addEventListener('click', () => openPopup(popups.addCard.element))

profileEditButton.addEventListener('click', () => {
  openPopup(popups.editProfie.element)
  insertValues(profileName.textContent, profileDescription.textContent)
})

closeButtons.forEach(close => {
  close.addEventListener('click', () => closePopup(close.closest('.popup')))
})

initCards()
