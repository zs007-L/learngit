var scroll =null;
var interval = 5000;
var duration = 1000;
var timer = null;
var id = parseInt(location.search.slice(1).split('=')[1]) || 1;
var count = 1;

function initBanner(bannerImgs) {
	var length = bannerImgs.length;
	$('.total-page').text(length);
	$('.scroll').css({
		width: `${ length + 2 }00%`
	})
	$(`<li><img src='${ bannerImgs[bannerImgs.length - 1]}' /></li>`).appendTo('.scroll');
	bannerImgs.forEach(item => $(`<li><img src='${ item }'></li>`).appendTo('.scroll'));
	$(`<li><img src='${ bannerImgs[0]}' /></li>`).appendTo('.scroll');
	setTimeout(() => {
		imagesLoaded($('.banner')[0], () => {
			setTimeout(() => {
				scroll = new IScroll($('.banner')[0], {
					scrollY: false,
					scrollX:true,
					snap: true,
					momentum: false
				});
				scroll.on('scrollStart', function() {
					clearTimeout(timer);
				})
				scroll.on('scrollEnd', function() {
					scroll.disable();
					if(scroll.currentPage.pageX === length + 1) {
						scroll.goToPage(1, 0, 0);
						$('.current-page').text(1);
					} else if(scroll.currentPage.pageX === 0) {
						scroll.goToPage(length, 0, 0);
						$('.current-page').text(length);
					} else $('.current-page').text(scroll.currentPage.pageX);
					scroll.enable();
					timer = setTimeout(() => scroll.next(duration), interval);
				});
				scroll.goToPage(1, 0, 0);
				timer = setTimeout(() => scroll.next(duration), interval);
			}, 20);
		});
	}, 20);
}
	
// 
$('.menu').click(function() {
	$('.div-top,.right').toggle('normal');
});
$('.edit-menu').click(function() {
	$('.div-top,.right').toggle('normal');
});


// 数量加减
$('.reduce').click(function() {
	if(count === 1) return;
	count--;
	$('.num').text(count);
	if(count === 1) Notice.message('已达到购买数量下限');
})
$('.plus').click(function() {
	if(count === 5) return;
	count++;
	$('.num').text(count);
	if(count === 5) Notice.message('已达到购买数量上限');
})


function open() {
	$('.model').click(function() {
		$(".eject-wrapper").toggle();
	});
	$('.eject-wrapper').click(function(e) {
		if(e.target === e.currentTarget) $(this).toggle();
	})
	$('.back,.edit-back').click(function() {
		window.history.go(-1);
	})
}
function choice() {
	$('.config>.system').click(function() {
		$(this).addClass('selection').siblings().removeClass('selection');
	})
}

function bition() {
	$('.btn-mine').click(function() {
		var content = $('.selection').text();
		$('.c-title').text(content);
		$('.eject-wrapper').css({
			display: 'none'
		})
	})
}
function header() {
	$(window).scroll(function() {
		if ($(this).scrollTop() >= 300) {
			$(".header").css("background", "rgba(255,255,255,1)");
			$('.edit-back,.edit-menu').show();
			$('.back,.menu').hide();
			$('.title').show();
		} else if ($(this).scrollTop() <= 300) {
			$(".header").css("background", "rgba(255,255,255,0.5)");
			$('.edit-back,.edit-menu').hide();
			$('.back,.menu').show();
			$('.title').hide();
		}
	});
}
// 加入购物车
$('.join').click(function() {
	http({ url: '/cart/add', data: { jsonStr: JSON.stringify({ pid: id, count })}})
		.then(() => {
			Notice.message('成功加入购物车');
			$('.cart-tatal').text(parseInt($('.cart-tatal').text()) + count).show();
		});
});
if(Cookies.get('token')) {
	http({ url: '/cart/total', method: 'get'})
		.then(total => {
			$('.cart-tatal').text(total);
			if(total > 0) $('.cart-tatal').show();
		})
}
http( {url: `/product/model/${ id }`, method: 'get' })
	.then(model => {
		$('.price').text(`￥${ model.price }`);
		$('.name').text(model.name);
		$('.remark').text(model.remark);
		$('.avatar').attr('src', model.avatar);
		if(model.banner) initBanner(model.banner.split(','));
		open();
		choice();
		bition();
		header();
	});

