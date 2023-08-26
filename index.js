var regLog = function(){
	var time = 60;
	var tindex = null;
	var errhtml = '';
    var loghtml = '<div class="main_main"><div class="main_contentbgsmall"><div class="main_contbar pr" style="width:370px"> <div id="main_loginboxsmall" data-contentid="login"> <h2>用户登录</h2> <div class="row"> <span>账&nbsp;&nbsp;号</span> <input type="text" id="logname" name="name" class="input" placeholder="手机号码／用户名" autocomplete="off" /> </div> <div class="row mt15"> <span>密&nbsp;&nbsp;码</span> <input id="logpass" name="pass" class="input" type="password" autocomplete="off" placeholder="密码" > </div>  <div class="row mt15 piccode" style="display:none;"> <span>验证码</span> <input id="pcode2" name="pcode" class="input" type="text" autocomplete="off" placeholder="输入验证码" maxlength="6"> </div><div class="autobox"> <label for="autoLogin"><input type="checkbox" value="ok" checked="checked" id="autoLogin"><span>下次自动登录</span></label> </div><div id="loginbtn" class="loginin">登录</div> <div class="oclasss"> <a href="'+Mcpath.web+'index.php/user/login/pass" class="fl" target="_blank">忘记密码</a> <a href="javascript:void(0);" data-contentid="register" class="login-mode fr">免费注册</a> </div><div class="othbox" style="background-color:#ffffff"> <p>使用以下帐号登录</p> <div class="othsbox"> <div class="othclass"><a href="'+Mcpath.web+'index.php/user/open/weibo" class="bar115"></a> <a href="'+Mcpath.web+'index.php/user/open/qq" class="barqq"></a> <a href="'+Mcpath.web+'index.php/user/open/weixin" class="barwechat"></a> </div> <div class="othtext"><a href="'+Mcpath.web+'index.php/user/open/weibo"><span style="margin-left:12px;">微博</a> <a href="'+Mcpath.web+'index.php/user/open/qq" style="margin-left:28px;width:68px;">腾讯QQ</a> <a href="'+Mcpath.web+'index.php/user/open/weixin"><span style="margin-left:59px;">微信</span></a> </div> </div> <div class="bindmb"></div> </div></div><div style="display:none;" id="main_loginboxsmall" data-contentid="register"> <h2>手机号注册</h2> <div class="row"> <span>手机号码</span> <input type="text" id="regtel" name="tel" class="input" placeholder="输入常用手机号码" maxlength="11" autocomplete="off" />'; 
        if(Mcpath.istel == 0) loghtml += '<img title="点击刷新验证码" style="position: absolute;right: 20px;top: 0;width: 99px;height: 38px;cursor: pointer;display: inline-block;border: 1px solid #ccc;border-radius: 4px;" class="code_pic hide" src="">';
        loghtml += '</div> <div class="row mt15 pic-code"><span>验证码</span> <input maxlength="4" id="regpcode" type="text" name="pcode" class="input" placeholder="输入图形验证码" autocomplete="off" />';
        if(Mcpath.istel == 0){
            loghtml += '<span class="pcode-send" data-status="false">短信验证</span>';
        }else{
            loghtml += '<img title="点击刷新验证码" style="position: absolute;right: 20px;top: 0;width: 99px;height: 38px;cursor: pointer;display: inline-block;border: 1px solid #ccc;border-radius: 4px;" class="code_pic hide" src="">';
        }
        loghtml += '</div><div class="row mt15 tel-code" style="display:none;"><span>手机验证码</span> <input type="text" id="regtcode" name="tcode" class="input" placeholder="输入手机验证码" maxlength="6" autocomplete="off" /><span class="tcode-send" data-status="false">再次获取</span></div> <div class="row mt15"> <span>密&nbsp;&nbsp;码</span> <input id="regpass" type="password" name="pass" placeholder="密码（6-16位字符）" class="input" autocomplete="off" maxlength="16"></div>  <div class="loginin" id="regbtn">注册</div><div class="oclasss"><a href="javascript:;" class="fr login-mode" data-contentid="login">已有帐号&nbsp;直接登录</a> </div><div class="othbox" style="background-color:#ffffff"> <p>使用以下帐号登录</p> <div class="othsbox"> <div class="othclass"><a href="/index.php/user/open/weibo" class="bar115"></a> <a href="/index.php/user/open/qq" class="barqq"></a> <a href="/index.php/user/open/weixin" class="barwechat"></a> </div> <div class="othtext"><a href="/index.php/user/open/weibo"><span style="margin-left:12px;">微博</span></a> <a href="/index.php/user/open/qq" style="margin-left:28px;width:68px;">腾讯QQ</a> <a href="/index.php/user/open/weixin"><span style="margin-left:59px;">微信</span></a> </div> </div> <div class="bindmb"></div> </div></div></div></div></div>';
    layer.open({
        type: 1,
        title: '登录注册',
        content: loghtml,
        shade: 0.2,
        offset: 'auto',
        area: ['430px', '580px'],
        success: function(layero, layerIdx) {
            mccms.index = layerIdx;
            if(mccms.get_cookie('pint') == 1){
                $('.title').hide();
                $('.piccode').show();
                $('.code_pic2').click();
            }
        }
    });
    //切换
    $('.login-mode').click(function(){
    	var type = $(this).attr('data-contentid');
    	if(type == 'login'){
    		$("#main_loginboxsmall[data-contentid='login']").show();
    		$("#main_loginboxsmall[data-contentid='register']").hide();
    	}else{
    		//显示图形验证码
    		$('.code_pic').attr('src',Mcpath.web+'index.php/api/code').show();
    		$("#main_loginboxsmall[data-contentid='login']").hide();
    		$("#main_loginboxsmall[data-contentid='register']").show();
    	}
    });
    //提交登陆
    $('#loginbtn').click(function(){
    	var name = $('#logname').val();
    	var pass = $('#logpass').val();
        var pcode = $('#pcode2').val();
    	var is = $('.autobox input').prop("checked") ? 1 : 0;
    	if(name == ''){
            mccms.msg('请输入账号~');
            $('#logname').focus();
    		return false;
    	}
        if(!(/^[\S]{6,16}$/.test(pass))){
            mccms.msg('密码必须6到16位，且不能出现空格~');
            $('#logpass').focus();
    		return false;
    	}
        if(mccms.get_cookie('pint') == 1 && pcode == ''){
            mccms.msg('请输入验证码~');
            $('#pcode2').focus();
            return false;
        }
		var index = mccms.layer.load();
		$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/user/login?callback=?', {name:name,pass:pass,islog:is,pcode:pcode}, function(res) {
			mccms.layer.close(index);
            if(res.code == 1){
                mccms.del_cookie('pint');
            	mccms.user = res.user;
            	mccms.msg(res.msg,1);
                window.location.reload();
            }else{
        		mccms.msg(res.msg);
                if(res.pcode == 1){
                    mccms.set_cookie('pint',1);
                    $('.title').hide();
                    $('.piccode').show();
                    $('.code_pic2').click();
                }
        	}
        });
    });
	//发送短信验证码
	$('.pcode-send').click(function(){
    	var tel = $('#regtel').val();
    	if(tel == ''){
            mccms.msg('请输入正确的手机号~');
            $('#regtel').focus();
    		return false;
    	}
	});
	//刷新验证码
	$('.code_pic,.code_pic2').click(function(){
		$(this).attr('src','//'+Mcpath.url+Mcpath.web+'index.php/api/code?t='+Math.random());
	});
	//发送验证码
	$('.pcode-send').click(function(){
		var tel = $('#regtel').val();
		var pcode = $('#regpcode').val();
		if(!(/^1[3456789]\d{9}$/.test(tel))){
            mccms.msg('请输入正确的手机号~');
            $('#regtel').focus();
    		return false;
		}
		if(pcode == ''){
            mccms.msg('请输入上面的图形验证码~');
            $('#regpcode').focus();
    		return false;
		}
		//发送
		$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/code/tel_send/reg?callback=?', {tel:tel,code:pcode}, function(res) {
            if(res.code == 1){
				$('.pic-code,.code_pic').hide();
				$('.tel-code').show();
				tindex = setInterval(function(){
					time--;
					if(time == 0){
						time = 60;
						window.clearInterval(tindex);
						$('.tcode-send').removeClass('disabled').attr('data-status','false').html('重新发送');
					}else{
						$('.tcode-send').addClass('disabled').attr('data-status','true').html(time+'S后重发');
					}
				},1000);
            }else{
            	mccms.msg(res.msg);
            }
        });
	});
	//再次发送验证码
	$('.tcode-send').click(function(){
		var init = $(this).attr('data-status');
		if(init == 'false'){
			$('#regpcode').val('');
			$('.pic-code').show();
			$('.tel-code').hide();
			$('.code_pic').attr('src','//'+Mcpath.url+Mcpath.web+'index.php/api/code').show();
		}
	});
	//注册提交
	$('#regbtn').click(function(){
		var tel = $('#regtel').val();
    	var code = $('#regtcode').val();
    	var pcode = $('#regpcode').val();
		var pass = $('#regpass').val();
    	if(!(/^1[3456789]\d{9}$/.test(tel))){
            mccms.msg('请输入正确手机号码~');
            $('#regtel').focus();
    		return false;
    	}
    	if(Mcpath.istel == 0 && code == ''){
    		if($(".code_pic").css("display") == 'none'){
                mccms.msg('请输入手机验证码~');
                $('#regtcode').focus();
    		}else{
                mccms.msg('请获取短信验证码~');
                $('#regpcode').focus();
    		}
    		return false;
    	}
    	if(Mcpath.istel == 1 && pcode == ''){
            mccms.msg('请输入右边的图形验证码~');
            $('#regpcode').focus();
            return false;
        }
        if(!(/^[\S]{6,16}$/.test(pass))){
            mccms.msg('密码必须6到16位，且不能出现空格~');
            $('#regpass').focus();
    		return false;
    	}
		var index = mccms.layer.load();
		$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/user/reg?callback=?', {tel:tel,pass:pass,code:code,pcode:pcode}, function(res) {
			mccms.layer.close(index);
            if(res.code == 1){
            	mccms.user = res.user;
            	mccms.msg(res.msg,1);
                window.location.reload();
            }else{
        		mccms.msg(res.msg);
        		$('.code_pic').click();
        	}
        });
    });
    //监听回车提交登陆
	$(document).keyup(function(e){
		if(e.keyCode ==13 && $('.main_contentbgsmall').length > 0){
			if($("#main_loginboxsmall[data-contentid='register']").css('display') == 'none'){
				$('#loginbtn').click();
			}else{
				$('#regbtn').click();
			}
		}
	});
}
//热搜渲染
var rendHotSearch = function() {
	if(!$('.search-hot').hasClass('rended')) {
        mccms.tpl('.hot-search-tpl','.search-hot','api/comic/hot');
	}
};
//观看记录
var rendRead = function() {
	$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/rend/history?callback=?', function(res) {
        console.log(res);
        if(res.code == 1){
			if (res.data.length > 0) {
      			mccms.laytpl($('.header-his-tpl').html()).render(res.data, function(str) {
        			$('.in-dialog__user-list').html(str)
      			});
    		}
        }
    });
	$('#hContent').show();
};
//收藏记录
var rendFav = function() {
	//已登陆
	if(mccms.user.log == 1) {
		$('.j-header-coll .offline').hide();
  		$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/rend/fav?callback=?',{t:Math.random()}, function(res) {
            if(res.code == 1){
				if (res.data.length > 0) {
					$('.j-header-coll .coll').hide();
          			mccms.laytpl($('.header-coll-tpl').html()).render(res.data, function(str) {
            			$('.in-dialog--coll .in-dialog__user-list').html(str).addClass('rended');
          			});
        		}else{
        			$('.j-header-coll .coll').show();
        		}
            }
        });
    }
};
// 设置章节正序、倒序
var initReverseChapter = function() {
	$('.btn--sort a').click(function() {
		if ($(this).hasClass('asc')) {
			$('.btn--sort .desc').removeClass('desc_on');
            $('.btn--sort .asc').addClass('asc_on');
		} else {
            $('.btn--sort .desc').addClass('desc_on');
            $('.btn--sort .asc').removeClass('asc_on');
		}
		var list = $('.cy_plist ul');
		list.append(list.find('.chapter__item').get().reverse());
	})
    $('#zhankai').click(function(){
        if($('#play_0').css('height') == '230px'){
            $(this).html('↑ 收起章节 ↑');
            $('#play_0').css('height','auto');
        }else{
            $(this).html('↑ 展开查看全部章节 ↑');
            $('#play_0').css('height','230px');
        }
    });
}
//简介展开收起
var bindIntroTotal = function() {
	$('.comic-intro .show').hover(function() {
		$(this).find('.txt').html('收起');
		$(this).find('.iconfont').html('&#xe6a4;');
		$('.intro-total').stop().fadeIn();
	}, function() {
		$(this).find('.txt').html('展开');
		$(this).find('.iconfont').html('&#xe6a3;');
		$('.intro-total').stop().fadeOut();
	})
}
//判断漫画是否收藏
var isCollect = function(mid) {
    mccms.isfav({did:mid},function(res){
        if(res.code == 1){
            $('.j-user-collect').addClass('collected');
            $('.j-user-collect .no').hide();
            $('.j-user-collect .yes').show();
        }
    });
}
//漫画收藏
var addCollect = function(mid,hid,cid) {
    mccms.fav({did:mid},function(res){
        if(res.code == 1){
            mccms.msg(res.msg,1);
            if(res.cid == 0){
                $(hid+' .yes').hide();
                $(hid+' .no').show();
                $(hid).removeClass(cid);
            }else{
                $(hid+' .no').hide();
                $(hid+' .yes').show();
                $(hid).addClass(cid);
            }
        }else{
            mccms.msg(res.msg);
        }
    });
}
//收藏按钮
var bindCollectEvent = function() {
    $('body').on('click', '.j-user-collect', function() {
    	if(mccms.user.log == 0){
			regLog();
		}else{
	    	var mid = $(this).attr('data-id');
		    addCollect(mid,'.j-user-collect','collected');
		}
    });
}
//礼物记录
var giftList = function(_mid){
	$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/rend/gift?callback=?', {mid:_mid}, function(res) {
        if(res.code == 1){
        	var list = res.list,str = '';
        	for (var i = 0; i < list.length; i++) {
        		str+='<div class="scroll-item"><img class="avatar" src="'+list[i].upic+'" alt="Surplus"><span>'+list[i].unichen+'打赏了 <b>'+list[i].num+'</b> 个 <b class="hl">'+list[i].name+'</b> </span></div>'
        	}
        	$('.de-gift__scroll').html(str).liMarquee({
	        	drag: false,
	        	hoverstop: false
	        });
        }
    });
}
var showTicket = function(_mid,_mname,_mticket,_mrank) {
    var ticketTpl = '<div class=\"dialog--ticket\">\n  <div class=\"dialog__close\"><i class=\"iconfont icon-ic_buy_toast_close\"></i></div>\n  <div class=\"dialog__head\">投月票</div>\n  <div class=\"dialog__info\">\n    <p class=\"comic-title\">《'+_mname+'》</p>\n    <p class=\"ticket-info clearfix\">\n      <span>总月票：<b class=\"hl mon\">'+_mticket+'</b></span>\n      <span>总排名：<b class=\"hl\">'+_mrank+'</b></span>\n    </p>\n  </div>\n  <div class=\"ticket__handles\">\n    <i class=\"iconfont icon-ic_toast_byticket\"></i>\n    <div class=\"reduce\">-</div>\n    <input class=\"result\" type=\"text\" value=\"1\">\n    <div class=\"add\">+</div>\n    <span>月票</span>\n  </div>\n\n';
    if(mccms.user.ticket == 0) {
    	ticketTpl += '<div class=\"ticket__pay\">\n<span class=\"ticket__null\">月票不足，戳我购买</span></div>\n';
    }else{
    	ticketTpl += '<div data-id=\"'+_mid+'\" class=\"ticket__confirm\">\n      <span class=\"j-loading-icon loading-icon hide\">\n<i class=\"layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop\"></i>\n      </span>\n        <span>立即投票</span>\n    </div>\n';
    }
    ticketTpl += '<p class=\"my-ticket\">我的月票 <b class=\"hl\">'+mccms.user.ticket+'</b> </p>\n</div>\n';
    layer.open({
        type: 1,
        closeBtn: 0,
        title: false,
        content: ticketTpl,
        area: ['490px', '293px'],
        success: function(layero, layerIdx) {
            mccms.index = layerIdx;
        }
    });
    $('.ticket__pay').click(function(){
    	//window.open(Mcpath.web+"index.php/user/pay","_blank");
        Pay_Show('yp');
    });
    $('.dialog--ticket .reduce').click(function(){
    	var num = parseInt($('.result').val());
    	num--;
    	if(num < 1) num = 1;
    	$('.result').val(num);
    });
    $('.dialog--ticket .add').click(function(){
    	var num = parseInt($('.result').val());
    	num++;
    	$('.result').val(num);
    });
    $('.ticket__confirm').click(function(){
    	var ticket = $('.result').val();
    	var mid = $(this).attr('data-id');
    	mccms.ticket_send(mid,ticket,'.ticket-num');
    });
}
//打赏礼物弹窗
var showGift = function(_mid) {
    $('.ucion').html(mccms.user.cion);
    var giftTpl = $('.gift-box').html();
    layer.open({
        type: 1,
        closeBtn: 0,
        title: false,
        content: giftTpl,
        area: ['670px', '412px'],
        success: function(layero, layerIdx) {
            mccms.index = layerIdx;
        }
    });
    //礼物切换
    $('.gift__confirm').attr('data-id',$('.gift-item').eq(0).attr('data-id'));
    $('.gift__confirm').attr('data-cion',$('.gift-item').eq(0).attr('data-cion'));
    $('.gift-item').click(function() {
        $('.gift__confirm').attr('data-id',$(this).attr('data-id'));
        $('.gift__confirm').attr('data-cion',$(this).attr('data-cion'));
        $(this).addClass('active').siblings().removeClass('active');
    });
    //打赏礼物
    $('.gift__confirm').click(function() {
        if(mccms.user.log == 0){
            regLog();
        }else{
            var gid = $(this).attr('data-id');
            var mid = $(this).attr('data-mid');
            var cion = $(this).attr('data-cion');
            mccms.sendgift(mid,gid,'.ucion'); 
        }
    });
    //打赏按钮
    $('.gift__confirm').click(function(){
        var mid = $(this).attr('data-mid');

        mccms.ticket_send(mid,ticket,'.ticket-num');
    });
}
//章节更多显示
var chapterMore = function(){
	if($('.chapter__item').length > 16){
        $('#play_0').css('height','230px');
	}else{
        $('#zhankai').hide();
        $('#play_0').css('height','auto');
    }
	//点击更多
	$('.chapter__more').click(function(){
		if($(this).attr('data-id') == '2'){
			$('.chapter__list-box').css('height','302px');
			$('.chapter__list-box').css('overflow','hidden');
			$('.chapter__more .down').show();
			$('.chapter__more .up').hide();
			$(this).attr('data-id','1');
		}else{
			$('.chapter__list-box').css('height','auto');
			$('.chapter__list-box').css('overflow','visible');
			$('.chapter__more .down').hide();
			$('.chapter__more .up').show();
			$(this).attr('data-id','2');
		}
	});
}
//评分
var get_Score = function(_mid){
	var score = $('.rate-handle').attr('data-score')/10;
	mccms.score(_mid,score,'.rate-handle');
}
//评论
var get_comment = function(_mid){
	//显示列表
    mccms.comment({mid:_mid,page:1});
	//监听评论点击
    $('.comment-kuang').click(function(){
    	if(mccms.user.log == 0){
			regLog();
		}else{
	    	if($(this).hasClass('has-placeholder')) {
	    		$(this).removeClass('has-placeholder').html('');
	    	}
	    }
    });
    //点击表情
    $('body').on("click",".j-comment-emoji",function(){
    	if(mccms.user.log == 0){
			regLog();
		}else{
    		$(this).children('.j-comment-face-box').show();
    	}
    });
    $('.j-face-item').click(function(event){
    	$('.comment-kuang').click();
    	var em = $(this).attr('data-id');
    	var html = $('.comment-kuang').html();
    	$('.comment-kuang').html(html+em);
    	$('.j-comment-face-box').hide();
    	//event.stopPropagation();
    });
    $('body').on("click",".face-reply",function(event){
    	var id = $(this).parent().attr('data-cid');
    	var em = $(this).attr('data-id');
    	var html = $('.comment-text-'+id).html();
    	$('.comment-text-'+id).html(html+em);
    	event.stopPropagation();
    });
    //回复框
    $('body').on("click",".j-reply-btn",function(){
    	if(mccms.user.log == 0){
			regLog();
		}else{
	    	var id = $(this).attr('data-id');
	    	$('.reply-kuang-'+id).toggle();
	    }
    });
    //提交评论
    $('.j-comment-submit').click(function(){
    	if(mccms.user.log == 0){
			regLog();
		}else{
	    	var mid = $(this).attr('data-id');
	    	var text = $('.comment-kuang').html().replace(/<.*?>/g,"");
	    	if($('.comment-kuang').hasClass('has-placeholder')) {
	    		mccms.msg('请输入评论内容');
	    	}else{
                mccms.comment_send({mid:mid,text:text},function(res){
                    if(res.code == 1){
                        mccms.comment({mid:mid,page:1});
                        mccms.msg(res.msg,1);
                    }else{
                        mccms.msg(res.msg);
                    }
                });
	    	}
	    }
    });
    //提交回复
    $('body').on("click",".j-comment-reply-btn",function(){
    	if(mccms.user.log == 0){
			regLog();
		}else{
	    	var mid = $(this).attr('data-mid');
	    	var cid = $(this).attr('data-cid');
	    	var fid = $(this).attr('data-fid');
	    	var text = $('.comment-text-'+cid).html().replace(/<.*?>/g,"");
	    	if(text == '') {
	    		mccms.msg('请输入回复内容');
	    	}else{
                mccms.comment_send({mid:mid,text:text,cid:cid,fid:fid},function(res){
                    if(res.code == 1){
                        mccms.comment({mid:mid,page:1});
                        mccms.msg(res.msg,1);
                    }else{
                        mccms.msg(res.msg);
                    }
                });
	    	}
	    }
    });
    //监听赞评论
    $('body').on("click",".j-like-btn,.j-reply-like-btn",function(){
    	if(mccms.user.log == 0){
			regLog();
		}else{
	    	var id = $(this).attr('data-id');
	    	var fid = $(this).attr('data-fid');
	    	var _this = $(this);
			$.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/comment/zan?callback=?', {id:id,fid:fid}, function(res) {
				if(res.code == 2){
					regLog();
	            } else if(res.code == 1){
	            	if(res.zt == 0){
	            		$(_this).removeClass('active');
	            	}else{
	            		$(_this).addClass('active');
	            	}
	            	$(_this).children('span').html(res.zan);
	            }else{
	            	mccms.msg(res.msg);
	            }
	        });
		}
    });
}
//阅读页
var readPic = function(mid,cid,vip,cion){
    var pnow = 0,pid = mccms.get_cookie('pid');
    var slink = $('.rd-aside__item.j-rd-prev').attr('_href');
    var xlink = $('.rd-aside__item.j-rd-next').attr('_href');
    //判断VIP
    if(vip > 0 || cion > 0){
        if(mccms.user.log == 0){
            regLog();
        }else{
            if(cion > 0 || vip > 0){
               get_buy();
            } else {
                pic_show();
            }
        }
    }else{
        pic_show();
    }
    mccms.isfav({did:mid},function(res){
        if(res.code == 1) $('.j-rd-collect').addClass('hl');
    });
    mccms.tpl('.rd-catalog-tpl','.catalog__list','api/comic/chapter',{mid:mid});
    //默认阅读模式
    if(mccms.get_cookie('pmode') == '2'){
        $('.rd-article-wr').attr('data-type','2');
        $('.j-rd-mod').children('i').html('');
        $('.j-rd-mod').children('span').html('卷轴');
    }
    if(slink == '') $('.rd-aside__item.j-rd-prev').hide();
    if(xlink == '') $('.rd-aside__item.j-rd-next').hide();
    $('img.lazy-read').lazyload();
    $('.j-rd-mod').hover(function() {
        mccms.index = layer.tips('切换阅读模式',$(this));
    },function(){
        mccms.layer.close(mccms.index);
    });
    //上一话
    $('.j-rd-prev').click(function(){
        get_prev();
    });
    //下一话
    $('.j-rd-next').click(function(){
        get_next();
    });
    //开关灯
    $('.j-rd-light').click(function(){
        if(!$('body').hasClass('theme-white')) {
            $('body').addClass('theme-white');
        }else{
            $('body').removeClass('theme-white');
        }
    });
    //阅读模式
    $('.j-rd-mod').click(function() {
        var type = $('.rd-article-wr').attr('data-type');
        if(type == 1){
            mccms.set_cookie('pmode','2');
            $('.rd-article-wr').attr('data-type','2');
            $(this).children('i').html('');
            $(this).children('span').html('卷轴');
        }else{
            mccms.set_cookie('pmode','1');
            $('.rd-article-wr').attr('data-type','1');
            $(this).children('i').html('&#xe67e;');
            $(this).children('span').html('翻页');
        }
        mccms.set_cookie('pid',pid);
        window.location.reload();
    });
    //随机推荐显隐
    $('.rd-guess__handle').click(function(){
        if(!$('.rd-guess').hasClass('slide-up')) {
            $('.rd-guess').addClass('slide-up');
            $('.rd-guess__comic-wr').hide();
            $(this).children('i').html('');
            mccms.set_cookie('rand','2');
        }else{
            $('.rd-guess').removeClass('slide-up');
            $('.rd-guess__comic-wr').show();
            $(this).children('i').html('&#xe6a4;');
            mccms.set_cookie('rand','1');
        }
    });
    if(mccms.get_cookie('rand') == '2'){
        $('.rd-guess').addClass('slide-up');
        $('.rd-guess__comic-wr').hide();
        $(this).children('i').html('');
    }else{
        $('.rd-guess').removeClass('slide-up');
        $('.rd-guess__comic-wr').show();
        $(this).children('i').html('&#xe6a4;');
    }
    //离开前获取离开时间和已读图片数量
    window.onbeforeunload = function () {
        mccms.read({did:mid,cid:cid,pid:pid});
    }
    //页面滚动
    $(window).scroll(function () {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop < 50){
            $(".read__header").css('top','0px');
            $(".rd-guess").css('left','0px');
        }else{
            $(".read__header").css('top','-52px');
            $(".rd-guess").css('left','-140px');
        }
        //下拉模式重置图片页数
        if(mccms.get_cookie('pmode') != '2'){
            $('.rd-article__pic').each(function(index){
                var a = $(this).offset().top;
                if(a >= $(window).scrollTop() && a < ($(window).scrollTop() + $(window).height())) {
                    pnow = $(this).attr('data-index');
                    pid = $(this).attr('data-pid');
                    $('.j-pg-index').html(pnow);
                    mccms.set_cookie('pid',pid);
                }
            });
        }
    });readPic
    //鼠标移到置顶30显示头部
    $('body').mousemove(function(e) { 
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; 
        var Y = e.pageY-scrollTop;
        if(Y < 30){
            $(".read__header").css('top','0px');
            $(".rd-guess").css('left','0px');
        }
    });
    //章节显示隐藏
    $('.j-rd-catalog').click(function(){
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
        }else{
            $(this).removeClass('active');
        }
    });
    //收藏
    $('.j-rd-collect').click(function(){
        if(mccms.user.log == 0){
            regLog();
        }else{
            var mid = $(this).attr('data-mid');
            // 添加收藏
            addCollect(mid,'.j-rd-collect','hl');
        }
    });
    //打赏
    $('.btn--reward').click(function(){
        showGift(mid);
    });
    //显示图片方式
    function pic_show(){
        if(!pid || $('#pic_'+pid).length == 0) pid = $('.rd-article__pic').eq(0).attr('data-pid');
        pnow = $('#pic_'+pid).attr('data-index')-1;
        if(mccms.get_cookie('pmode') == '2'){
            page_pic_show();
        }else{
            Look_pic_show();
        }
    }
    //翻页模式
    function page_pic_show(){
        $('.rd-article__pic').each(function(){
            // $(this).children('img').attr('src',$(this).children('img').attr('data-original'));
            $(this).hide();
        });
        $('#pic_'+pid).show();
        $('.j-pg-index').html($('#pic_'+pid).attr('data-index'));
        //鼠标移到指定右边
        $('.rd-article__pic').mousemove(function(e) {  
            var x = e.pageX-$(this).offset().left;
            var px = $(this).width();
            if(x < 250){
                $(this).css('cursor','url("'+Mcpath.tpl+'images/ic_read_mousel.png"), auto');
            } else if((px - x) < 250){
                $(this).css('cursor','url("'+Mcpath.tpl+'images/ic_read_mouser.png"), auto');
            }else{
                $(this).css('cursor','');
            }
        });
        $('.rd-article__pic').click(function(e){
            var x = e.pageX-$(this).offset().left;
            var px = $(this).width();
            get_next_show(0);
            if(x < 250){ //上一张
                $('.rd-article__pic').eq(pnow).hide();
                pnow--;
                if(pnow < 0){
                    pnow++;
                    get_prev();
                }else{
                    $('.rd-article__pic').eq(pnow).show();
                    $('.j-pg-index').html((pnow-1));
                    pid = $('.rd-article__pic').eq(pnow).attr('data-pid');
                    mccms.set_cookie('pid',pid);
                }
            } else if((px - x) < 250){ //下一张
                $('.rd-article__pic').eq(pnow).hide();
                pnow++;
                var num = $('.rd-article__pic').length;
                if(pnow >= num){
                    pnow--;
                    get_next();
                }else{
                    pid = $('.rd-article__pic').eq(pnow).attr('data-pid');
                    $('.rd-article__pic').eq(pnow).show();
                    $('.j-pg-index').html((pnow+1));
                    mccms.set_cookie('pid',pid);
                    if((pnow+1) == num){
                        $('.rd-article__end').show();
                        if(xlink == ''){
                            $('.rd-article__end .last-chapter').show();
                            $('.rd-article__end .btn--next-chapter').hide();
                        }else{
                            $('.rd-article__end .last-chapter').hide();
                            $('.rd-article__end .btn--next-chapter').show();
                        }
                    }
                }
            }
        });
    }
    //下拉模式
    function Look_pic_show(){
        // $('.rd-article__pic').eq(0).children('img').attr('src',$('.rd-article__pic').eq(0).children('img').attr('data-original'));
        $('.rd-article__pic').each(function(){
            $(this).css('cursor','').show();
        });
        $('.rd-article__end').show();
        if(xlink == ''){
            $('.rd-article__end .last-chapter').show();
        }else{
            $('.rd-article__end .btn--next-chapter').show();
        }
        if($('#pic_'+pid).length > 0){
            setTimeout(function() {
                $("html,body").animate({
                    scrollTop: $('#pic_'+pid).offset().top+"px"
                },500);
            },1000);
        }
    }
    //上一话
    function get_prev(){
        mccms.del_cookie('pid');
        if(slink == ''){
            $('#pic_'+pid).show();
            mccms.msg('没有上一话了');
        }else{
            window.location.href = slink;
        }
    }
    //下一话
    function get_next(){
        mccms.del_cookie('pid');
        if(xlink == ''){
            $('.rd-article__pic').eq(pnow).show();
            get_next_show(1);
        }else{
            window.location.href = xlink;
        }
    }
    //没有下一话
    function get_next_show(t){
        if(t == 1){
            $('.rd-article__end').show();
            $('.rd-article__end .last-chapter').show();
            $('.rd-article__end .btn--next-chapter').hide();
            var h = $(document).height()-$(window).height();
            $(document).scrollTop(h);
        }else{
            $('.rd-article__end').hide();
        }
    }
    //收费章节
    function get_buy(){
        $.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/comic/isbuy?callback=?', {id:cid}, function(res) {
            if(res.code == 2){
                regLog();
            } else if(res.code == 1){
                var parr = res.pic;
                for (var i = 0; i < parr.length; i++) {
                    $('.rd-article-wr').append('<div id="pic_'+parr[i]['id']+'" class="rd-article__pic hide" data-pid="'+parr[i]['id']+'" data-index="'+(i+1)+'"><img class="lazy-read" data-original="'+parr[i]['img']+'" src="'+Mcpath.tpl+'images/lazyload_img.png" alt="'+i+'.jpg"></div>');
                }
                pic_show();
            } else if(res.code == 3){
                if(res.type == 'vip'){
                    $('.read-container').css('padding-top','0px');
                    mccms.layer.open({
                        type: 1,
                        closeBtn: 0,
                        title: false,
                        content: $('.vip-box').html(),
                        shade: 0.6,
                        success: function(layero, layerIdx) {
                            mccms.index = layerIdx;
                        }
                    }); 
                }else{
                    //判断是否自动购买
                    if(mccms.get_cookie('pay') == mid){
                        buy_pay();
                    }else{
                        $('.read-container').css('padding-top','0px');
                        mccms.layer.open({
                            type: 1,
                            closeBtn: 0,
                            title: false,
                            content: $('.buy-box').html(),
                            shade: 0.6,
                            area: ['680px', 'auto'],
                            success: function(layero, layerIdx) {
                                mccms.index = layerIdx;
                                if(mccms.user.cion >= cion){
                                    $('.handle__confirm').attr('data-pay','0').html('购买章节');
                                }
                            }
                        });
                        //购买章节
                        $('body').on("click",".buy-btn",function(){
                            buy_pay();
                        });
                    }
                }
            }else{
                mccms.msg(res.msg);
                $('.rd-article__down').show();
            }
        });
    }
    //购买章节
    function buy_pay(){
        var index = mccms.layer.load();
        var auto = ($('.auto-check').is(':checked') || mccms.get_cookie('pay') == mid) ? 1 : 0;
        $.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/comic/buy?callback=?', {id:cid,auto:auto}, function(res) {
            mccms.layer.close(index);
            if(res.code == 2){
                regLog();
            } else if(res.code == 3){
                Pay_Show('jb');
            } else if(res.code == 1){
                //判断自动购买下一章
                if(auto == 1) mccms.set_cookie('pay',mid);
                window.location.reload();
            }else{
                mccms.msg(res.msg);
            }
        });
    }
}
//充值
var Pay_Show = function(type){
    var payhtml = '<div id="dialog-pay"><div class="j-dialog-pay dialog-pay"lay-filter="dialog-pay"><div class="j-pay-header dialog-pay_header"><div class="j-user-name dialog-pay_header--username">{{d.unichen}}</div><div class="dialog-pay_header--foundinfo"><span class="j-user-gold">{{d.ucion}}</span>{{d.cion_name}}<em>|</em><span class="j-user-ticket">{{d.ticket}}</span>月票</div></div><div class="j-pay-close dialog-pay_header--close"><i class="iconfont icon-ic_buy_toast_close"></i></div><!--tab--><div class="dialog-pay_body layui-tab layui-tab-brief layui-tab-mkz"><!--tab-title--><ul class="j-tab-title dialog-pay_body--tab-title layui-tab-title"><li data-type="jb"class="layui-this">充值{{d.cion_name}}</li><li data-type="yp">购买月票</li><li data-type="vip">购买VIP</li></ul><div class="dialog-pay_body--tab-body"><!--全部列表--><div class="j-tab-content"><div class="j-paytype-item"><div class="j-paytype-jb item_row hide"><h3 class="item--title"><i class="item--title-icon"></i>购买项目<span class="item--pay-tip">（充值比例：1元={{d.rmb_cion}}{{d.cion_name}}，充值数量：必须是10的整数倍）</span></h3><ul class="item--content clearfix">{{#layui.each(d.pay.cion,function(index,item){}}<li class="j-item-btn item--btn cion-btn{{ index == 0 ? \' active\' : \'\' }}"data-cion="{{item.cion}}"data-rmb="{{item.rmb}}"><p>{{item.cion}}{{d.cion_name}}</p><p class="item--price">￥{{item.rmb}}</p><i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"{{index>0?\' style="display: none;"\':\'\'}}></i></li>{{#})}}<li class="j-item-btn item--btn item--btn-input cion-btn"data-cion="0"data-rmb="0"><input class="j-item-input item--input cion-input" type="text" value="" placeholder="其他金额" autocomplete="off" oninput="value=value.replace(\/[^\\d]\/g,\'\')"><i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"style="display: none;"></i></li></ul></div><!--月票--><div class="j-paytype-yp item_row hide"><h3 class="item--title"><i class="item--title-icon"></i>购买项目<span class="item--pay-tip">（购买比例：1元={{d.rmb_cion}}{{d.cion_name}}）</span></h3><ul class="item--content clearfix">{{#layui.each(d.pay.ticket,function(index,item){}}<li class="j-item-btn item--btn yp-btn{{ index == 0 ? \' active\' : \'\' }}"data-num="{{item.num}}"data-rmb="{{item.rmb}}"data-cion="{{item.cion}}"><p>{{item.num}}张月票</p><p class="item--price">￥{{item.rmb}}</p><i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"{{index>0?\' style="display: none;"\':\'\'}}></i></li>{{#})}}<li class="j-item-btn item--btn item--btn-input yp-btn"data-num="0"data-rmb="0"data-cion="0"><input class="j-item-input item--input yp-input" type="text" value="" placeholder="其他数量" autocomplete="off" oninput="value=value.replace(\/[^\\d]\/g,\'\')"><i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"style="display: none;"></i></li></ul></div><!--VIP--><div class="j-paytype-vip item_row hide"><h3 class="item--title"><i class="item--title-icon"></i>购买项目<span class="item--pay-tip">（购买比例：1元={{d.rmb_cion}}{{d.cion_name}}）</span></h3><ul class="item--content clearfix"id="vip_product_list">{{#layui.each(d.pay.vip,function(index,item){}}<li class="j-item-btn item--btn vip-btn{{ index == 0 ? \' active\' : \'\' }}"data-day="{{item.day}}"data-rmb="{{item.rmb}}"><p>{{item.name}}</p><p class="item--price">￥{{item.rmb}}</p><p class="item--recome">{{item.txt}}</p><i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"{{index>0?\' style="display: none;"\':\'\'}}></i></li>{{#})}}</ul></div></div><!--支付方式--><div class="item_row"><h3 class="item--title"><i class="item--title-icon"></i>支付方式</h3><ul class="item--content clearfix paytype-box"><li class="j-paytype-btn item--paytype-btn paytype-cionpay hide"data-pay-type="cion"><i class="iconfont item--pay-icon icon-ic_toast_yb"></i>{{d.cion_name}}支付<i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"style="display: none;"></i></li><li class="j-paytype-btn item--paytype-btn paytype-wxpay{{ d.pay.is_wxpay == 1 ? \' hide\' : \'\' }}"data-pay-type="wxpay"><i class="item--pay-icon iconfont icon-ic_buytoast_wx"></i>微信支付<i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"style="display: none;"></i></li><li class="j-paytype-btn item--paytype-btn paytype-alipay{{ d.pay.is_alipay == 1 ? \' hide\' : \'\' }}"data-pay-type="alipay"><i class="item--pay-icon iconfont icon-ic_buytoast_zfb"></i>支付宝支付<i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"style="display: none;"></i></li><li class="j-paytype-btn item--paytype-btn paytype-qqpay{{ d.pay.is_qqpay == 1 ? \' hide\' : \'\' }}"data-pay-type="qqpay"><i class="item--pay-icon iconfont icon-ic_buytoast_qq"></i>QQ钱包支付<i class="j-item-icon item--icon iconfont icon-ic_buylist_choose"style="display: none;"></i></li></ul></div><!--应付金额--><div class="item_row"><span class="item--inline-title">应付金额：</span><span class="item--found"><strong class="j-pay-num item--num">10</strong><em class="pay_ext">元</em></span><!--提醒信息--><span class="j-pay-warning item--warning hide"style="display: none;">{{d.cion_name}}不足，请修改支付方式或<strong class="j-go-gold item--link">充值{{d.cion_name}}</strong></span><!--qrcode--><iframe src=""id="j-alipay-qrcode"class="qrcode-alipay"width="120"height="120"frameborder="0"scrolling="no"></iframe></div><!--按钮--><div class="item_row"><!--disabled--><div class="j-pay-btn item_pay-btn layui-btn layui-btn-danger">确认支付</div></div></div></div></div></div></div>';
    var rmb_cion = 1,cion_name = '金币',pindex = null;
    var post = {type:'cion',rmb:0,day:0,num:0,pay:''};
    var index = mccms.layer.load();
    $.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/pay?callback=?', {t:Math.random()}, function(res) {
        mccms.layer.close(index);
        if(res.code == 1){
            rmb_cion = res.data.rmb_cion;
            cion_name = res.data.cion_name;
            mccms.laytpl(payhtml).render(res.data, function(html){
                mccms.layer.open({
                    type: 1,
                    closeBtn: 0,
                    title: false,
                    content: html,
                    shade: 0.6,
                    offset: 'auto',
                    area: ['700px', '480px'],
                    success: function(layero, layerIdx) {
                        mccms.index = layerIdx;
                        $('.j-paytype-item .item_row').hide();
                        $('.j-paytype-'+type).show();
                        $(".j-tab-title li").removeClass('layui-this');
                        $(".j-tab-title li[data-type='"+type+"']").addClass('layui-this');
                        if(type == 'jb'){
                            post.rmb = $('.cion-btn').eq(0).attr('data-rmb');
                        }else if(type=='yp'){
                            post.pay = 'cion';
                            post.rmb = $('.yp-btn').eq(0).attr('data-rmb');
                            post.num = $('.yp-btn').eq(0).attr('data-num');
                        }else{
                            post.pay = 'cion';
                            post.day = $('.vip-btn').eq(0).attr('data-day');
                            post.rmb = $('.vip-btn').eq(0).attr('data-rmb');
                        }
                        if(type == 'jb'){
                            $('.paytype-box li').each(function(){
                                $('.paytype-cionpay').hide();
                                if(!$(this).hasClass('hide') && $(this).attr('data-pay-type') != 'cion'){
                                    post.pay = $(this).attr('data-pay-type');
                                    $(this).addClass('active');
                                    $(this).children('.j-item-icon').show();
                                    return false;
                                }
                            });
                        }else{
                            $('.paytype-box li').each(function(){
                                $('.paytype-cionpay').show();
                                if(!$(this).hasClass('hide')){
                                    $(this).addClass('active');
                                    $(this).children('.j-item-icon').show();
                                    return false;
                                }
                            });
                        }
                        get_rmb();
                    }
                });
            });
        }else{
            mccms.msg(res.msg);
        }
    });
    //关闭窗口
    $('body').on("click",".j-pay-close",function(){
        window.clearInterval(pindex);
        mccms.layer.close(mccms.index);
    });
    //导航切换按钮
    $('body').on("click",".dialog-pay_body--tab-title li",function(){
        var type = $(this).attr('data-type');
        get_tabs(type);
    });
    //选择金币
    $('body').on("click",".cion-btn",function(){
        post.rmb = $(this).attr('data-rmb');
        post.cion = $(this).attr('data-cion');
        if(post.rmb == 0){
            $('.j-pay-btn').addClass('disabled');
        }else{
            $('.j-pay-btn').removeClass('disabled');
        }
        $('.cion-btn').removeClass('active');
        $('.cion-btn').children('.j-item-icon').hide();
        $(this).addClass('active');
        $(this).children('.j-item-icon').show();
        get_rmb();
    });
    //监控输入金币
    $('body').on("input propertychange",".cion-input",function(){
        post.rmb = $(".cion-input").val();
        if(post.rmb == ''){
            post.rmb = 0;
            $('.j-pay-btn').addClass('disabled');
        }else{
            $('.j-pay-btn').removeClass('disabled');
        }
        get_rmb();
    });
    //选择月票
    $('body').on("click",".yp-btn",function(){
        post.rmb = $(this).attr('data-rmb');
        post.num = $(this).attr('data-num');
        if(post.rmb == 0){
            $('.j-pay-btn').addClass('disabled');
        }else{
            $('.j-pay-btn').removeClass('disabled');
        }
        $('.yp-btn').removeClass('active');
        $('.yp-btn').children('.j-item-icon').hide();
        $(this).addClass('active');
        $(this).children('.j-item-icon').show();
        get_rmb();
    });
    //监控输入月票
    $('body').on("input propertychange",".yp-input",function(){
        post.num = $(".yp-input").val();
        if(post.num == ''){
            post.num = 0;
            $('.j-pay-btn').addClass('disabled');
        }else{
            $('.j-pay-btn').removeClass('disabled');
        }
        post.rmb = post.num;
        get_rmb();
    });
    //选择VIP
    $('body').on("click",".vip-btn",function(){
        post.rmb = $(this).attr('data-rmb');
        post.day = $(this).attr('data-day');
        if(post.rmb == 0){
            $('.j-pay-btn').addClass('disabled');
        }else{
            $('.j-pay-btn').removeClass('disabled');
        }
        $('.vip-btn').removeClass('active');
        $('.vip-btn').children('.j-item-icon').hide();
        $(this).addClass('active');
        $(this).children('.j-item-icon').show();
        get_rmb();
    });
    //支付方式
    $('body').on("click",".j-paytype-btn",function(){
        post.pay = $(this).attr('data-pay-type');
        $('.j-paytype-btn').removeClass('active');
        $('.j-paytype-btn').children('.j-item-icon').hide();
        $(this).addClass('active');
        $(this).children('.j-item-icon').show();
        get_rmb();
    });
    //充值金币
    $('body').on("click",".j-go-gold",function(){
        post.type = 'cion';
        post.pay = '';
        get_tabs('jb');
    });
    //提交请求
    $('body').on("click",".j-pay-btn",function(){
        if(!$(this).hasClass('disabled')){
            $(this).addClass('disabled');
            var index = mccms.layer.load();
            $.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/pay/save?callback=?', post, function(res) {
                mccms.layer.close(index);
                if(res.code == 1){
                    if(res.pay == 1){
                        $('#j-alipay-qrcode').attr('src',res.payurl);
                        pindex = setInterval(function(){
                            get_payinit(res.did);
                        },3000);
                    }else{
                        mccms.msg(res.msg,1);
                        setTimeout(function() {
                            window.location.reload();
                        }, 3000);
                    }
                }else{
                    $('.j-pay-btn').removeClass('disabled');
                    mccms.msg(res.msg);
                }
            });
        }
    });
    //判断订单是否完成
    function get_payinit(did){
        $.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/pay/init?callback=?', {id:did}, function(res) {
            if(res.code == 1){
                window.clearInterval(pindex);
                mccms.msg(res.msg,1);
                setTimeout(function() {
                    window.location.reload();
                }, 3000);
            }
        });
    }
    //计算金额
    function get_rmb(){
        window.clearInterval(pindex);
        $('.j-alipay-qrcode').attr('src','');
        if(post.pay == 'cion'){
            $('.j-pay-num').html(post.rmb*rmb_cion);
            $('.pay_ext').html(cion_name);
            if(mccms.user.cion < post.rmb*rmb_cion){
                $('.j-pay-warning').show();
                $('.j-pay-btn').addClass('disabled');
            }else{
                $('.j-pay-warning').hide();
                $('.j-pay-btn').removeClass('disabled');
            }
        }else{
            $('.j-pay-num').html(post.rmb);
            $('.pay_ext').html('元');
            $('.j-pay-warning').hide();
            $('.j-pay-btn').removeClass('disabled');
        }
    }
    //切换导航
    function get_tabs(type){
        $('.j-paytype-item .item_row').hide();
        $('.j-paytype-'+type).show();
        //支付方式
        $('.j-paytype-btn').removeClass('active');
        $('.j-paytype-btn .j-item-icon').hide();
        $(".j-tab-title li").removeClass('layui-this');
        $(".j-tab-title li[data-type='"+type+"']").addClass('layui-this');
        if(type == 'jb'){
            post.type = 'cion';
            post.rmb = $('.cion-btn').eq(0).attr('data-rmb');
            get_rmb();
            $('.paytype-box li').each(function(){
                $('.paytype-cionpay').hide();
                if(!$(this).hasClass('hide') && $(this).attr('data-pay-type') != 'cion'){
                    $(this).addClass('active');
                    $(this).children('.j-item-icon').show();
                    post.pay = $(this).attr('data-pay-type');
                    return false;
                }
            });
        }else{
            post.pay = 'cion';
            $('.paytype-cionpay').addClass('active').show();
            $('.paytype-cionpay .j-item-icon').show();
            if(type == 'yp'){
                post.type = 'ticket';
                post.rmb = $('.yp-btn').eq(0).attr('data-rmb');
                post.num = $('.yp-btn').eq(0).attr('data-num');
            }else{
                post.type = 'vip';
                post.rmb = $('.vip-btn').eq(0).attr('data-rmb');
                post.day = $('.vip-btn').eq(0).attr('data-day');
            }
            get_rmb();
        }
    }
}
var isBuyRead = function(mid){
    $.getJSON('//'+Mcpath.url+Mcpath.web+'index.php/api/comic/buyread?callback=?', {mid:mid}, function(res) {
        if(res.code == 1){
            var read = res.read,buy = res.buy;
            for (var i = 0; i < read.length; i++) {
                $('.chapter-'+read[i].cid).children('a').children('.j-update-icon').remove();
                $('.chapter-'+read[i].cid).addClass('look').append('<i class="read-at iconfont"></i>');
            }
            for (var i = 0; i < buy.length; i++) {
                $('.chapter-'+buy[i].cid).children('a').children('.lock').html('').css('color','#f60');
            }
        }
    });
}
function winSetHP() {
    var name = document.title;
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(name);
    } else {
        mccms.msg('浏览器不支持此操作, 请手动设为首页');
    }
}
function winAddFav() {
    var domain = window.location.href;
    var name = document.title;
    try {
        window.external.addFavorite(domain, name);
    } catch (e) {
        try {
            window.sidebar.addPanel(name, domain, '');
        } catch (e) {
            mccms.msg('加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置');
        }
    }
}
function search(){
    var key = $('.cy_search_txt').val();
    if(key == ''){
        mccms.msg('请输入要搜搜的关键词');
        return false;
    }
}
//默认数据
$(function(){
	//关闭open窗口
	$('body').on("click",".dialog__close",function(){
		mccms.layer.close(mccms.index);
	});
	//投月票
	$('.btn--ticket').click(function() {
		if(mccms.user.log == 0){
			regLog();
		}else{
			var mticket = $(this).attr('data-ticket');
			var mname = $(this).attr('data-name');
			var mrank = $(this).attr('data-rank');
			var mid = $(this).attr('data-id');
			showTicket(mid,mname,mticket,mrank);
		}
	});
    //设为主页
    $('.desktop,.collect').hover(function() {
        $('.collect').show();
    },function(){
        $('.collect').hide();
    });
    //阅读记录
	$('.record').hover(function() {
		rendRead();
	},function(){
		$('#hContent').hide()
	});
	//热搜
	rendHotSearch();
	//关闭评论框
	$('body').click(function(e) {
		var target = e.target;
	  	//评论框
	  	if($('.de-comment__textarea-wrap').find(target).length == 0 && $('.comment-kuang').html() == '') {
	    	$('.comment-kuang').html('看点槽点，不吐不快！别憋着，马上大声说出来吧～').addClass('has-placeholder');
	    }
	    //表情框
	    if($('.de-comment__item--btn-group').find(target).length == 0) {
	    	$('.j-comment-face-box').hide();
	    }
	});
	//返回顶部
	mccms.gotop('#mh-rtop');
	//礼物切换
	$('.send-gift').attr('data-id',$('.de-gift__item').eq(0).attr('data-id'));
	$('.send-gift').attr('data-cion',$('.de-gift__item').eq(0).attr('data-cion'));
	$('.de-gift__item').click(function() {
		$('.send-gift').attr('data-id',$(this).attr('data-id'));
		$('.send-gift').attr('data-cion',$(this).attr('data-cion'));
		$(this).addClass('active').siblings().removeClass('active');
	});
	//打赏礼物
	$('.send-gift').click(function() {
		if(mccms.user.log == 0){
			regLog();
		}else{
			var gid = $(this).attr('data-id');
			var mid = $(this).attr('data-mid');
			var cion = $(this).attr('data-cion');
			mccms.sendgift(mid,gid,'.j-user-gold');	
		}
	});
	//打赏按钮滚动到指定区域
	$('.btn--gold').click(function() {
    	var offset = $('.de-gift').offset().top;
    	$('html, body').animate({ 'scrollTop': offset }, 300);
    });
    //用户头像
    setTimeout(function() {
        if(mccms.user.nichen == '') mccms.user.nichen = '用户中心';
	    $('.j-user-avatar').attr('src',mccms.user.pic);
	    $('.j-user-gold').html(mccms.user.cion);
	    $('.nickname').html(mccms.user.nichen);
        //登录状态
        if(mccms.user.log > 0){
            mccms.laytpl($('.userinfo').html()).render(mccms.user, function(str) {
                $('#userinfo').html(str);
            });
        }
	}, 1000);
    //充值虚拟币
    $('body').on("click",".j-pay-gold",function(){
        if(mccms.user.log == 0){
            regLog();
        }else{
            Pay_Show('jb');
        }
    });
    //充值VIP
    $('body').on("click",".buy-vip",function(){
        if(mccms.user.log == 0){
            regLog();
        }else{
            Pay_Show('vip');
        }
    });
    //展开详细
    $('.cy_desc span').click(function() {
        if($('#comic-description').hasClass('comic-description3')) {
            $('#comic-description').removeClass('comic-description3');
            $('.cy_desc').attr('id','');
            $(this).css('top','75px').attr('id','').html('详细简介↓');
            $('#cy_desc_back').hide();
        }else{
            $('#comic-description').addClass('comic-description3');
            $('.cy_desc').attr('id','cy_desc');
            $(this).css('top','265px').attr('id','cy_desc_span').html('收起简介');
            $('#cy_desc_back').show();
        }
    });
    //滑动
    $('.scroll_prev').click(function(){
        $('.scroll_next').css('background','#fff').children('span').show();
        $(this).css('background','none').children('span').hide();
        $('.cy_kanguo_list ul').css('margin-left','0px');
    });
    $('.scroll_next').click(function(){
        $('.scroll_prev').css('background','#fff').children('span').show();
        $(this).css('background','none').children('span').hide();
        $('.cy_kanguo_list ul').css('margin-left','-1175px');
    });
	bindIntroTotal();
  	bindCollectEvent();
  	initReverseChapter();
});