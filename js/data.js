'use strict';

(() => {

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
    let filteredOffers = window.util.offersWithId;

    if (housingType.value !== `any`) {
      filteredOffers = filteredOffers.filter((item) => {
        return item.offer.type === housingType.value;
      });
    }

    switch (housingPrice.value) {
      case `middle`:
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.price >= 10000 && item.offer.price <= 50000;
        });
        break;
      case `low`:
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.price < 10000;
        });
        break;
      case `high`:
        filteredOffers = filteredOffers.filter((item) => {
          return item.offer.price > 50000;
        });
        break;
    }

    if (housingGuests.value !== `any`) {
      filteredOffers = filteredOffers.filter((item) => {
        return item.offer.guests === +housingGuests.value;
      });
    }

    if (housingRooms.value !== `any`) {
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

  window.data = {
    onFilterFormChange,
  };

  filterForm.addEventListener(`change`, onFilterFormChange);

})();
