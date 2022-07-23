export default class UserInfo {
  constructor({ username, description }) {
    this._userName = document.querySelector(username);
    this._userDescription = document.querySelector(description);
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      description: this._userDescription.textContent,
    };
  }

  setUserInfo({ username, description }) {
    this._userName.textContent = username;
    this._userDescription.textContent = description;
  }
}
