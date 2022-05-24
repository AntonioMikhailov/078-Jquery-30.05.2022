window.addEventListener('DOMContentLoaded', ()=> {
let tabs = require('./modules/tabs'),
    modal = require('./modules/modal'),
    timer = require('./modules/timer'),
    cards = require('./modules/cards'),
    slider = require('./modules/slider'),
    forms = require('./modules/forms');


tabs();
modal();
timer();
cards();
slider();
forms();

}); //конец loaded