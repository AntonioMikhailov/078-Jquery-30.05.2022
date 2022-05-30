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

export default cards;
