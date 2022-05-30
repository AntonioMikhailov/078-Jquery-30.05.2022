
  // Слайдер простой -061
function slider({slide, prevArrow, nextArrow,  totalCounter, currentCounter}) { 
const offerSlide = document.querySelectorAll(slide);
  const sliderPrevBtn = document.querySelector(prevArrow);
  const sliderNextBtn = document.querySelector(nextArrow);
  const currentNum = document.querySelector(currentCounter);
  const totalNum = document.querySelector(totalCounter);
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

export default  slider;