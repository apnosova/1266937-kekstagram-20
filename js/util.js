'use strict';

(function () {

  var Key = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter',
  };

  // функция переупорядочивает случайным образом элементы массива
  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = array[i];
      array[i] = array[j];
      array[j] = t;
    }
    return array;
  };

  // Функция разбивает строку на массив строк
  var splitString = function (stringToSplit, separator) {
    var arrayOfStrings = stringToSplit.split(separator);

    return arrayOfStrings;
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === Key.ESC_KEY) {
      evt.preventDefault();
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === Key.ENTER_KEY) {
      evt.preventDefault();
      action();
    }
  };

  window.util = {
    shuffle: shuffle,
    splitString: splitString,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
  };
})();
