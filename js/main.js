'use strict';

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

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const MAIN_MAP_PIN_WIDTH = 62;
const MAIN_MAP_PIN_HEIGHT = 62;
const MAIN_MAP_PIN_NEEDLE_HEIGHT = 22;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const MAX_PRICE = 1000000;

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

const minPricesMap = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

const quantitativeEndingsMap = {
  room: [`комната`, `комнаты`, `комнат`],
  guest: [`гостя`, `гостей`, `гостей`],
};

const capacityOptions = {
  1: `<option value="1" selected>для 1 гостя</option>`,
  2: `<option value="2">для 2 гостей</option>
      <option value="1" selected>для 1 гостя</option>`,
  3: `<option value="3">для 3 гостей</option>
      <option value="2">для 2 гостей</option>
      <option value="1" selected>для 1 гостя</option>`,
  100: `<option value="0" selected>не для гостей</option>`,
};

const offersZone = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const fragmentPinList = document.createDocumentFragment();
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.popup`);
const adForm = document.querySelector(`.ad-form`);
const adFormTitle = adForm.querySelector(`#title`);
const adFormAddress = adForm.querySelector(`#address`);
const adFormPrice = adForm.querySelector(`#price`);
const adFormType = adForm.querySelector(`#type`);
const adFormTime = adForm.querySelector(`.ad-form__element--time`);
const adFormTimein = adForm.querySelector(`#timein`);
const adFormTimeout = adForm.querySelector(`#timeout`);
const adFormRoomNumber = adForm.querySelector(`#room_number`);
const adFormCapacity = adForm.querySelector(`#capacity`);
const mainMapPin = map.querySelector(`.map__pin--main`);

const getRandomIntNumber = (min = 0, max = 100) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomArrayElements = (arr, n = 1) => {
  let copySource = arr.slice();
  let randomArray = [];

  for (let i = 0; i < copySource.length && i < n; i++) {
    const element = getRandomIntNumber(i, copySource.length - 1);
    randomArray.push(copySource[element]);
    const swap = copySource[element];
    copySource[element] = copySource[i];
    copySource[i] = swap;
  }

  return randomArray;
};

getRandomArrayElements([1, 2, 3, 4, 5], 3);

const getTrueQuantitativeEndingWords = (q = 1, word) => {
  if (q % 100 < 11 || q % 100 > 14) {
    if (q % 10 === 1) {
      return `${q} ${quantitativeEndingsMap[word][0]}`;
    } else if (q % 10 > 1 && q % 10 < 5) {
      return `${q} ${quantitativeEndingsMap[word][1]}`;
    }
  }

  return `${q} ${quantitativeEndingsMap[word][2]}`;
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

const getId = (offers) => {
  offers.forEach((offer, i) => {
    offer.id = `${i}`;
  });
};

const renderOfferPin = (offer) => {
  const offerPreset = pinTemplate.cloneNode(true);

  offerPreset.style = `left: ${offer.location.x - PIN_WIDTH / 2}px; top: ${offer.location.y - PIN_HEIGHT}px`;
  offerPreset.dataset.id = `${offer.id}`;
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
  } = item;

  const offerPreset = cardTemplate.cloneNode(true);

  offerPreset.querySelector(`.popup__avatar`).src = avatar;
  offerPreset.querySelector(`.popup__title`).textContent = title;
  offerPreset.querySelector(`.popup__text--address`).textContent = address;
  offerPreset.querySelector(`.popup__type`).textContent = typesMap[type];

  if (price) {
    offerPreset.querySelector(`.popup__text--price`).innerHTML = `${price}&#x20bd;<span>/ночь</span>`;
  } else {
    offerPreset.querySelector(`.popup__text--price`).textContent = ``;
  }

  if (rooms && guests) {
    offerPreset.querySelector(`.popup__text--capacity`).textContent = `${getTrueQuantitativeEndingWords(rooms, `room`)} для ${getTrueQuantitativeEndingWords(guests, `guest`)}`;
  } else {
    offerPreset.querySelector(`.popup__text--capacity`).textContent = ``;
  }

  if (checkin && checkout) {
    offerPreset.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    offerPreset.querySelector(`.popup__text--time`).textContent = ``;
  }

  if (type && rooms) {
    offerPreset.querySelector(`.popup__description`).textContent = description;
  } else {
    offerPreset.querySelector(`.popup__description`).textContent = ``;
  }

  const popupFeatures = offerPreset.querySelector(`.popup__features`);

  popupFeatures.innerHTML = ``;

  for (let i = 0; i < features.length; i++) {
    const feature = document.createElement(`li`);
    feature.classList.add(`popup__feature`);
    feature.classList.add(`popup__feature--${features[i]}`);
    popupFeatures.append(feature);
  }

  for (let i = 0; i < photos.length; i++) {
    offerPreset.querySelectorAll(`.popup__photo`)[i].src = photos[i];

    if (i < photos.length - 1) {
      offerPreset.querySelector(`.popup__photos`)
        .append(offerPreset.querySelector(`.popup__photo`).cloneNode());
    }
  }

  if (!photos) {
    offerPreset.querySelector(`.popup__photo`).remove();
  }

  for (let i = 0; i < offerPreset.children.length; i++) {
    if (
      (!offerPreset.children[i].textContent && i > 1 && i !== 8 && i !== 10) ||
      (!offerPreset.children[i].src && i === 0) ||
      (!offerPreset.children[i].querySelectorAll(`li`).length && i === 8) ||
      (!offerPreset.children[i].querySelectorAll(`img`).length && i === 10)
    ) {
      offerPreset.children[i].classList.add(`hidden`);
    }
  }

  return offerPreset;
};

