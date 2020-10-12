'use strict';

(() => {

  const API_URL = `https://21.javascript.pages.academy/keksobooking`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT = 10000;

  const makeRequest = (method, url, onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    if (method === `POST`) {
      xhr.send(data);
    } else {
      xhr.send();
    }

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} с`);
    });
  };

  const load = (onSuccess, onError) => {
    makeRequest(`GET`, `${API_URL}/data`, onSuccess, onError);
  };

  const send = (data, onSuccess, onError) => {
    makeRequest(`POST`, API_URL, onSuccess, onError, data);
  };

  const onError = (message) => {
    const node = document.createElement(`div`);

    node.classList.add(`error`);

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend = {
    load,
    send,
    onError,
  };

})();
