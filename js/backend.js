'use strict';

(function () {

  var StatusCode = {
    OK: 200,
  };

  var TIMEOUT_IN_MS = 10000;

  // Получение данных с сервера
  var load = function (onSuccess, onError) {
    var url = 'https://javascript.pages.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', url);
    xhr.send();
  };

  // Загрузка данных на сервер
  var upload = function (data, onSuccess, onError) {
    var url = 'https://javascript.pages.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upload: upload,
  };
})();
