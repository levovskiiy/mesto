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
const POPUPS = {
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

const openPopup = popup => popup.classList.add('popup_opened')
const closePopup = element => element.classList.remove('popup_opened')

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
    openPopup(POPUPS.photo.element)
    POPUPS.photo.photo.src = image.src
    POPUPS.photo.caption.textContent = image.alt
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
  POPUPS.editProfie.name.value = name
  POPUPS.editProfie.job.value = description
}

POPUPS.editProfie.element.addEventListener('submit', evt => {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = POPUPS.editProfie.name.value
  profileDescription.textContent = POPUPS.editProfie.job.value

  closePopup(POPUPS.editProfie.element)
})

POPUPS.addCard.element.addEventListener('submit', evt => {
  evt.preventDefault()
  addCard({
    name: POPUPS.addCard.placeField.value,
    link: POPUPS.addCard.linkField.value,
  })
  POPUPS.addCard.placeField.value = ''
  POPUPS.addCard.linkField.value = ''
  closePopup(POPUPS.addCard.element)
})

profileAddButton.addEventListener('click', () => openPopup(POPUPS.addCard.element))

profileEditButton.addEventListener('click', () => {
  openPopup(POPUPS.editProfie.element)
  insertValues(profileName.textContent, profileDescription.textContent)
})

closeButtons.forEach(close => {
  close.addEventListener('click', () => closePopup(close.closest('.popup')))
})

initCards()
