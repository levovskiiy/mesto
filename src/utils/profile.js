import UserInfo from 'components/UserInfo';
import api from 'utils/api';
import { PROFILE_SELECTORS } from './selectors';

export const addButton = document.querySelector(PROFILE_SELECTORS.buttons.add);
export const editButton = document.querySelector(
  PROFILE_SELECTORS.buttons.edit
);

export const replaceAvatarButton = document.querySelector(
  PROFILE_SELECTORS.buttons.replaceAvatar
);

export const userInfo = new UserInfo(PROFILE_SELECTORS);

export function editProfile(popup, values) {
  popup.handleSubmitButtonState(true);
  api
    .editProfile(values)
    .then(result => {
      userInfo.setUserInfo({
        username: result.name,
        description: result.about,
        avatar: result.avatar,
      });
      popup.close();
    })
    .catch(err => {
      console.error(`Ошибка: ${err.message}`);
    })
    .finally(() => {
      popup.handleSubmitButtonState(false);
    });
}
