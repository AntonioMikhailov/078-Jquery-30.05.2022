import { openModal } from "./modal";
import { closeModal } from "./modal";

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

export default  forms;