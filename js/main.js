'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Вероника',
  'Тимофей',
  'Иван',
  'Ольга',
  'Платон',
  'Ева',
  'Фёдор',
  'Алиса',
  'Ксения'
];

var commentsList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('.social__comment');
var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// функция генерации случайного целого числа, max и min включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция возвращает случайный элемент массива
var getRandomElementfromArray = function (array) {
  var max = Math.floor(array.length);
  var randomElement = array[Math.floor(Math.random() * max)];

  return randomElement;
};

// функция для создания списка комментариев
var getCommentsArray = function () {
  var comments = [];
  for (var i = 0; i < getRandomIntInclusive(0, 10); i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomIntInclusive(1, 6) + '.svg',
      message: getRandomElementfromArray(MESSAGES),
      name: getRandomElementfromArray(NAMES)
    });
  }
  return comments;
};

// функция создания DOM-элемента на основе JS-объекта
var renderComments = function (comment) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var appendComments = function () {
  var fragment = document.createDocumentFragment();
  var comments = getCommentsArray();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderComments(comments[i]));
  }
  commentsList.appendChild(fragment);
};

// функция переупорядочивает случайным образом элементы массива
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = array[i];
    array[i] = array[j];
    array[j] = t;
  }
  return array;
}

// функция для создания массива из 25 сгенерированных JS-объектов
var getPicturesArray = function () {
  var pictures = [];
  var MAX_PICTURES = 25;
  for (var i = 1; i <= MAX_PICTURES; i++) {
    pictures.push({
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: getRandomIntInclusive(15, 200),
      comments: getCommentsArray().length
    });
    shuffle(pictures);
  }
  return pictures;
};

// функция для создания массива из сгенерированных JS-объектов
var renderPictures = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments;

  return pictureElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var appendPictures = function () {
  var fragment = document.createDocumentFragment();
  var pictures = getPicturesArray();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPictures(pictures[i]));
  }
  picturesList.appendChild(fragment);
};

appendComments();

appendPictures();

// заполнение элемента .big-picture информацией из первого элемента массива с данными
var fullPicture = document.querySelector('.big-picture');
fullPicture.classList.remove('hidden');

fullPicture.querySelector('.big-picture__img').src = fullPicture.url;
fullPicture.querySelector('.social__likes').textContent = fullPicture.likes;
fullPicture.querySelector('.comments-count').textContent = fullPicture.comments;
fullPicture.querySelector('.social__caption').textContent = fullPicture.description;

// Спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden
fullPicture.querySelector('.social__comment-count').classList.add('hidden');
fullPicture.querySelector('.comments-loader').classList.add('hidden');

// Добавьте на <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле
document.querySelector('body').classList.add('modal-open');
