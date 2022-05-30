
//Вынесли на самый верх в файле modal.js
// ф. закрытия модалки
function closeModal(modalSelector) { 
  const modal = document.querySelector(modalSelector);
 modal.style.display = 'none';
     document.body.style.overflow = '';
     document.body.style.paddingRight = 0 + 'px';
     }

//ф. открытиф модалки
function openModal(modalSelector, showModalDelay) { 
  const modal = document.querySelector(modalSelector);
  let offset =  window.outerWidth - window.innerWidth; // 16 px
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = offset + 'px';
  // убираем автопоказ если юзер сам кликнул и очищаем показ с задержкой и по скролу
  if(showModalDelay) {
    clearTimeout(showModalDelay);
  }
  window.removeEventListener('scroll', showModalByScroll);
 
}


 // ++++ Модальные окна ++++++++++++++++++++++++++++++
function modal( triggetSelector, modalSelector) { 
  const btnOpenModal = document.querySelectorAll(triggetSelector);
const modal = document.querySelector(modalSelector);

// const btnCloseModal = document.querySelector('[data-close]');
// Суть - автопоказ по скролу и по таймеру всего один раз при загрузке страницы. Если до этого автопоказа юзер сам вызвал модалку то автопоказ убирается навсегда. И потом юзер может только вручную вызывать модалку

btnOpenModal.forEach(item => { 
  item.addEventListener('click', ()=> openModal(modalSelector));
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
      closeModal(modalSelector);
    }
 });
 });
  // Появление модалки при скроле до низа ( минус 300px) или после 10 секунд с начала входа на сайт
  // Для этого создадим функциии открытия модалки и закрытия
   let showModalDelay = setTimeout( openModal, 50000); // убрал чтобы не мешало
// ф. показа при скроле вниз
function showModalByScroll() { 
  let scrollHeight = document.body.scrollHeight; // вся высота body
    let scrollTop = document.documentElement.scrollTop; // прокрутка
    let clientHeight = document.documentElement.clientHeight; // высота окна body
    if(scrollHeight <= (scrollTop + clientHeight) + 100 ) {
      // console.log(222);
      clearTimeout(showModalDelay);
       openModal(modalSelector); // закрыл чтобы не мешало
}
}
  window.addEventListener('scroll', showModalByScroll);
}
export default modal;
export {openModal}; // дописываем
export {closeModal};
