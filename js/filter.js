'use strict';

(() => {

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
  const isWifi = filterForm.querySelector(`#filter-wifi`);
  const isDishwasher = filterForm.querySelector(`#filter-dishwasher`);
  const isParking = filterForm.querySelector(`#filter-parking`);
  const isWasher = filterForm.querySelector(`#filter-washer`);
  const isElevator = filterForm.querySelector(`#filter-elevator`);
  const isConditioner = filterForm.querySelector(`#filter-conditioner`);

  const onFilterFormChange = () => {
    let filteredOffers = window.card.offersWithId;

    if (housingType.value !== FILTER_ALL) {
      filteredOffers = filteredOffers.filter((item) => {
        return item.offer.type === housingType.value;
      });
    }

    switch (housingPrice.value) {
      case FILTER_PRICE.options.middle:
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.price >= FILTER_PRICE.borders.middleBottom &&
            item.offer.price <= FILTER_PRICE.borders.middleTop;
        });
        break;
      case FILTER_PRICE.options.low:
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.price < FILTER_PRICE.borders.middleBottom;
        });
        break;
      case FILTER_PRICE.options.high:
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.price > FILTER_PRICE.borders.middleTop;
        });
        break;
    }

    if (housingGuests.value !== FILTER_ALL) {
      filteredOffers = filteredOffers.filter((item) => {
        return item.offer.guests === +housingGuests.value;
      });
    }

    if (housingRooms.value !== FILTER_ALL) {
      filteredOffers = filteredOffers.filter((item) => {
        return item.offer.rooms === +housingRooms.value;
      });
    }

    const isFeatures = [
      {flag: isWifi.checked, description: `wifi`},
      {flag: isDishwasher.checked, description: `dishwasher`},
      {flag: isParking.checked, description: `parking`},
      {flag: isWasher.checked, description: `washer`},
      {flag: isElevator.checked, description: `elevator`},
      {flag: isConditioner.checked, description: `conditioner`},
    ];

    isFeatures.forEach((feature) => {
      if (feature.flag) {
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.features.includes(feature.description);
        });
      }
    });

    window.pin.updateOfferPins(filteredOffers);
  };

  filterForm.addEventListener(`change`, onFilterFormChange);

})();
