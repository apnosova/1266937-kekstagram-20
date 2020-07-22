'use strict';

(function () {

  window.backend = {

    // Получение данных с сервера
    load: function (onLoad) {
      var url = 'https://javascript.pages.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();

      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.open('GET', url);
      xhr.send();
    },
  };
})();
