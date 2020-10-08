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

  const mainMapPin = document.querySelector(`.map__pin--main`);
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`button`);

  const getMainMapPinCoords = () => {
    const x = Math.round(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
    const y = window.form.isPageActivated
      ? Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT + MAIN_MAP_PIN_NEEDLE_HEIGHT)
      : Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT / 2);

    return {
      x,
      y,
    }
  }

  const renderOfferPin = (offer) => {
    const offerPreset = pinTemplate.cloneNode(true);

    offerPreset.style = `left: ${offer.location.x - PIN_WIDTH / 2}px; top: ${offer.location.y - PIN_HEIGHT}px`;
    offerPreset.dataset.id = `${offer.id}`;
    offerPreset.querySelector(`img`).src = `${offer.author.avatar}`;
    offerPreset.querySelector(`img`).alt = `${offer.offer.title}`;

    return offerPreset;
  };

mainMapPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  const startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  }

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: moveEvt.clientX - startCoords.x,
      y: moveEvt.clientY - startCoords.y,
    }

    startCoords.x = moveEvt.clientX;
    startCoords.y = moveEvt.clientY;

    mainMapPin.style.left = `${mainMapPin.offsetLeft + shift.x}px`;
    mainMapPin.style.top = `${mainMapPin.offsetTop + shift.y}px`;

    const coords = getMainMapPinCoords();

    if (parseInt(coords.x) < LOCATION_X_MIN) {
      mainMapPin.style.left = `${LOCATION_X_MIN - MAIN_MAP_PIN_WIDTH / 2}px`;
    };

    if (parseInt(coords.x) > LOCATION_X_MAX) {
      mainMapPin.style.left = `${LOCATION_X_MAX - MAIN_MAP_PIN_WIDTH / 2}px`;
    };

    if (parseInt(coords.y) < LOCATION_Y_MIN) {
      mainMapPin.style.top = `${LOCATION_Y_MIN - MAIN_MAP_PIN_HEIGHT - MAIN_MAP_PIN_NEEDLE_HEIGHT}px`;
    };

    if (parseInt(coords.y) > LOCATION_Y_MAX) {
      mainMapPin.style.top = `${LOCATION_Y_MAX - MAIN_MAP_PIN_HEIGHT - MAIN_MAP_PIN_NEEDLE_HEIGHT}px`;
    };

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
    activatePage();
  }
});

mainMapPin.addEventListener(`keydown`, (evt) => {
  evt.preventDefault();

  if (evt.key === `Enter` && !window.form.isPageActivated) {
    activatePage();
  }
});

  window.pin = {
    getMainMapPinCoords,
    renderOfferPin,
  };

})();
