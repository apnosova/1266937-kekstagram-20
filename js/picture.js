'use strict';

(function () {
  var MAX_PICTURES = 10;

  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filters = document.querySelector('.img-filters');
  var filterButtons = filters.querySelectorAll('.img-filters__button');
  var defaultButton = filters.querySelector('#filter-default');
  var randomButton = filters.querySelector('#filter-random');
  var discussedButton = filters.querySelector('#filter-discussed');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.openFullPhoto(picture);
    });

    return pictureElement;
  };

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };

  // Обработчики изменения фильтров
  var pictures = [];

  var removeActiveFilter = function () {
    filterButtons.forEach(function (button) {
      if (button.classList.contains('img-filters__button--active')) {
        button.classList.remove('img-filters__button--active');
      }
    });
  };

  var changeFilter = function (button, data) {
    removeActiveFilter();
    button.classList.add('img-filters__button--active');
    clearPictures();
    renderPictures(data);
  };

  // При переключении фильтра все фотографии, отрисованные ранее, нужно убрать
  var clearPictures = function () {
    var picturesToClear = document.querySelectorAll('a.picture');
    picturesToClear.forEach(function (picture) {
      picturesList.removeChild(picture);
    });
  };

  // Фильтр по умолчанию = фотографии в изначальном порядке с сервера
  var onDefaultButtonClick = function () {
    var defaultPictures = pictures;
    changeFilter(defaultButton, defaultPictures);
  };

  // Случайные = 10 случайных неповторяющихся фотографий
  var getRandomPictures = function () {
    // сохранить исходный массив
    var copy = pictures.slice();
    var shufflePictures = window.util.shuffle(copy);
    var randomPictures = shufflePictures.slice(0, MAX_PICTURES);

    return randomPictures;
  };

  var onRandomButtonClick = function () {
    var randomPictures = getRandomPictures();
    changeFilter(randomButton, randomPictures);
  };

  // Обсуждаемые = фотографии, отсортированные в порядке убывания количества комментариев
  var getDiscussedPictures = function () {
    var discussedPictures = pictures.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    return discussedPictures;
  };

  var onDiscussedButtonClick = function () {
    var discussedPictures = getDiscussedPictures();
    changeFilter(discussedButton, discussedPictures);
  };

  filters.addEventListener('click', window.debounce(function (evt) {
    if (evt.target === defaultButton) {
      onDefaultButtonClick();
    } else if (evt.target === randomButton) {
      onRandomButtonClick();
    } else if (evt.target === discussedButton) {
      onDiscussedButtonClick();
    }
  }));

  // Обработчики успешной загрузки и ошибки
  var onSuccess = function (data) {
    pictures = data;
    renderPictures(pictures);
    filters.classList.remove('img-filters--inactive');
  };

  var onError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = 'z-index: 1; margin: 0 auto; text-align: center; background-color: red';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '20px';
    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
  };

  window.backend.load(onSuccess, onError);
})();
