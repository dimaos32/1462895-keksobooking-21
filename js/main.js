'use strict';

const offersField = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);

const fragment = document.createDocumentFragment();

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const getRandomIntNumber = (min = 0, max = 100) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomArrayElements = (arr, n = 1) => {
  let randomArray = [];

  for (let i = 0; i < arr.length && i < n; i++) {
    const ELEMENT = getRandomIntNumber(i, arr.length - 1);
    randomArray.push(arr[ELEMENT]);
    const SWAP = arr[ELEMENT];
    arr[ELEMENT] = arr[i];
    arr[i] = SWAP;
  }

  return randomArray;
};

const generateMocks = (n) => {
  const RENT_WORDS_DB = [
    `Сдам`,
    `Сдается`,
    `Свободно жилье -`,
    `Можно арендовать`,
    `Сдается жилье -`,
    `Специально для вас -`,
  ];
  const TYPES_DB = [`palace`, `flat`, `house`, `bungalow`];
  const TYPES_DB_RU = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };
  const CHECK_IN_OUT_DB = [`12:00`, `13:00`, `14:00`];
  const FEATURES_DB = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];
  const DESCRIPTION_WORDS_DB = [
    `красивые виды из окон.`,
    `тихий район.`,
    `территория Якудзы.`,
    `центр города.`,
    `ярко выраженный местный колорит.`,
  ];
  const PHOTOS_DB = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];

  const generatedMocks = [];

  let avatarNumbers = [];

  for (let i = 1; i <= n; i++) {
    avatarNumbers.push(i < 10 ? `0` + i : i);
  }

  avatarNumbers = getRandomArrayElements(avatarNumbers, n);

  for (let i = 0; i < n; i++) {
    const mock = {
      author: {
        avatar: `img/avatars/user` + avatarNumbers[i] + `.png`
      },
      offer: {
        title: ``,
        address: ``,
        price: getRandomIntNumber(1, 50) * 1000,
        type: TYPES_DB[getRandomIntNumber(0, TYPES_DB.length - 1)],
        rooms: getRandomIntNumber(1, 4),
        guests: getRandomIntNumber(1, 10),
        checkin: CHECK_IN_OUT_DB[getRandomIntNumber(0, CHECK_IN_OUT_DB.length - 1)],
        checkout: CHECK_IN_OUT_DB[getRandomIntNumber(0, CHECK_IN_OUT_DB.length - 1)],
        features: getRandomArrayElements(FEATURES_DB, getRandomIntNumber(1, FEATURES_DB.length)),
        description: ``,
        photos: getRandomArrayElements(PHOTOS_DB, getRandomIntNumber(1, PHOTOS_DB.length))
      },
      location: {
        x: getRandomIntNumber(25, 1175),
        y: getRandomIntNumber(130, 630)
      }
    };

    mock.offer.title = `${RENT_WORDS_DB[getRandomIntNumber(0, RENT_WORDS_DB.length - 1)]} ${TYPES_DB_RU[mock.offer.type]}${(getRandomIntNumber(0, 1) ? `!` : `.`)}`;
    mock.offer.address = `${mock.location.x} ${mock.location.y}`;
    mock.offer.description = `${TYPES_DB_RU[mock.offer.type]}, кол-во комнат - ${mock.offer.rooms}, ${DESCRIPTION_WORDS_DB[getRandomIntNumber(0, DESCRIPTION_WORDS_DB.length - 1)]}`;

    generatedMocks.push(mock);
  }

  return generatedMocks;
};

const renderOffer = (offer) => {
  const offerPreset = pinTemplate.cloneNode(true);

  offerPreset.style = `left: ${offer.location.x - PIN_WIDTH / 2}px; top: ${offer.location.y - PIN_HEIGHT}px`;
  offerPreset.querySelector(`img`).src = `${offer.author.avatar}`;
  offerPreset.querySelector(`img`).alt = `${offer.offer.title}`;

  return offerPreset;
};

const offers = generateMocks(8);

for (let i = 0; i < offers.length; i++) {
  fragment.append(renderOffer(offers[i]));
}

offersField.append(fragment);

document.querySelector(`.map`).classList.remove(`map--faded`);