const toggleFormElementsState = (form, ativate) => {
  const fieldsets = form.querySelectorAll(`fieldset`);

  fieldsets.forEach((fieldset) => {
    fieldset.disabled = !ativate;
  });
};

// const activateFormElements = (form) => {
//   const fieldsets = form.querySelectorAll(`fieldset`);

//   fieldsets.forEach((fieldset) => {
//     fieldset.disabled = false;
//   });
// };

// const deactivateFormElements = (form) => {
//   const fieldsets = form.querySelectorAll(`fieldset`);

//   fieldsets.forEach((fieldset) => {
//     fieldset.disabled = true;
//   });
// };

const completeAddresInput = () => {
  const y = (isPageActivated)
    ? Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT + MAIN_MAP_PIN_NEEDLE_HEIGHT)
    : Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT / 2)

  adFormAddress.value = `${Math.round(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2)}, ${y}`;
};

const changeCapacityOptions = () => {
  adFormCapacity.innerHTML = capacityOptions[adFormRoomNumber.value];
};

let isPageActivated = false;

const activatePage = () => {
  if (!isPageActivated) {
    isPageActivated = true;
    toggleFormElementsState(adForm, true);
    completeAddresInput();
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    offers.forEach((pin) => {
      fragmentPinList.append(renderOfferPin(pin));
    });

    offersZone.append(fragmentPinList);
  }
};

const deactivatePage = () => {
  isPageActivated = false;
  completeAddresInput();

  toggleFormElementsState(adForm, false);
  changeCapacityOptions();

  const minPrice = minPricesMap[adFormType.value];
  adFormPrice.placeholder = minPrice;
  adFormPrice.min = minPrice;
};

const openPopup = (id) => {
  openedCard = renderOfferCard(offers[id]);
  map.append(openedCard);

  popupClose = openedCard.querySelector(`.popup__close`);
  popupClose.addEventListener(`click`, onPopupClose);
  popupClose.addEventListener(`keydown`, onPopupEnterPress);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  if (openedCard) {
    map.removeChild(openedCard);
    openedCard = undefined;
    popupClose.removeEventListener(`click`, onPopupClose);
    popupClose.removeEventListener(`keydown`, onPopupEnterPress);
    document.removeEventListener(`keydown`, onPopupEscPress);
  }
};

const onPopupClose = () => {
  closePopup();
};

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    closePopup();
  }
};

const openOffer = (evt) => {
  let id = evt.target.dataset.id;
  if (evt.target.tagName !== `BUTTON`) {
    id = evt.target.parentNode.dataset.id;
  }

  if (id) {
    closePopup();
    openPopup(id);
  }
};

deactivatePage();

let offers = generateMocks(MOCKS_QUANTITY);

getId(offers);

mainMapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

mainMapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activatePage();
  }
});

adFormTitle.addEventListener(`input`, () => {
  const valueLength = adFormTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adFormTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    adFormTitle.setCustomValidity(``);
  }

  adFormTitle.reportValidity();
});

adFormPrice.addEventListener(`input`, () => {
  const price = adFormPrice.value;
  const minPrice = minPricesMap[adFormType.value];

  if (price < minPrice) {
    adFormPrice.setCustomValidity(`Минимальная цена за ночь ${minPrice} руб. Вам стоит увеличить цену.`);
  } else if (price > MAX_PRICE) {
    adFormPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE} руб. Вам стоит уменьшить цену.`);
  } else {
    adFormPrice.setCustomValidity(``);
  }

  adFormPrice.reportValidity();
});

adFormType.addEventListener(`change`, () => {
  const minPrice = minPricesMap[adFormType.value];
  adFormPrice.placeholder = minPrice;
  adFormPrice.min = minPrice;
});

adFormTime.addEventListener(`change`, (evt) => {
  adFormTimeout.value = evt.target.value;
  adFormTimein.value = evt.target.value;
});

adFormRoomNumber.addEventListener(`change`, () => {
  changeCapacityOptions();
});

let openedCard;
let popupClose;

offersZone.addEventListener(`click`, (evt) => {
  openOffer(evt);
});


offersZone.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openOffer(evt);
  }
});
