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
    offerPreset.querySelector(`.popup__type`).textContent = window.data.getHousingType(type);

    if (price) {
      offerPreset.querySelector(`.popup__text--price`).innerHTML = `${price}&#x20bd;<span>/ночь</span>`;
    } else {
      offerPreset.querySelector(`.popup__text--price`).textContent = ``;
    }

    if (rooms && guests) {
      offerPreset.querySelector(`.popup__text--capacity`).textContent = `${window.data.getQEndings(rooms, `room`)} для ${window.data.getQEndings(guests, `guest`)}`;
    } else {
      offerPreset.querySelector(`.popup__text--capacity`).textContent = ``;
    }

    if (checkin && checkout) {
      offerPreset.querySelector(`.popup__text--time`).textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
    } else {
      offerPreset.querySelector(`.popup__text--time`).textContent = ``;
    }

    if (type && rooms) {
      offerPreset.querySelector(`.popup__description`).textContent = description;
    } else {
      offerPreset.querySelector(`.popup__description`).textContent = ``;
    }

    const popupFeatures = offerPreset.querySelector(`.popup__features`);

    popupFeatures.innerHTML = ``;

    for (let i = 0; i < features.length; i++) {
      const feature = document.createElement(`li`);
      feature.classList.add(`popup__feature`);
      feature.classList.add(`popup__feature--${features[i]}`);
      popupFeatures.append(feature);
    }

    for (let i = 0; i < photos.length; i++) {
      offerPreset.querySelectorAll(`.popup__photo`)[i].src = photos[i];

      if (i < photos.length - 1) {
        offerPreset.querySelector(`.popup__photos`)
          .append(offerPreset.querySelector(`.popup__photo`).cloneNode());
      }
    }

    if (!photos) {
      offerPreset.querySelector(`.popup__photo`).remove();
    }

    for (let i = 0; i < offerPreset.children.length; i++) {
      if (
        (!offerPreset.children[i].textContent && i > 1 && i !== 8 && i !== 10) ||
        (!offerPreset.children[i].src && i === 0) ||
        (!offerPreset.children[i].querySelectorAll(`li`).length && i === 8) ||
        (!offerPreset.children[i].querySelectorAll(`img`).length && i === 10)
      ) {
        offerPreset.children[i].classList.add(`hidden`);
      }
    }

    return offerPreset;
  };

  const openPopup = (id) => {
    const card = window.data.offersWithId.find((item) => {
      return item.id === id;
    });

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
