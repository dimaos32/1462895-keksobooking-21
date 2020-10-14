'use strict';

(() => {

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

  const toggleElementsState = (form, isOn) => {
    const fieldsets = form.querySelectorAll(`fieldset`);

    fieldsets.forEach((fieldset) => {
      fieldset.disabled = !isOn;
    });
  };

  const completeAddressInput = () => {
    const coords = window.pin.getMainMapPinCoords();

    adFormAddress.value = `${coords.x}, ${coords.y}`;
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
    window.form.isPageActivated = true;

    toggleElementsState(adForm, true);
    completeAddressInput();

    adForm.classList.remove(`ad-form--disabled`);
  };

  const disableForm = () => {
    window.form.isPageActivated = false;

    toggleElementsState(adForm, false);
    completeAddressInput();

    adForm.classList.add(`ad-form--disabled`);

    changeCapacityOptions();
    syncPrice();
  };

  const onSendSuccess = () => {
    const page = document.querySelector(`main`);
    const successMessage = document.querySelector(`#success`)
      .content
      .querySelector(`.success`)
      .cloneNode(true);

    const onClick = () => {
      successMessage.remove();
    };

    const onEscPress = (evt) => {
      if (evt.key === `Escape`) {
        successMessage.remove();
      }
    };

    page.append(successMessage);

    successMessage.addEventListener(`click`, onClick);
    document.addEventListener(`keydown`, onEscPress);

    adForm.reset();
    window.main.deactivatePage();
  };

  const onSendError = () => {
    const page = document.querySelector(`main`);
    const errorMessage = document.querySelector(`#error`)
    .content
    .querySelector(`.error`)
    .cloneNode(true);

    const onClick = () => {
      errorMessage.remove();
    };

    const onEscPress = (evt) => {
      if (evt.key === `Escape`) {
        errorMessage.remove();
      }
    };

    page.append(errorMessage);

    errorMessage.addEventListener(`click`, onClick);
    document.addEventListener(`keydown`, onEscPress);
  }

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

  adForm.addEventListener(`submit`, (evt) => {
    window.backend.send(new FormData(adForm), onSendSuccess, onSendError);
    evt.preventDefault();
  });

  window.form = {
    isPageActivated,
    completeAddressInput,
    enableForm,
    disableForm,
  };

})();
