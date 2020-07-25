'use strict';

// Модуль для отрисовки миниатюры
(function () {

  var MAX_PICTURES = 25;
  var MAX_COMMENTS = 5;

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('.social__comment');
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // функция создания DOM-элемента на основе JS-объекта


  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };


  // функция для создания массива комментариев из сгенерированных JS-объектов
  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', function () {
      window.preview.renderFullPicture();
      window.preview.openFullPhoto();
    });

    return pictureElement;
  };

  /*
  window.preview = {
    show: function (image) {

      comments = image.comments;
      bigPictureSocialComments.innerHTML = '';

      bigPictureImg.src = image.url;
      bigPictureLikesCount.textContent = image.likes;
      maxCommentsCount.textContent = image.comments.length;
      bigPictureSocialCaption.textContent = image.description;

      renderComments();

      body.classList.add('modal-open');
      bigPicture.classList.remove('hidden');

      document.addEventListener('keydown', onEscapePress);
      bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
      commentsButton.addEventListener('click', onCommentsButtonClick);
    }
  };
  */

  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_PICTURES; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    picturesList.appendChild(fragment);
  };

  // Для фильтрации сохраним данные после загрузки
  var pictures = [];

  // Обработчики успешной загрузки и ошибки
  var onSuccess = function (data) {
    pictures = data;
    updatePictures();
  };

  var onError = function (errorMessage) {
    var element = document.createElement('div');
    element.style = 'z-index: 1; margin: 0 auto; text-align: center; background-color: #3c3614;';
    element.style.position = 'absolute';
    element.style.left = 0;
    element.style.right = 0;
    element.style.fontSize = '20px';

    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
  };

  window.backend.load(onSuccess, onError);


  // функция заполнения блока DOM-элементами на основе массива JS-объектов
  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_COMMENTS; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentsList.appendChild(fragment);
  };


  // Фильтрация

  var filters = document.querySelector('.img-filters');

  // Блок показывается только после окончания загрузки всех фотографий
  var openFilters = function () {
    if (onSuccess) {
      filters.classList.remove('img-filters--inactive');
    }
  };

  openFilters();

  var updatePictures = function () {
    renderPictures(pictures);
  };

  // var onFilterButtonClick = function (evt) {
  // var selectedFilter = filterButton.id;

  /*

  filter.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.tagName === 'button') {
      target.classList.add('img-filters__button--active');
    } else {
      filter.classList.remove('img-filters__button--active');
    }
  });
  */

  // id="filter-default" id="filter-random" id="filter-discussed"


  // Фильтр по умолчанию, фотографии в изначальном порядке с сервера
  var defaultButton = filters.querySelector('#filter-default');

  var onDefaultButtonClick = function () {
    updatePictures();
  };

  defaultButton.addEventListener('click', onDefaultButtonClick);

  // Случайные, 10 случайных, не повторяющихся фотографий
  var randomButton = filters.querySelector('#filter-random');

  var onRandomButtonClick = function () {
    var newArray = window.util.shuffle(pictures.slice(10));
    updatePictures(newArray);
  };

  randomButton.addEventListener('click', onRandomButtonClick);

  // Обсуждаемые, фотографии, отсортированные в порядке убывания количества комментариев

})();
