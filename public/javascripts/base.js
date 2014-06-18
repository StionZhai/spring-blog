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
      if (data[0].attentions) {
        data[0].attentions.forEach(function (tag) {
          if (tag) {
            str += '<a href="' + tag.address + '" target="_blank">' + tag.atnName + '</a>';
          }
        });
      }
      str = str + '<a href="#" class="tags-add" id="tags-add" onclick="addAtn()"><span class="icon-plus"></span></a>';
      str += '<a href="#" class="tags-add" id="tags-manage" onclick="manageAtn()"><span class="icon-cog2"></span></a>';
      $('#attention-tags').html(str);
    });
  });

  $('.button-flat-caution').click(function () {
    closeAll();
  });
  $('#sub-commit').click(function () {
    if($('#cmt-content').val() == '') {
      alert('亲,空气是不能参与评论的 ^ ^');
      return false;
    }
  });

  // 关注修改
  $('.tag-manager').on('click', 'li a.tags-remove', function () {
    var _this = $(this);
    var atnName = _this.siblings(':eq(0)').text();
    var msg = {"atnName": atnName};
    var isDelete = confirm('是否确定删除?');
    if (isDelete) {
      $.post('/remove-tag', msg, function (data, status) {
        if (data == 'success') {
          _this.parent().fadeOut();// 删除已经在数据库中不存在的dom
        }
      });
    }
  });
  $('.tag-manager').on('click', 'li a.tags-wrench', function () {
    $(this).siblings('div').slideToggle();
  });
  $('.tag-manager').on('click', 'li div a.tags-manage-cancle', function () {
    $(this).parent().slideUp();
  });
  $('.tag-manager').on('click', 'li div a.tags-manage-ensure', function () {
    $(this).parent().slideUp();
    var msg = {
      preTag: $(this).parent().siblings(':eq(0)').text(),
      tag: $(this).siblings(':eq(0)').val(),
      address: $(this).siblings(':eq(1)').val()
    };
    $.post('/update-atn', msg, function (data, status) {
      if (data == 'success') {
        alert('修改成功');
      }
    });
  });
});

// 添加标签
function addAtn() {
  showPopBox("#add-atn", 330);
  $('#add-atn').addClass('a-fadeinT');
  return false;
}

// 标签管理
function manageAtn() {
  $.get('/getAtnName', function (data) {
    var str = '';
    if (data[0].attentions) {
      data[0].attentions.forEach(function (tag) {
        if (tag) {
          str += '<li>' +
                    '<a href="' + tag.address + '" target="_blank">' + tag.atnName + '</a>' +
                    '<a href="#" class="tags-wrench fly-ri" title="修改"><span class="icon-wrench"></span></a>' +
                    '<a href="#" class="tags-remove fly-ri" title="删除"><span class="icon-remove"></span></a>' +
                    '<div style="line-height:24px;">' +
                      '<input type="text" value="' + tag.atnName + '" style="width:80px;margin-right:10px;">' +
                      '<input type="text" value="' + tag.address + '" style="margin-right:10px;">' +
                      '<a href="#" class="tags-manage-ensure" title="保存" style="margin-right:10px;"><span class="icon-checkmark"></span></a>' +
                      '<a href="#" class="tags-manage-cancle" title="取消"><span class="icon-close"></span></a>' +
                    '</div>' +
                  '</li>';
        }
      });
    }
    $('#manage-atn .pop-content ul').html(str);
    // 弹出弹出层,并给弹出层添加动画
    showPopBox('#manage-atn', 400);
    $('#manage-atn').addClass('a-fadeinT');
  });
}