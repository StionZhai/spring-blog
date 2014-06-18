// 关闭弹出层
$(document).on('click', '.close', closeAll);
function closeAll(){
	$(".pop-mask").hide();
	$(".pop-box").hide();
}

// 显示弹出层
function showPopBox(id, width, height){
	// 初始化
	var str = '<span class="icon-close close"></span>';
	var popBox = null;
	if(!id){
		for(var i = 0; i < $('.pop-box').length; i++){
			if($('.pop-box').eq(i).attr('class') == 'pop-box'){
				popBox = $('.pop-box').eq(i);
			}
		}
	}else{
		popBox = $(id);
	}
	var ttl = popBox.children('.pop-title').text();
	popBox.children('.pop-title').empty();
	popBox.children('.pop-title').append(ttl + str);
	var boxWidth = width ? width : popBox.outerWidth();
	var boxHeight = height ? height : popBox.outerHeight();
	var iHeight = document.documentElement.clientHeight;
	var iWidth = document.documentElement.clientWidth;
	if(boxHeight > 600){
		popBox.children('.pop-content').addClass('to-fit');
		popBox.css({'left': (iWidth - boxWidth)/2, 'top': (iHeight - 600)/2});
	}else{
		popBox.children('.pop-content').removeClass('to-fit');
		popBox.css({'left': (iWidth - boxWidth)/2, 'top': (iHeight - boxHeight)/2});
	}

	// 设置弹出层的尺寸
	if(width){
		popBox.width(width);
	}
	if(height){
		popBox.height(height);
	}

	$('.pop-mask').show();
	popBox.show();
	$('.pop-mask').click(function(){
		closeAll();
	});
}
