function timer() { 
 
// Таймер обратного отсчета времени Акции
// создаем дату конца акции
let deadLine = '2022-07-17T00:00:00+0300'; // так добавляет к текущему времени 3 часа
// Функ. которая будет определять разницу между deadline и текущим временем временем
function getTimerRemaining (endtime) { 
  let t = Date.parse(endtime) - Date.parse(new Date()); // получаем разницу в милисекундах между концом и текущим
  // console.log(t);
  // Теперь нам надо получить из милисекунд дни, часы, мин и сек.
  let days = Math.floor( t / (24*3600*1000)); //  у Кантора см. расчет мой
  // console.log(days); // 10
  let hours = Math.floor( t / ( 60 * 60 * 1000) % 24)  ;
  // console.log(hours);
  let minutes = Math.floor(t / (60 * 1000) % 60);
  // let minutes2 = Math.floor((t / 60 / 1000) % 60); // или так
// console.log(minutes);
 let seconds = Math.floor(t / (1000) % 60);
  // console.log(seconds);
  //выводим данные наружу в виде объекта 
  return {
'total': t,
'days': days,
'hours': hours,
'minutes': minutes,
'seconds': seconds,
  };
}
//функция добавления нулей перед числами до 10
function getZero(num) { 
  if(num > 0 && num <10) {
    return `0${num}`;
  } else {
    return num;
  } 
}
//Создаем ф. которая устанавливает таймер на страницу
function setClock(selector, endtime) { 
  //передаем класс timer в виде переменной
  const timer = document.querySelector(selector);
  //теперь уже находим идентификаторы внутри класса timer
  const days = timer.querySelector('#days');
  const hours = timer.querySelector('#hours');
  const minutes = timer.querySelector('#minutes');
  const seconds = timer.querySelector('#seconds');
  let timeInterval = setInterval(updateClock, 1000);
  //внутри ф. создаем ф. которая будет обновлять данные часов
  function updateClock() { 
    // получаем объект из  
   let t = getTimerRemaining(endtime);
   days.innerHTML = getZero(t.days);
   hours.innerHTML = getZero(t.hours);
   minutes.innerHTML = getZero(t.minutes);
   seconds.innerHTML = getZero(t.seconds);
   //следим когда время выйдет
   if (t.total <= 0) {
     clearInterval(timeInterval);
   }
  }
}
setClock('.timer', deadLine ); // deadline далее в параметрах как endtime везде
}

export default  timer;