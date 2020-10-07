'use strict';

(() => {

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`button`);

  const renderOfferPin = (offer) => {
    const offerPreset = pinTemplate.cloneNode(true);

    offerPreset.style = `left: ${offer.location.x - PIN_WIDTH / 2}px; top: ${offer.location.y - PIN_HEIGHT}px`;
    offerPreset.dataset.id = `${offer.id}`;
    offerPreset.querySelector(`img`).src = `${offer.author.avatar}`;
    offerPreset.querySelector(`img`).alt = `${offer.offer.title}`;

    return offerPreset;
  };

  window.map = {
    renderOfferPin,
  };

})();
