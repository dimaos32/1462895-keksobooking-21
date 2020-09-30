'use strict';

const MOCKS_QUANTITY = 8;

const PRICE_MIN = 1;
const PRICE_MAX = 50;
const PRICE_STEP = 1000;

const ROOMS_MIN = 1;
const ROOMS_MAX = 4;

const GUESTS_MIN = 2;
const GUESTS_MAX = 10;

const LOCATION_X_MIN = 0;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const RENT_WORDS_DB = [
  `Сдам`,
  `Сдается`,
  `Свободно жилье -`,
  `Можно арендовать`,
  `Сдается жилье -`,
  `Специально для вас -`,
];

const TYPES_DB = [`palace`, `flat`, `house`, `bungalow`];

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

const typesMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`,
};

const offersZone = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const fragmentPinList = document.createDocumentFragment();
const fragmentOfferCards = document.createDocumentFragment();
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.popup`);

const filtersContainer = map.querySelector(`.map__filters-container`);

const getRandomIntNumber = (min = 0, max = 100) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomArrayElements = (arr, n = 1) => {
  let randomArray = [];

  for (let i = 0; i < arr.length && i < n; i++) {
    const element = getRandomIntNumber(i, arr.length - 1);
    randomArray.push(arr[element]);
    const swap = arr[element];
    arr[element] = arr[i];
    arr[i] = swap;
  }

  return randomArray;
};

const getTitle = (type) => {
  return `${RENT_WORDS_DB[getRandomIntNumber(0, RENT_WORDS_DB.length - 1)]} ${typesMap[type]}${(Math.random() < 0.5 ? `!` : `.`)}`;
};

const getDescription = (type, rooms) => {
  return `${typesMap[type]}, кол-во комнат - ${rooms}, ${DESCRIPTION_WORDS_DB[getRandomIntNumber(0, DESCRIPTION_WORDS_DB.length - 1)]}`;
};

const generateMocks = (n) => {
  const generatedMocks = [];

  let avatarNumbers = [];

  for (let i = 1; i <= n; i++) {
    avatarNumbers.push(i < 10 ? `0` + i : i);
  }

  avatarNumbers = getRandomArrayElements(avatarNumbers, n);

  for (let i = 0; i < n; i++) {
    const mock = {
      author: {
        avatar: `img/avatars/user${avatarNumbers[i]}.png`
      },
      offer: {
        title: ``,
        address: ``,
        price: getRandomIntNumber(PRICE_MIN, PRICE_MAX) * PRICE_STEP,
        type: TYPES_DB[getRandomIntNumber(0, TYPES_DB.length - 1)],
        rooms: getRandomIntNumber(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomIntNumber(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECK_IN_OUT_DB[getRandomIntNumber(0, CHECK_IN_OUT_DB.length - 1)],
        checkout: CHECK_IN_OUT_DB[getRandomIntNumber(0, CHECK_IN_OUT_DB.length - 1)],
        features: getRandomArrayElements(FEATURES_DB, getRandomIntNumber(1, FEATURES_DB.length)),
        description: ``,
        photos: getRandomArrayElements(PHOTOS_DB, getRandomIntNumber(1, PHOTOS_DB.length))
      },
      location: {
        x: getRandomIntNumber(LOCATION_X_MIN, offersZone.offsetWidth),
        y: getRandomIntNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
      }
    };

    mock.offer.title = getTitle(mock.offer.type);
    mock.offer.address = `${mock.location.x} ${mock.location.y}`;
    mock.offer.description = getDescription(mock.offer.type, mock.offer.rooms);

    generatedMocks.push(mock);
  }

  return generatedMocks;
};

const renderOfferPin = (offer) => {
  const offerPreset = pinTemplate.cloneNode(true);

  offerPreset.style = `left: ${offer.location.x - PIN_WIDTH / 2}px; top: ${offer.location.y - PIN_HEIGHT}px`;
  offerPreset.querySelector(`img`).src = `${offer.author.avatar}`;
  offerPreset.querySelector(`img`).alt = `${offer.offer.title}`;

  return offerPreset;
};

const renderOfferCard = (item) => {
  const {
    author: {
      avatar
    },
    offer: {
      title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
    },
    location: {
      x,
      y,
    },
  } = item;

  const offerPreset = cardTemplate.cloneNode(true);

  if (avatar) {
    offerPreset.querySelector(`.popup__avatar`).src = avatar;
  } else {
    offerPreset.querySelector(`.popup__avatar`).classList.add(`hidden`);
  }

  if (title) {
    offerPreset.querySelector(`.popup__title`).textContent = title;
  } else {
    offerPreset.querySelector(`.popup__title`).classList.add(`hidden`);
  }

  if (address) {
    offerPreset.querySelector(`.popup__text--address`).textContent = address;
  } else {
    offerPreset.querySelector(`.popup__text--address`).classList.add(`hidden`);
  }

  if (price) {
    offerPreset.querySelector(`.popup__text--price`).innerHTML = `${price}&#x20bd;<span>/ночь</span>`;
  } else {
    offerPreset.querySelector(`.popup__text--price`).classList.add(`hidden`);
  }

  if (type) {
    offerPreset.querySelector(`.popup__type`).textContent = typesMap[type];
  } else {
    offerPreset.querySelector(`.popup__type`).classList.add(`hidden`);
  }

  if (rooms && guests) {
    offerPreset.querySelector(`.popup__text--capacity`).textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    offerPreset.querySelector(`.popup__text--capacity`).classList.add(`hidden`);
  }

  if (checkin && checkout) {
    offerPreset.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    offerPreset.querySelector(`.popup__text--time`).classList.add(`hidden`);
  }

  if (type && rooms) {
    offerPreset.querySelector(`.popup__description`).textContent = description;
  } else {
    offerPreset.querySelector(`.popup__description`).classList.add(`hidden`);
  }

  if (features.length) {
    for (let i = 0; i < FEATURES_DB.length; i++) {
      if (!features.includes(FEATURES_DB[i])) {
        offerPreset.querySelector(`.popup__feature--${(FEATURES_DB[i])}`).remove();
      }
    }
  } else {
    offerPreset.querySelector(`.popup__features`).classList.add(`hidden`);
  }

  if (photos.length) {
    for (let i = 0; i < photos.length; i++) {
      offerPreset.querySelectorAll(`.popup__photo`)[i].src = photos[i];

      if (i < photos.length - 1) {
        offerPreset.querySelector(`.popup__photos`)
          .append(offerPreset.querySelector(`.popup__photo`).cloneNode());
      }
    }
  } else {
    offerPreset.querySelector(`.popup__photo`).classList.add(`hidden`);
  }

  return offerPreset;
};

const offers = generateMocks(MOCKS_QUANTITY);

for (let i = 0; i < offers.length; i++) {
  fragmentPinList.append(renderOfferPin(offers[i]));
}

offersZone.append(fragmentPinList);
fragmentOfferCards.append(renderOfferCard(offers[0]));
map.insertBefore(fragmentOfferCards, filtersContainer);
map.classList.remove(`map--faded`);

