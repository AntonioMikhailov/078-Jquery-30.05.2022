require('es6-promise').polyfill(); // синтаксис Common JS можно смешать с модулями
import 'nodelist-foreach-polyfill';

import 'slick-carousel'; 


import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import forms from './modules/forms';
window.addEventListener('DOMContentLoaded', ()=> {


tabs();
modal('[data-modal]', '.modal');
timer();
cards();
slider( {
  slide: '.offer__slide',
  nextArrow: '.offer__slider-next',
  prevArrow: '.offer__slider-prev',
  totalCounter: '#total',
  currentCounter: '#current',
});
forms();

}); //конец loaded