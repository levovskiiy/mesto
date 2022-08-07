export default class UserInfo {
  constructor({ username, description, avatar }) {
    this._userName = document.querySelector(username);
    this._userDescription = document.querySelector(description);
    this._userAvatar = document.querySelector(avatar);
    this._id = 0;
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  }

  setUserInfo({ username, description, avatar }) {
    this._userName.textContent = username;
    this._userDescription.textContent = description;
    this._userAvatar.src = avatar;
  }

  set avatar(newAvatar) {
    if (typeof newAvatar !== 'string') {
      throw new Error('Передайте ссылку в виде строки');
    }

    this._userAvatar.src = newAvatar;
  }

  set id(newId) {
    if (typeof newId !== 'string') {
      throw new Error('Передайте id в виде строки');
    }

    this._id = newId;
  }

  get id() {
    return this._id;
  }
}
