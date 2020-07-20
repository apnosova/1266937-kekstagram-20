'use strict';

window.util = (function () {

  return {
    // функция генерации случайного целого числа, max и min включаются
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // функция возвращает случайный элемент массива
    getRandomElementfromArray: function (array) {
      var max = Math.floor(array.length);
      var randomElement = array[Math.floor(Math.random() * max)];

      return randomElement;
    },

    // функция переупорядочивает случайным образом элементы массива
    shuffle: function (array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = array[i];
        array[i] = array[j];
        array[j] = t;
      }
      return array;
    },
  };
})();
