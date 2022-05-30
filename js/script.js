import $ from "jquery";

//const btn = document.querySelector('#btn'); // вариант получения на JS
let btn = $('#btn');
console.log(btn); // jQuery.fn.init [button#btn.list-item]
console.log($('#btn')); // или так

$(function(){ // вместо DOMContentLoaded
  $('.list-item:first').hover(function() {
    $(this).toggleClass('active');
});

//находим третью кнопку и четные фото скрываем
$('.list-item:eq(2)').on('click', function () { 
  $('.image:even').animate({
    opacity : 'toggle',
    height: 'toggle',
  }, 2000); // время анимации 
});


}); //конец loaded



