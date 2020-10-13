'use strict';

(() => {

  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.popup`);

  let openedCard;
  let currentOpenedCard;
  let popupClose;

  const renderOfferCard = (item) => {
    const {
      author: {
        avatar
      },
      id,
      offer: {
        title,
        address,
        price,
        type,
        rooms,
        guests,
        checkin,
        checkout,
        features,
        description,
        photos,
      },
    } = item;

    const offerPreset = cardTemplate.cloneNode(true);

    if (id) {
      offerPreset.dataset.id = id;
    }

    offerPreset.querySelector(`.popup__avatar`).src = avatar;
    offerPreset.querySelector(`.popup__title`).textContent = title;
    offerPreset.querySelector(`.popup__text--address`).textContent = address;
    offerPreset.querySelector(`.popup__type`).textContent = window.util.getHousingType(type);
    offerPreset.querySelector(`.popup__description`).textContent = description;

    offerPreset.querySelector(`.popup__avatar`).src = avatar
      ? avatar
      : offerPreset.querySelector(`.popup__avatar`).remove();

    offerPreset.querySelector(`.popup__text--price`).innerHTML = price
      ? `${price}&#x20bd;<span>/ночь</span>`
      : ``;

    offerPreset.querySelector(`.popup__text--capacity`).textContent = rooms && guests
      ? `${window.util.getQEndings(rooms, `room`)} для ${window.util.getQEndings(guests, `guest`)}`
      : ``;

    offerPreset.querySelector(`.popup__text--time`).textContent = checkin && checkout
      ? `Заезд после ${checkin}, выезд до ${checkout}`
      : ``;

    const popupFeatures = offerPreset.querySelector(`.popup__features`);

    popupFeatures.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const feature = document.createElement(`li`);
      feature.classList.add(`popup__feature`, `popup__feature--${features[i]}`);
      popupFeatures.append(feature);
    }

    const popupPhotos = offerPreset.querySelector(`.popup__photos`);
    const templatePopupPhoto = popupPhotos.querySelector(`.popup__photo`);

    popupPhotos.innerHTML = ``;

    photos.forEach((photo) => {
      const popupPhoto = templatePopupPhoto.cloneNode(true);
      popupPhoto.src = photo;
      popupPhotos.append(popupPhoto);
    });

    Array.from(offerPreset.children).forEach((child) => {
      if (child.tagName !== `IMG` && !child.innerHTML) {
        child.remove();
      }
    });

    return offerPreset;
  };

  const openPopup = (id) => {
    const card = window.util.offersWithId.find((item) => item.id === id);

    openedCard = renderOfferCard(card);
    map.append(openedCard);

    popupClose = openedCard.querySelector(`.popup__close`);
    popupClose.addEventListener(`click`, onPopupClose);
    popupClose.addEventListener(`keydown`, onPopupEnterPress);
    document.addEventListener(`keydown`, onPopupEscPress);

    currentOpenedCard = openedCard;
  };

  const closePopup = () => {
    if (openedCard) {
      map.removeChild(openedCard);
      openedCard = null;
      currentOpenedCard = null;
    }
  };

  const onPopupClose = () => {
    closePopup();
  };

  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const onPopupEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openOffer = (evt) => {
    if (evt.target.closest(`.map__pin`)) {
      const id = evt.target.closest(`.map__pin`).dataset.id;

      if ((!currentOpenedCard || currentOpenedCard.dataset.id !== id) && id) {
        closePopup();
        openPopup(id);
      }
    }
  };

  window.card = {
    renderOfferCard,
    openOffer,
  };

})();
