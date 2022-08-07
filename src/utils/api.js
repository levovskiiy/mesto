import Api from 'components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co',
  cohort: 'cohort-46',
  headers: {
    authorization: '7281e2ab-08e1-40d9-8f4b-09c047d68be0',
  },
});

export default api;
