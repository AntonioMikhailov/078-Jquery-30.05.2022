/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() { 
 
// Классы для карточек урок 48
// Что нужно для карточки - путь к фото, алт.текст для фото, заголовок, описание, цена в долларах
// Создаем те свойства которые будут меняться с сервера. Размеры будут те же. Класс будет создавать только верстку
class MenuCard {
  constructor(src, alt, title, descr, price, parentSelector, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
    this.transfer = 27; // пример курса рубля
    this.changeToRouble(); // вызываем метод прямо в констр.
  }
  changeToRouble() { // метод перевода из дол. в рубли
this.price = this.price * this.transfer;
  }
  render() { // создает верстку в виде элементов
    const element = document.createElement('div');
    // если доп. классы не передадутся мы сами их добавим
    if(this.classes.length ==0) {element.classList.add('menu__item');} 
    // добавляем класс селектор через оператор rest ( classes) - их может быть несколько  - поэтому через цикл
    this.classes.forEach(itemClass => { 
      element.classList.add(itemClass); 
     });
    // внутрь пустого div вставляем образец верстки из HTML
    element.innerHTML = `
    <img src=${this.src} alt=${this.alt}>
    <h3 class="menu__item-subtitle">${this.title}</h3>
    <div class="menu__item-descr">${this.descr}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    </div>
    `;
    this.parent.append(element); // вставляем элемент внутрь родителя в конец
  }
}
// импортируем данные карточек с сервера из файла db.json
const getResource = async (url)=> {
  const res = await fetch(url);
  if(!res.ok) { // если что то не так ( св-во ok или status)
    throw new Error(`Could not fetch ${url}, status:${res.status}`); // Объект ошибки куда вставятся данные
  }
  return await res.json(); 
};
// Первый вариант через Класс
// getResource(' http://localhost:3000/menu')
// .then(data => {
//   // мы получаем массив карточек ( объектов) и перебираем их
//   data.forEach(({img, altimg, title, descr, price}) => { 
//     //через деструктуризацию
//     new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//    });
// });
// вариант через библиотеку Axios
axios.get(' http://localhost:3000/menu')
.then(data => {
    data.data.forEach(({img, altimg, title, descr, price}) => { 
      //через деструктуризацию
      new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });
     });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() { 
 
// Отправка Форм обратной связи через AJAX на локальный файл server.php
// Находим все формы по тегу form 3шт
const forms = document.querySelectorAll('form');
//кнопку в переменную не нужно т.к. form отправляет автоматом если кнликнуть по тегу button
// создаем объект с списками фраз уведомлениями для юзера
const message =  {
  loading: 'img/spinner.svg', //до отправки запроса
  success: 'Спасибо! Скоро мы с Вами свяжемся',
  failed: 'Что то пошло не так...'
};
//привязываем поля ввода к formData
forms.forEach(item => { 
  bindpostData(item);  //вызываем функцию
 });
// создаем отдельную ф. по общению с сервером
// Важно сто код здесь асинхронный и мы не знаем сколько времени на ответ от сервера уйдет и код не ждет выполнения fetch() а идет дальше поэтому используем async/await ( всегда в паре)
const postData = async (url, data)=> {
  const res = await fetch(url, { // await - значит будет ждать результат запроса и только потом продолжит выполнение
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
   body : data
  });
  return await res.json(); // возвращает Promise дальше в then - также нужен await
};
function bindpostData(form) {
  form.addEventListener('submit', (e)=> {
    e.preventDefault();  //отменяем перезагрузку
    // создаем новый блок для spinner
  let statusMessage = document.createElement('img');
  statusMessage.src = message.loading;
  statusMessage.style.cssText = ` 
  display: block;
  margin: 0 auto;
  `; 
  // но проще добавить класс в CSS
 // form.append(statusMessage); // добавили текст к форме
form.insertAdjacentElement('afterend', statusMessage );
    // Создаем метод отправки вариант XML Request - устаревший
    // const request = new XMLHttpRequest();
    // request.open('POST', 'server.php'); // метод и путь
const formData = new FormData(form); //получаем данные из input
// можно так получить формат JSON из FormData
// const object = {};
// formData.forEach(function(value, key) { 
//   object[key] = value;
//  });
// или так - сначала превращаем в массив массивов а потом обратно в объект JSON
const json = JSON.stringify(Object.fromEntries(formData.entries()));
// Применяем метод Fetch
postData('http://localhost:3000/requests', json) // server.php уже не нужен если Json сервер
.then(data => {
  console.log(data); // те данные который возвращаются из Promise {"name":"Антон","phone":"+7911 291 0063"}
     //уведомляем юзера об успешной отправке его message
     showThanksModal(message.success);
       // После отправки формы очищаем поля и убираем надпись уведомление
       setTimeout(() => {
        statusMessage.remove();
        }, 2000);
}).catch(()=> { // сюда можно добавить еще then(), но  мы пропишем блок catch() если будет ошибка от ответа сервера
  showThanksModal(message.failed);
}).finally(()=> { // добавляем еще действие очистки формы - независимо от того как ответил сервер
  form.reset();
}); 
  });
} // конец ф. PostData
// Создаем окно благодарности после отправки формы вместо простых надписей. Будем использовать блок modal__dialog и внего вставлять новый контент
function showThanksModal(message) { 
  const prevModalDialog = document.querySelector('.modal__dialog');
  // прячем предыдущий контент с полями отправки
  prevModalDialog.classList.add('hide');
  openModal();
 // создаем новый контент в окне
 let thanksModal = document.createElement('div');
 thanksModal.classList.add('modal__dialog');
thanksModal.innerHTML = `
<div class= 'modal__content'>
<div class='modal__close' data-close>&times;</div>
<div class='modal-title'>${message}</div> 
</div>  
`;
// вставляем в верстку
document.querySelector('.modal').append(thanksModal);
setTimeout(() => {
  prevModalDialog.classList.remove('hide');
  thanksModal.remove();
  closeModal();
}, 4000);
}
}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() { 
 // ++++ Модальные окна ++++++++++++++++++++++++++++++
const modal = document.querySelector('.modal');
const btnOpenModal = document.querySelectorAll('[data-modal]');
// const btnCloseModal = document.querySelector('[data-close]');
// Суть - автопоказ по скролу и по таймеру всего один раз при загрузке страницы. Если до этого автопоказа юзер сам вызвал модалку то автопоказ убирается навсегда. И потом юзер может только вручную вызывать модалку
//ф. открытиф модалки
function openModal() { 
  let offset =  window.outerWidth - window.innerWidth; // 16 px
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = offset + 'px';
  // убираем автопоказ если юзер сам кликнул и очищаем показ с задержкой и по скролу
  window.removeEventListener('scroll', showModalByScroll);
  // clearTimeout(showModalDelay);
}
// ф. закрытия модалки
function closeModal() { 
  modal.style.display = 'none';
     document.body.style.overflow = '';
     document.body.style.paddingRight = 0 + 'px';
     }
btnOpenModal.forEach(item => { 
  item.addEventListener('click', openModal);
  // или так
  // item.addEventListener('click', ()=> {
  //   openModal();
  // }); 
    // также если юзер сам кликнет по модалке то убираем ее показ с задержкой или промоткой до низа
    window.removeEventListener('scroll', showModalByScroll);
 });
 // закрываем с помощью делегирования + event target
//  modal.addEventListener('click', (e)=> { 
//    if(e.target == btnCloseModal|| e.target == modal ) {
//     modal.style.display = 'none';
//     document.body.style.overflow = '';
//     document.body.style.paddingRight = 0 + 'px';
//    }
//  });
 // закрываем по Esc
//  window.addEventListener('keydown', (e)=> { 
//    if (e.code === 'Escape') {
//     modal.style.display = 'none';
//     document.body.style.overflow = '';
//     document.body.style.paddingRight = 0 + 'px';
//    }
//  });
// Объединяем два события в одном слушателе
 ['click', 'keydown'].forEach(function(item) {
   //именно document или window иначе по клавише не сработает
  document.addEventListener(item, (e)=> { 
    // делаем ссработку клавиши Esc только когда открыто окно 
    if ( e.target == modal || (e.code == 'Escape' || e.target.getAttribute('data-close') == '' && modal.style.display !== 'none')) {
      closeModal();
    }
 });
 });
  // Появление модалки при скроле до низа ( минус 300px) или после 10 секунд с начала входа на сайт
  // Для этого создадим функциии открытия модалки и закрытия
  // let showModalDelay = setTimeout( openModal, 50000); // убрал чтобы не мешало
// ф. показа при скроле вниз
function showModalByScroll() { 
  let scrollHeight = document.body.scrollHeight; // вся высота body
    let scrollTop = document.documentElement.scrollTop; // прокрутка
    let clientHeight = document.documentElement.clientHeight; // высота окна body
    if(scrollHeight <= (scrollTop + clientHeight) + 100 ) {
      // console.log(222);
      clearTimeout(showModalDelay);
      // openModal(); // закрыл чтобы не мешало
}
}
  window.addEventListener('scroll', showModalByScroll);
}
module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() { 
  // Слайдер простой -061

  const offerSlide = document.querySelectorAll('.offer__slide');
  const sliderPrevBtn = document.querySelector('.offer__slider-prev');
  const sliderNextBtn = document.querySelector('.offer__slider-next');
  const currentNum = document.querySelector('#current');
  const totalNum = document.querySelector('#total');
  // Показываем первый слайд при загрузке
  let indexSlide = 1; // у Ивана =1
  // вариант 2 - Ивана
  
  showSlide(indexSlide); // показываем первый слайд
  function showSlide(n) {
    if(n > offerSlide.length){
      indexSlide = 1; 
     } 
     if(n < 1) {
       indexSlide = offerSlide.length;
     } 
     offerSlide.forEach(item => { 
      item.classList.remove('active');
      offerSlide[indexSlide-1].classList.add('active');
     }); 
  }
  //для того чтобы контролировать индекс, изменяем его значения при клике на кнопках - отсюда значение индекса пойдет дальше
  function currentIndex(n) {
    showSlide(indexSlide = indexSlide + n );
    //здесь индекс передастся в остновную ф.showSlide
   }
  
  sliderNextBtn.addEventListener('click', ()=> {
    // currentIndex(indexSlide +1); // убираем
    // showSlide(indexSlide  + 1 ); так не сработает
    showSlide(indexSlide = indexSlide + 1 ); // так  - да
    showCurrentNum(indexSlide);
    });
  sliderPrevBtn.addEventListener('click', ()=> { 
    // currentIndex(-1);
    showSlide(indexSlide = indexSlide - 1 );
  showCurrentNum(indexSlide);
  });
  
  // функция показа Общего кол-ва номеров слайда
  function showTotalNum() { 
    if(offerSlide.length < 10) {
       totalNum.innerHTML = `0${offerSlide.length}`;
      } else {
       totalNum.innerHTML= offerSlide.length;
      }
   }
   showTotalNum();
   // ф. показа текущего номера
   function showCurrentNum(n) { 
     if(n <= 9) {
      currentNum.innerHTML = `0${n}`;
      console.log(n);
     } else {
      currentNum.innerHTML = `${n}`;
     }
   }
   showCurrentNum(indexSlide);
  
  
  // function showSlide(n) {
  //   offerSlide.forEach(item => { 
  //     item.classList.remove('active');
  //     offerSlide[n].classList.add('active');
  //    }); 
  // }
  // showSlide(indexSlide);
  // // функция показа Общего кол-ва номеров слайда
  // function showTotalNum() { 
  //  if(offerSlide.length < 10) {
  //     totalNum.innerHTML = `0${offerSlide.length}`;
  //    } else {
  //     totalNum.innerHTML= offerSlide.length;
  //    }
  // }
  // showTotalNum();
  // // ф. показа текущего номера
  // function showCurrentNum(n) { 
  //   if(n <= 9) {
  //    currentNum.innerHTML = `0${n+1}`;
  //   } else {
  //    currentNum.innerHTML = `${n+1}`;
  //   }
  // }
  // showCurrentNum(indexSlide);
  // sliderNextBtn.addEventListener('click', ()=> {
  //   // сначала проверяем индекс - if можно перенести в ф. ShowSlide
  //   if(indexSlide >= offerSlide.length-1){
  //     indexSlide = 0; 
  //     showSlide(indexSlide);
  //   }  else {
  //     showSlide(indexSlide+1 );
  //     indexSlide++;
  //   }
  //   showCurrentNum(indexSlide);
  // });
  // console.log(offerSlide.length); //4
  // sliderPrevBtn.addEventListener('click', ()=> { 
  //   if(indexSlide <= 0){
  //     indexSlide = offerSlide.length-1; 
  //     showSlide(indexSlide);
  //   }  else {
  //     showSlide(indexSlide-1 );
  //     indexSlide--;
  //   }
  // showCurrentNum(indexSlide);
  // });
  // console.log(currentNum.innerHTML = '');
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() { 
  const tabs = document.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');
//функция скрытия табов  и класса выделения текста
function hideTabContent() {
  tabsContent.forEach(item => { 
    item.style.display = 'none'; 
   });
   tabs.forEach(item => { 
     item.classList.remove('tabheader__item_active'); 
    });
 }
hideTabContent();
// ф. показа табов
function showTabContent(i=0) { 
  tabsContent[i].style.display = 'block';
  tabs[i].classList.add('tabheader__item_active');
}
showTabContent(); // показали первый таб при загрузке страницы
// создаем обработчик для показа нужного Таба
tabsParent.addEventListener('click', (e)=> {
  //для e.target создаем переменную
  const target = e.target;
  if(target.classList.contains('tabheader__item')) {
    tabs.forEach((item, i) => { 
      if(target == item) {
        hideTabContent();
        showTabContent(i);
      }
     });
}
});
 
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

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

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', ()=> {
let tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
    modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
    timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
    cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
    slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
    forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");


tabs();
modal();
timer();
cards();
slider();
forms();

}); //конец loaded
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map