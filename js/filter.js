'use strict';

(() => {

  const PINS_QUANTITY = 5;

  const FILTER_ALL = `any`;

  const FILTER_PRICE_LOW = `low`;
  const FILTER_PRICE_MIDDLE = `middle`;
  const FILTER_PRICE_HIGH = `high`;

  const FILTER_PRICE_LIMIT_BOTTOM = 10000;
  const FILTER_PRICE_LIMIT_TOP = 50000;

  const filterForm = document.querySelector(`.map__filters`);
  const housingType = filterForm.querySelector(`#housing-type`);
  const housingPrice = filterForm.querySelector(`#housing-price`);
  const housingRooms = filterForm.querySelector(`#housing-rooms`);
  const housingGuests = filterForm.querySelector(`#housing-guests`);
  const housingFeatures = filterForm.querySelectorAll(`.map__checkbox`);

  const checkHousingType = (item) => {
    if (housingType.value !== FILTER_ALL) {
      return item.offer.type === housingType.value;
    }

    return true;
  };

  const checkHousingPrice = (item) => {
    switch (housingPrice.value) {
      case FILTER_PRICE_MIDDLE:
        return item.offer.price >= FILTER_PRICE_LIMIT_BOTTOM &&
          item.offer.price <= FILTER_PRICE_LIMIT_TOP;
      case FILTER_PRICE_LOW:
        return item.offer.price < FILTER_PRICE_LIMIT_BOTTOM;
      case FILTER_PRICE_HIGH:
        return item.offer.price > FILTER_PRICE_LIMIT_TOP;
      default:
        return housingPrice.value === FILTER_ALL;
    }
  };

  const checkHousingRooms = (item) => {
    if (housingRooms.value !== FILTER_ALL) {
      return item.offer.rooms === +housingRooms.value;
    }

    return true;
  };

  const checkHousingGuests = (item) => {
    if (housingGuests.value !== FILTER_ALL) {
      return item.offer.guests === +housingGuests.value;
    }

    return true;
  };

  const checkHousingFeatures = (item) => {
    for (const feature of housingFeatures) {
      if (feature.checked && !item.offer.features.includes(feature.value)) {
        return false;
      }
    }

    return true;
  };

  const filterOffers = (data) => {
    const filteredOffers = [];

    for (let i = 0; i < data.length &&
      filteredOffers.length < PINS_QUANTITY; i++) {
      if (checkHousingType(data[i]) &&
        checkHousingPrice(data[i]) &&
        checkHousingRooms(data[i]) &&
        checkHousingGuests(data[i]) &&
        checkHousingFeatures(data[i])) {
        filteredOffers.push(data[i]);
      }
    }

    return filteredOffers;
  };

  const onFilterFormChange = () => {
    window.pin.updateOfferPins(filterOffers(window.card.offersWithId));
  };

  filterForm.addEventListener(`change`, window.util.debounce(onFilterFormChange));

  window.filter = {
    filterOffers,
  };

})();
