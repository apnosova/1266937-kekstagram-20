'use strict';

(function () {

  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_SYMBOLS = 20;
  var MIN_HASHTAG_SYMBOLS = 2;
  var MAX_COMMENT_SYMBOLS = 140;

  var hashtagInput = document.querySelector('.text__hashtags');
  var commentInput = document.querySelector('.text__description');

  // Валидация хэш-тегов

  // Удаление пустых строк из массива
  var filterNotEmptyElements = function (value) {

    return value !== '';
  };

  hashtagInput.addEventListener('input', function () {
    var splittedHashtags = window.util.splitString(hashtagInput.value, ' ');
    var hashtags = splittedHashtags.filter(filterNotEmptyElements);
    var uniqueHashtags = [];

    // Хэш-теги необязательны
    if (!hashtagInput.value) {
      hashtagInput.setCustomValidity('');
      hashtagInput.style.boxShadow = 'none';
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      var reHashtag = /^#[A-ZА-ЯЁ0-9]+$/i;
      var isHashtag = reHashtag.test(hashtags[i]);

      if (!isHashtag || hashtags[i].length < MIN_HASHTAG_SYMBOLS) {
        hashtagInput.setCustomValidity('Хэш-тег начинается с символа # и не может состоять только из одной #. Строка после решётки должна состоять только из букв и чисел. Хэш-теги разделяются пробелами.');
        hashtagInput.style.boxShadow = 'inset 0 0 0 5px red';
        return;
      } else {
        hashtagInput.setCustomValidity('');
        hashtagInput.style.boxShadow = 'none';
      }


      if (hashtags[i].length > MAX_HASHTAG_SYMBOLS) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 симв.');
        hashtagInput.style.boxShadow = 'inset 0 0 0 5px red';
        return;
      }

      var hashtag = hashtags[i].toLowerCase();
      var isDblValue = uniqueHashtags.indexOf(hashtag) !== -1;
      if (isDblValue) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        hashtagInput.style.boxShadow = 'inset 0 0 0 5px red';
        return;
      } else {
        uniqueHashtags.push(hashtag);
      }
    }


    if (hashtags.length > MAX_HASHTAGS) {
      hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов.');
      hashtagInput.style.boxShadow = 'inset 0 0 0 5px red';
      return;
    }

  });


  // Валидация комментариев
  commentInput.addEventListener('input', function () {

    if (commentInput.value.length > MAX_COMMENT_SYMBOLS) {
      commentInput.setCustomValidity('Длина комментария не может составлять больше 140 симв.');
      commentInput.style.boxShadow = 'inset 0 0 0 5px red';
    } else {
      hashtagInput.setCustomValidity('');
      commentInput.style.boxShadow = 'none';
    }
  });
})();

