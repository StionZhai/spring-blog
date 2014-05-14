$(function(){

  // sidebar切换
  $('.tab-menu li').hover(function(){
    $('.tab-menu li').removeClass('active');
    $(this).addClass('active');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq($('.tab-menu li').index(this)).addClass('show');
  });

  // ajax获取所有标签
  $.get('/tags', function (data) {
    var str = '';
    data.forEach(function (tag) {
      if (tag) {
        str += '<a href="/tags/' + tag + '">' + tag + '</a>';
      }
    });
    $('.cloud-tags').html(str);
  });

  // 添加关注
  $('.tags-add').click(function () {
    showPopBox(null, 330);
    return false;
  });
  $('.button-flat-caution').click(function () {
    closeAll();
  });
});