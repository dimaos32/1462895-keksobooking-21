'use strict';

(() => {

  const filterForm = document.querySelector(`.map__filters`);

  const onFilterFormChange = (evt) => {
    console.log(evt.target);
    window.pin.updateOfferPins(window.util.offersWithId);
  };

  window.data = {
    onFilterFormChange,
  };

  filterForm.addEventListener(`change`, onFilterFormChange);

})();
