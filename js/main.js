'use strict';

let offersWithId = [];

const map = document.querySelector(`.map`);
const offersZone = map.querySelector(`.map__pins`);

const onLoadSuccess = (data) => {
  window.util.offersWithId = window.util.addId(data);
  window.pin.renderOfferPins(window.util.offersWithId);
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
