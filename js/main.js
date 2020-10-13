'use strict';

const offersZone = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);

const onLoadSuccess = (data) => {
  window.util.offersWithId = window.util.addId(data);
  window.pin.renderOfferPins(window.util.offersWithId);
};

const activatePage = () => {
  window.form.enableForm();
  map.classList.remove(`map--faded`);
  window.backend.load(onLoadSuccess, window.backend.onError);
};

const deactivatePage = () => {
  window.form.disableForm();
  map.classList.add(`map--faded`);
};

deactivatePage();

offersZone.addEventListener(`click`, (evt) => {
  window.card.openOffer(evt);
});

offersZone.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    window.card.openOffer(evt);
  }
});

window.main = {
  activatePage,
  deactivatePage,
};
