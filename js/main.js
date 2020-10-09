'use strict';

const offersZone = document.querySelector(`.map__pins`);
const mainMapPin = offersZone.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const fragmentPinList = document.createDocumentFragment();

const activatePage = () => {
  window.form.enableForm();

  map.classList.remove(`map--faded`);

  window.data.offersWithId.forEach((pin) => {
    fragmentPinList.append(window.pin.renderOfferPin(pin));
  });

  offersZone.append(fragmentPinList);
};

const deactivatePage = () => {
  window.form.disableForm();
};

deactivatePage();

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

    window.pin.controlsMainMapPinCoords();

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

offersZone.addEventListener(`click`, (evt) => {
  window.card.openOffer(evt);
});


offersZone.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    window.card.openOffer(evt);
  }
});
