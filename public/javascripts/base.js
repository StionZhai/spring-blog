$(function(){
  $('.tab-menu li').hover(function(){
    $('.tab-menu li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq($('.tab-menu li').index(this)).addClass('show');
  });
});