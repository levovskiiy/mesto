import api from 'utils/api';
import { userInfo } from 'utils/profile';

export default function setAvatar(popup, avatarLink) {
  popup.handleSubmitButtonState(true);
  return api
    .replaceAvatar(avatarLink)
    .then(result => {
      userInfo.avatar = result.avatar;
      popup.close();
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    })
    .finally(() => {
      popup.handleSubmitButtonState(false);
    });
}
