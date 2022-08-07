import Card from 'components/Card';
import { userInfo } from 'utils/profile';
import { cardTemplateSelector } from 'utils/constants';
import { like, unlike } from 'utils/likeHandlers';
import api from 'utils/api';

/**
 * @param item
 * @param {PopupWithImage} popupWithImage
 * @param {PopupWithDeleteCard} popupWithDelete
 */
export function createCard(item, popupWithImage = null, popupWithDelete = null) {
  const card = new Card({
    cardData: { userId: userInfo.id, ...item },
    openPopupHandler: data => popupWithImage.open(data),
    likeHandler: () => like(item, card),
    unlikeHandler: () => unlike(item, card),
    deleteHandler: cardElement => popupWithDelete.open(cardElement),
    selector: cardTemplateSelector,
  });

  return card.createCard();
}

/**
 * @param {Card} values
 * @param {PopupWithForm} popup
 * @param {Section} container
 * @param popupWithImage
 * @param popupWithDelete
 * @returns {Promise<unknown>}
 */
export function newCardHandler(values, popup, container, popupWithImage = null, popupWithDelete = null) {
  popup.handleSubmitButtonState(true);
  api
    .newCard(values)
    .then(result => {
      const card = createCard(result, popupWithImage, popupWithDelete);
      container.prepend(card);
      popup.close();
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    })
    .finally(() => {
      popup.handleSubmitButtonState(false);
    });
}

export function deleteCard(card, popup) {
  popup.handleSubmitButtonState(true);
  api
    .deleteCard(card.cardId)
    .then(() => {
      card.delete();
      popup.close();
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    })
    .finally(() => {
      popup.handleSubmitButtonState(false);
    });
}
