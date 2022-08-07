import api from 'utils/api';

export function like(item, card) {
  api
    .likeCard(item._id)
    .then(res => {
      card.addLike();
      card.setCountLikes(res.likes);
    })
    .catch(err => {
      console.error(`ошибка: ${err.message}`);
    });
}
export function unlike(item, card) {
  api
    .unlikeCard(item._id)
    .then(res => {
      card.removeLike();
      card.setCountLikes(res.likes);
    })
    .catch(err => {
      console.error(`ошибка: ${err.message}`);
    });
}
