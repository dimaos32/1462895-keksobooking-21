'use strict';

(() => {

  const map = document.querySelector(`.map`);
  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.popup`);

  let openedCard;
  let currentOpenedCard;
  let popupClose;

  const addOfferFeatures = (item, features) => {
    item.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const feature = document.createElement(`li`);
      feature.classList.add(`popup__feature`, `popup__feature--${features[i]}`);
      item.append(feature);
    }
  }

  const addOfferPhotos = (item, photos) => {
    const templatePopupPhoto = item.querySelector(`.popup__photo`);

    item.innerHTML = ``;

    photos.forEach((photo) => {
      const popupPhoto = templatePopupPhoto.cloneNode(true);
      popupPhoto.src = photo;
      item.append(popupPhoto);
    });
  };

  const removeEmptyNodes = (item) => {
    Array.from(item.children).forEach((child) => {
      if (child.tagName !== `IMG` && !child.innerHTML) {
        child.remove();
      }
    });
  };

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
    const popupAvapar = offerPreset.querySelector(`.popup__avatar`);
    const popupTitle = offerPreset.querySelector(`.popup__title`);
    const popupAddress = offerPreset.querySelector(`.popup__text--address`);
    const popupPrice = offerPreset.querySelector(`.popup__text--price`);
    const popupType = offerPreset.querySelector(`.popup__type`);
    const popupCapacity = offerPreset.querySelector(`.popup__text--capacity`);
    const popupTime = offerPreset.querySelector(`.popup__text--time`);
    const popupFeatures = offerPreset.querySelector(`.popup__features`);
    const popupDescription = offerPreset.querySelector(`.popup__description`);
    const popupPhotos = offerPreset.querySelector(`.popup__photos`);

    if (id) {
      offerPreset.dataset.id = id;
    }

    popupAvapar.src = avatar ? avatar : popupAvapar.remove();
    popupTitle.textContent = title;
    popupAddress.textContent = address;
    popupPrice.innerHTML = price ? `${price}&#x20bd;<span>/ночь</span>` : ``;
    popupType.textContent = window.util.getHousingType(type);

    popupCapacity.textContent = rooms && guests
      ? `${window.util.getQEndings(rooms, `room`)} для ${window.util.getQEndings(guests, `guest`)}`
      : ``;

    popupTime.textContent = checkin && checkout
      ? `Заезд после ${checkin}, выезд до ${checkout}`
      : ``;

    addOfferFeatures(popupFeatures, features);
    popupDescription.textContent = description;
    addOfferPhotos(popupPhotos, photos);

    removeEmptyNodes(offerPreset);

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
