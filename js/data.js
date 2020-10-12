'use strict';

(() => {

  const qEndingsMap = {
    room: [`комната`, `комнаты`, `комнат`],
    guest: [`гостя`, `гостей`, `гостей`],
  };

  const typesMap = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  let offersWithId;

  const getQEndings = (q = 1, word) => {
    if (q % 100 < 11 || q % 100 > 14) {
      if (q % 10 === 1) {
        return `${q} ${qEndingsMap[word][0]}`;
      } else if (q % 10 > 1 && q % 10 < 5) {
        return `${q} ${qEndingsMap[word][1]}`;
      }
    }

    return `${q} ${qEndingsMap[word][2]}`;
  };

  const getHousingType = (type) => {
    return typesMap[type];
  };

  const addId = (item) => {
    let offers = item.slice();

    offers.forEach((offer, i) => {
      offer.id = `${i}`;
    });

    return offersWithId;
  };

  window.data = {
    offersWithId,
    getQEndings,
    getHousingType,
    addId,
  };

})();
