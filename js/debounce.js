'use strict';

(function () {

  // При переключении фильтров отрисовка изображений, подходящих под новый фильтр, должна производиться не чаще, чем один раз 500 мс (устранение дребезга)
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
