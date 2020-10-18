'use strict';

(() => {

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  const MAIN_MAP_PIN_WIDTH = 62;
  const MAIN_MAP_PIN_HEIGHT = 62;
  const MAIN_MAP_PIN_NEEDLE_HEIGHT = 22;

  const LOCATION_X_MIN = 0;
  const LOCATION_X_MAX = 1199;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;

  const offersZone = document.querySelector(`.map__pins`);
  const mainMapPin = offersZone.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`button`);

  const mainMapPinDefaultPos = `left: 570px; top: 375px;`;

  const mainMapPinReset = () => {
    mainMapPin.style = mainMapPinDefaultPos;
  };

  const getMainMapPinCoords = () => {
    const x = Math.round(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
    const y = window.form.isPageActivated
      ? Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT + MAIN_MAP_PIN_NEEDLE_HEIGHT)
      : Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT / 2);

    return {
      x,
      y,
    };
  };

  const controlsMainMapPinCoords = () => {
    const coords = getMainMapPinCoords();

    const mainPinLeftMin = LOCATION_X_MIN - MAIN_MAP_PIN_WIDTH / 2;
    const mainPinLeftMax = LOCATION_X_MAX - MAIN_MAP_PIN_WIDTH / 2;
    const mainPinTopMin = LOCATION_Y_MIN - MAIN_MAP_PIN_HEIGHT - MAIN_MAP_PIN_NEEDLE_HEIGHT;
    const mainPinTopMax = LOCATION_Y_MAX - MAIN_MAP_PIN_HEIGHT - MAIN_MAP_PIN_NEEDLE_HEIGHT;

    if (parseInt(coords.x, 10) < LOCATION_X_MIN) {
      mainMapPin.style.left = `${mainPinLeftMin}px`;
    }

    if (parseInt(coords.x, 10) > LOCATION_X_MAX) {
      mainMapPin.style.left = `${mainPinLeftMax}px`;
    }

    if (parseInt(coords.y, 10) < LOCATION_Y_MIN) {
      mainMapPin.style.top = `${mainPinTopMin}px`;
    }

    if (parseInt(coords.y, 10) > LOCATION_Y_MAX) {
      mainMapPin.style.top = `${mainPinTopMax}px`;
    }
  };

  const renderOfferPin = (offer) => {
    const offerPreset = pinTemplate.cloneNode(true);

    offerPreset.style = `left: ${offer.location.x - PIN_WIDTH / 2}px; top: ${offer.location.y - PIN_HEIGHT}px`;
    offerPreset.dataset.id = `${offer.id}`;
    offerPreset.querySelector(`img`).src = `${offer.author.avatar}`;
    offerPreset.querySelector(`img`).alt = `${offer.offer.title}`;

    return offerPreset;
  };

  const renderOfferPins = (data) => {
    const fragment = document.createDocumentFragment();

    data = window.util.getRandomArrayElements(data, data.length);

    for (let i = 0; i < data.length && i < 5; i++) {
      fragment.append(renderOfferPin(data[i]));
    }

    offersZone.append(fragment);
  };

  const deleteOfferPins = () => {
    const pins = offersZone.querySelectorAll(`.map__pin`);

    pins.forEach((pin) => {
      if (!pin.classList.contains(`map__pin--main`)) {
        pin.remove();
      }
    });
  };

  const updateOfferPins = (data) => {
    deleteOfferPins();
    window.card.closePopup();
    renderOfferPins(data);
  };

  mainMapPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      mainMapPin.style.left = `${mainMapPin.offsetLeft + shift.x}px`;
      mainMapPin.style.top = `${mainMapPin.offsetTop + shift.y}px`;

      controlsMainMapPinCoords();
      window.form.completeAddressInput();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      window.form.completeAddressInput();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

    if (!window.form.isPageActivated) {
      window.main.activatePage();
    }
  });

  mainMapPin.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();

    if (evt.key === `Enter` && !window.form.isPageActivated) {
      window.main.activatePage();
    }
  });

  window.pin = {
    mainMapPinReset,
    getMainMapPinCoords,
    controlsMainMapPinCoords,
    deleteOfferPins,
    updateOfferPins
  };

})();
