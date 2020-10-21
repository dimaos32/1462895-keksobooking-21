'use strict';

(() => {

  const PINS_QUANTITY = 5;

  const FILTER_ALL = `any`;

  const FILTER_PRICE = {
    options: {
      low: `low`,
      middle: `middle`,
      high: `high`,
    },
    borders: {
      middleBottom: 10000,
      middleTop: 50000,
    }
  };

  const filterForm = document.querySelector(`.map__filters`);
  const housingType = filterForm.querySelector(`#housing-type`);
  const housingPrice = filterForm.querySelector(`#housing-price`);
  const housingRooms = filterForm.querySelector(`#housing-rooms`);
  const housingGuests = filterForm.querySelector(`#housing-guests`);
  // const isWifi = filterForm.querySelector(`#filter-wifi`);
  // const isDishwasher = filterForm.querySelector(`#filter-dishwasher`);
  // const isParking = filterForm.querySelector(`#filter-parking`);
  // const isWasher = filterForm.querySelector(`#filter-washer`);
  // const isElevator = filterForm.querySelector(`#filter-elevator`);
  // const isConditioner = filterForm.querySelector(`#filter-conditioner`);
  const housingFeatures = document.querySelectorAll(`.map__checkbox`);

  const checkHousingType = (item) => {
    if (housingType.value !== FILTER_ALL) {
      return item.offer.type === housingType.value;
    }
    return true;
  };

  const checkHousingPrice = (item) => {
    switch (housingPrice.value) {
      case FILTER_PRICE.options.middle:
        return item.offer.price >= FILTER_PRICE.borders.middleBottom &&
          item.offer.price <= FILTER_PRICE.borders.middleTop;
      case FILTER_PRICE.options.low:
        return item.offer.price < FILTER_PRICE.borders.middleBottom;
      case FILTER_PRICE.options.high:
        return item.offer.price > FILTER_PRICE.borders.middleTop;
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

    let filteredOffers = [];

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

    // const isFeatures = [
    //   {flag: isWifi.checked, description: `wifi`},
    //   {flag: isDishwasher.checked, description: `dishwasher`},
    //   {flag: isParking.checked, description: `parking`},
    //   {flag: isWasher.checked, description: `washer`},
    //   {flag: isElevator.checked, description: `elevator`},
    //   {flag: isConditioner.checked, description: `conditioner`},
    // ];

    // isFeatures.forEach((feature) => {
    //   if (feature.flag) {
    //     filteredOffers = filteredOffers.filter((item) => {
    //       return item.offer.features.includes(feature.description);
    //     });
    //   }
    // });

    return filteredOffers;
  };

  const onFilterFormChange = () => {

    window.pin.updateOfferPins(filterOffers(window.card.offersWithId));
  };

  filterForm.addEventListener(`change`, onFilterFormChange);

  window.filter = {
    filterOffers,
  };

})();
