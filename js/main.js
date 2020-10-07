'use strict';

const MOCKS_QUANTITY = 8;

const offersZone = document.querySelector(`.map__pins`);
const map = document.querySelector(`.map`);
const fragmentPinList = document.createDocumentFragment();
const mainMapPin = map.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);

const offers = window.data.generateMocks(MOCKS_QUANTITY);
const offersWithId = window.data.getId(offers);

let isPageActivated = false;

const activatePage = () => {
  if (!isPageActivated) {
    isPageActivated = true;
    window.form.toggleElementsState(adForm, true);
    window.form.completeAddressInput();
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    offersWithId.forEach((pin) => {
      fragmentPinList.append(window.map.renderOfferPin(pin));
    });

    offersZone.append(fragmentPinList);
  }
};

const deactivatePage = () => {
  isPageActivated = false;
  window.form.completeAddressInput();

  window.form.toggleElementsState(adForm, false);
  window.form.changeCapacityOptions();

  window.form.syncPrice();
};

deactivatePage();

mainMapPin.addEventListener(`mousedown`, (evt) => {
  if (!isPageActivated) {
    activatePage();
  }
});

mainMapPin.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter` && !isPageActivated) {
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
