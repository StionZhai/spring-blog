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

  $('#atn-tab').on('mouseover', function () {
    // ajax获取所有关注标签
    $.get('/getAtnName', function (data) {
      var str = '';
      data[0].attentions.forEach(function (tag) {
        if (tag) {
          str += '<a href="' + tag.address + '" target="_blank">' + tag.atnName + '</a>';
        }
      });
      str = str + '<a href="#" class="tags-add" id="tags-add" onclick="addAtn()"><span class="icon-plus"></span></a>';
      $('#attention-tags').html(str);
    });
  });

  // 添加关注
  // $('.tags-add').on('click', function () {
  //   showPopBox(null, 330);
  //   return false;
  // });

  $('.button-flat-caution').click(function () {
    closeAll();
  });
});

function addAtn() {
  showPopBox(null, 330);
  return false;
}