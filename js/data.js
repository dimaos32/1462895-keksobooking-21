'use strict';

(() => {

  const filterForm = document.querySelector(`.map__filters`);

  const onFilterFormChange = () => {
    window.pin.updateOfferPins();
  };

  window.data = {
    onFilterFormChange,
  };

  filterForm.addEventListener(`change`, onFilterFormChange);

})();
