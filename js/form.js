'use strict';

(() => {

  const MAIN_MAP_PIN_WIDTH = 62;
  const MAIN_MAP_PIN_HEIGHT = 62;
  const MAIN_MAP_PIN_NEEDLE_HEIGHT = 22;

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const MAX_PRICE = 1000000;

  const minPricesMap = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalow: 0,
  };

  const capacityOptions = {
    1: `<option value="1" selected>для 1 гостя</option>`,
    2: `<option value="2">для 2 гостей</option>
        <option value="1" selected>для 1 гостя</option>`,
    3: `<option value="3">для 3 гостей</option>
        <option value="2">для 2 гостей</option>
        <option value="1" selected>для 1 гостя</option>`,
    100: `<option value="0" selected>не для гостей</option>`,
  };

  const map = document.querySelector(`.map`);
  const mainMapPin = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormTitle = adForm.querySelector(`#title`);
  const adFormAddress = adForm.querySelector(`#address`);
  const adFormPrice = adForm.querySelector(`#price`);
  const adFormType = adForm.querySelector(`#type`);
  const adFormTime = adForm.querySelector(`.ad-form__element--time`);
  const adFormTimein = adForm.querySelector(`#timein`);
  const adFormTimeout = adForm.querySelector(`#timeout`);
  const adFormRoomNumber = adForm.querySelector(`#room_number`);
  const adFormCapacity = adForm.querySelector(`#capacity`);

  let isPageActivated = false;

  const toggleElementsState = (form, ativate) => {
    const fieldsets = form.querySelectorAll(`fieldset`);

    fieldsets.forEach((fieldset) => {
      fieldset.disabled = !ativate;
    });
  };

  const completeAddressInput = () => {
    const y = isPageActivated
      ? Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT + MAIN_MAP_PIN_NEEDLE_HEIGHT)
      : Math.round(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT / 2);

    adFormAddress.value = `${Math.round(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2)}, ${y}`;
  };

  const changeCapacityOptions = () => {
    adFormCapacity.innerHTML = capacityOptions[adFormRoomNumber.value];
  };

  const syncPrice = () => {
    const minPrice = minPricesMap[adFormType.value];
    adFormPrice.placeholder = minPrice;
    adFormPrice.min = minPrice;
  };

  const enableForm = () => {
    isPageActivated = true;

    toggleElementsState(adForm, true);
    completeAddressInput();
  };

  const disableForm = () => {
    isPageActivated = false;

    toggleElementsState(adForm, false);
    completeAddressInput();

    changeCapacityOptions();
    syncPrice();
  };

  adFormTitle.addEventListener(`input`, () => {
    const valueLength = adFormTitle.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      adFormTitle.setCustomValidity(`Еще ${MIN_TITLE_LENGTH - valueLength} символов`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      adFormTitle.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символов`);
    } else {
      adFormTitle.setCustomValidity(``);
    }

    adFormTitle.reportValidity();
  });

  adFormPrice.addEventListener(`input`, () => {
    const price = adFormPrice.value;
    const minPrice = minPricesMap[adFormType.value];

    if (price < minPrice) {
      adFormPrice.setCustomValidity(`Минимальная цена за ночь ${minPrice} руб. Вам стоит увеличить цену.`);
    } else if (price > MAX_PRICE) {
      adFormPrice.setCustomValidity(`Максимальная цена за ночь ${MAX_PRICE} руб. Вам стоит уменьшить цену.`);
    } else {
      adFormPrice.setCustomValidity(``);
    }

    adFormPrice.reportValidity();
  });

  adFormType.addEventListener(`change`, () => {
    syncPrice();
  });

  adFormTime.addEventListener(`change`, (evt) => {
    adFormTimeout.value = evt.target.value;
    adFormTimein.value = evt.target.value;
  });

  adFormRoomNumber.addEventListener(`change`, () => {
    changeCapacityOptions();
  });

  window.form = {
    isPageActivated,
    enableForm,
    disableForm,
  };

})();
