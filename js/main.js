'use strict';

const map = document.querySelector(`.map`);
const offersZone = map.querySelector(`.map__pins`);
const mapFilters = document.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);

const onLoadSuccess = (data) => {
  window.card.offersWithId = window.util.addId(data);
  window.pin.updateOfferPins(window.filter.filterOffers(window.card.offersWithId));
};

const onLoadError = (message) => {
  const node = document.createElement(`div`);

  node.classList.add(`on-error-message`);

  node.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

const activatePage = () => {
  window.form.enableForm();
  map.classList.remove(`map--faded`);
  window.backend.load(onLoadSuccess, onLoadError);
};

const deactivatePage = () => {
  window.form.disableForm();
  window.pin.deleteOfferPins();
  map.classList.add(`map--faded`);
  adForm.reset();
  mapFilters.reset();
  window.card.closePopup();
  window.pin.mainMapPinReset();
  window.form.completeAddressInput();
};

deactivatePage();

offersZone.addEventListener(`click`, (evt) => {
  window.card.openOffer(evt);
});

offersZone.addEventListener(`keydown`, (evt) => {
  if (evt.key === window.util.Key.ENTER) {
    window.card.openOffer(evt);
  }
});

window.main = {
  activatePage,
  deactivatePage,
};
