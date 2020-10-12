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
    let offersWithId = item.slice();

    offersWithId.forEach((offer, i) => {
      offer.id = `${i}`;
    });

    return offersWithId;
  };

  let offersWithId;

  window.data = {
    offersWithId,
    getQEndings,
    getHousingType,
    addId,
  };

})();
