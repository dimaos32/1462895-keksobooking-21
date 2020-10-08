'use strict';

const offersZone = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const fragmentPinList = document.createDocumentFragment();
const adForm = document.querySelector(`.ad-form`);

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

offersZone.addEventListener(`click`, (evt) => {
  window.card.openOffer(evt);
});


offersZone.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    window.card.openOffer(evt);
  }
});
