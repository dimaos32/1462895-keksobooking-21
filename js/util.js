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

  const getRandomIntNumber = (min = 0, max = 100) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  const getRandomArrayElements = (arr, n = 1) => {
    let copySource = arr.slice();
    let randomArray = [];

    for (let i = 0; i < copySource.length && i < n; i++) {
      const element = getRandomIntNumber(i, copySource.length - 1);
      randomArray.push(copySource[element]);
      const swap = copySource[element];
      copySource[element] = copySource[i];
      copySource[i] = swap;
    }

    return randomArray;
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

  const addId = (array) => {
    let dataWithId = array.slice();

    dataWithId.forEach((item, i) => {
      item.id = `${i}`;
    });

    return dataWithId;
  };

  window.util = {
    offersWithId,
    getRandomIntNumber,
    getRandomArrayElements,
    getQEndings,
    getHousingType,
    addId,
  };

})();
