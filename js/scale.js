'use strict';

(function () {
  var STEP = 25;
  var MAX_COUNT = 100;
  var MIN_COUNT = 25;

  var buttonScale = document.querySelector('.img-upload__scale');

  var scaleInput = document.querySelector('.scale__control--value');
  var preview = document.querySelector('.img-upload__preview');

  var onScaleClick = function (evt) {
    if (evt.target && evt.target.matches('.scale__control--bigger')) {
      var countPlus = parseInt(scaleInput.value, 10) + STEP;
      if (countPlus <= MAX_COUNT) {
        scaleInput.value = countPlus + ' % ';
        var scalePlus = countPlus / 100;
        preview.style.transform = 'scale(' + scalePlus + ')';
      }
    } else if (evt.target && evt.target.matches('.scale__control--smaller')) {
      var countMinus = parseInt(scaleInput.value, 10) - STEP;
      if (countMinus >= MIN_COUNT) {
        scaleInput.value = countMinus + ' % ';
        var scaleMinus = countMinus / 100;
        preview.style.transform = 'scale(' + scaleMinus + ')';
      }
    }
  };

  buttonScale.addEventListener('click', onScaleClick);
})();
