'use strict';

const offersZone = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const fragmentPinList = document.createDocumentFragment();
const mainMapPin = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);

const activatePage = () => {
  if (!window.form.isPageActivated) {
    window.form.isPageActivated = true;
    window.form.toggleElementsState(adForm, true);
    window.form.completeAddressInput();
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    window.data.offersWithId.forEach((pin) => {
      fragmentPinList.append(window.map.renderOfferPin(pin));
    });

    offersZone.append(fragmentPinList);
  }
};

const deactivatePage = () => {
  window.form.isPageActivated = false;
  window.form.completeAddressInput();

  window.form.toggleElementsState(adForm, false);
  window.form.changeCapacityOptions();

  window.form.syncPrice();
};

deactivatePage();

mainMapPin.addEventListener(`mousedown`, () => {
  if (!window.form.isPageActivated) {
    activatePage();
  }
});

mainMapPin.addEventListener(`keydown`, (evt) => {
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
