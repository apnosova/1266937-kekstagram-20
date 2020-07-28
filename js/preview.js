'use strict';

(function () {

  var MAX_COMMENTS = 5;

  var commentTemplate = document.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');
  var fullPicture = document.querySelector('.big-picture');
  var fullPictureClose = fullPicture.querySelector('.big-picture__cancel');
  var fullPictureImg = fullPicture.querySelector('img');
  var commentsLoader = fullPicture.querySelector('.comments-loader');
  var socialCommentCount = fullPicture.querySelector('.social__comment-count');
  var comments = [];
  var displayedComments = [];
  var counter = MAX_COMMENTS;

  var renderFullPicture = function (picture) {
    fullPicture.querySelector('.big-picture__img').src = fullPicture.url;
    fullPicture.querySelector('.social__likes').textContent = fullPicture.likes;
    socialCommentCount.textContent = fullPicture.comments;
    fullPicture.querySelector('.social__caption').textContent = fullPicture.description;

    counter = 5;
    if (comments.length < MAX_COMMENTS) {
      socialCommentCount.textContent = picture.comments.length + ' из ' + picture.comments.length + ' комментариев';
    } else {
      socialCommentCount.textContent = counter + ' из ' + picture.comments.length + ' комментариев';
    }

    return fullPicture;
  };

  var renderComment = function (comment) {
    var commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    return commentElement;
  };

  var renderComments = function () {
    var fragment = document.createDocumentFragment();

    if (displayedComments.length <= MAX_COMMENTS) {
      for (var i = 0; i < displayedComments.length; i++) {
        fragment.appendChild(renderComment(displayedComments[i]));
      }
      commentsLoader.classList.add('hidden');
    } else {
      for (i = 0; i < MAX_COMMENTS; i++) {
        fragment.appendChild(renderComment(displayedComments[i]));

        commentsLoader.classList.remove('hidden');
      }
    }
    commentsList.appendChild(fragment);
  };

  // Список комментариев показывается по 5 элементов по нажатию на кнопку 'Загрузить еще'
  var onCommentsLoaderClick = function () {
    renderComments(displayedComments);
    if (displayedComments.length > MAX_COMMENTS) {
      counter += MAX_COMMENTS;
      socialCommentCount.textContent = counter + ' из ' + comments.length + ' комментариев';
    } else {
      socialCommentCount.textContent = comments.length + ' из ' + comments.length + ' комментариев';
    }
    displayedComments.splice(0, MAX_COMMENTS);
  };

  var openFullPhoto = function (picture) {
    comments = picture.comments;
    fullPictureImg.src = picture.url;
    fullPicture.likes = picture.likes;
    fullPicture.description = picture.description;
    commentsList.innerHTML = '';
    renderFullPicture(picture);
    displayedComments = picture.comments.slice();
    renderComments(displayedComments);
    displayedComments.splice(0, MAX_COMMENTS);
    fullPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
    document.addEventListener('keydown', onFullPhotoEscPress);
  };

  var closeFullPhoto = function () {
    fullPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onFullPhotoEscPress);
  };

  // Закрытие окна полноразмерного просмотра по Esc и клике по иконке закрытия
  var onFullPhotoEscPress = function (evt) {
    window.util.isEscEvent(evt, closeFullPhoto);
  };

  fullPictureClose.addEventListener('click', function () {
    closeFullPhoto();
  });

  window.preview = {
    openFullPhoto: openFullPhoto,
  };
})();
