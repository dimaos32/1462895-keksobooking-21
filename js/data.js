'use strict';

(() => {

  const MOCKS_QUANTITY = 8;

  const PRICE_MIN = 1;
  const PRICE_MAX = 50;
  const PRICE_STEP = 1000;

  const ROOMS_MIN = 1;
  const ROOMS_MAX = 6;

  const GUESTS_MIN = 2;
  const GUESTS_MAX = 12;

  const LOCATION_X_MIN = 0;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;

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

  const PHOTOS_DB = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];

  const RENT_WORDS_DB = [
    `Сдам`,
    `Сдается`,
    `Свободно жилье -`,
    `Можно арендовать`,
    `Сдается жилье -`,
    `Специально для вас -`,
  ];

  const DESCRIPTION_WORDS_DB = [
    `красивые виды из окон.`,
    `тихий район.`,
    `территория Якудзы.`,
    `центр города.`,
    `ярко выраженный местный колорит.`,
  ];

  const qEndingsMap = {
    room: [`комната`, `комнаты`, `комнат`],
    guest: [`гостя`, `гостей`, `гостей`],
  };

  const typesMap = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  const offersZone = document.querySelector(`.map__pins`);

  const getQEndings = (q = 1, word) => {
    if (q % 100 < 11 || q % 100 > 14) {
      if (q % 10 === 1) {
        return `${q} ${qEndingsMap[word][0]}`;
      } else if (q % 10 > 1 && q % 10 < 5) {
        return `${q} ${qEndingsMap[word][1]}`;
      }
    }

    return `${q} ${qEndingsMap[word][2]}`;
  };

  const getHousingType = (type) => {
    return typesMap[type];
  };

  const getTitle = (type) => {
    return `${RENT_WORDS_DB[window.util.getRandomIntNumber(0, RENT_WORDS_DB.length - 1)]} ${getHousingType(type)}${(Math.random() < 0.5 ? `!` : `.`)}`;
  };

  const getDescription = (type, rooms) => {
    return `${getHousingType(type)}, кол-во комнат - ${rooms}, ${DESCRIPTION_WORDS_DB[window.util.getRandomIntNumber(0, DESCRIPTION_WORDS_DB.length - 1)]}`;
  };

  const generateMocks = (n) => {
    const generatedMocks = [];

    let avatarNumbers = [];

    for (let i = 1; i <= n; i++) {
      avatarNumbers.push(i < 10 ? `0` + i : i);
    }

    avatarNumbers = window.util.getRandomArrayElements(avatarNumbers, n);

    for (let i = 0; i < n; i++) {
      const mock = {
        author: {
          avatar: `img/avatars/user${avatarNumbers[i]}.png`
        },
        offer: {
          title: ``,
          address: ``,
          price: window.util.getRandomIntNumber(PRICE_MIN, PRICE_MAX) * PRICE_STEP,
          type: TYPES_DB[window.util.getRandomIntNumber(0, TYPES_DB.length - 1)],
          rooms: window.util.getRandomIntNumber(ROOMS_MIN, ROOMS_MAX),
          guests: window.util.getRandomIntNumber(GUESTS_MIN, GUESTS_MAX),
          checkin: CHECK_IN_OUT_DB[window.util.getRandomIntNumber(0, CHECK_IN_OUT_DB.length - 1)],
          checkout: CHECK_IN_OUT_DB[window.util.getRandomIntNumber(0, CHECK_IN_OUT_DB.length - 1)],
          features: window.util.getRandomArrayElements(FEATURES_DB, window.util.getRandomIntNumber(1, FEATURES_DB.length)),
          description: ``,
          photos: window.util.getRandomArrayElements(PHOTOS_DB, window.util.getRandomIntNumber(1, PHOTOS_DB.length))
        },
        location: {
          x: window.util.getRandomIntNumber(LOCATION_X_MIN, offersZone.offsetWidth),
          y: window.util.getRandomIntNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
        }
      };

      mock.offer.title = getTitle(mock.offer.type);
      mock.offer.address = `${mock.location.x} ${mock.location.y}`;
      mock.offer.description = getDescription(mock.offer.type, mock.offer.rooms);

      generatedMocks.push(mock);
    }

    return generatedMocks;
  };

  const offers = generateMocks(MOCKS_QUANTITY);

  const getId = (item) => {
    let offersWithId = item.slice();

    offersWithId.forEach((offer, i) => {
      offer.id = `${i}`;
    });

    return offersWithId;
  };

  window.data = {
    offersWithId: getId(offers),
    getQEndings,
    getHousingType,
    generateMocks,
    getId,
  };

})();
