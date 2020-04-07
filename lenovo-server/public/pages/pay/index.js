var orderId = parseInt(location.search.slice(1).split("=")[1]) || 1;
var money = location.search.slice(1).split("=")[2]
var number = location.search.slice(1).split("&")[0]
var a=number.split("=")[1]
console.log(money,a);
$(".content .money,.footer em").text(money);
$(".content span.bianhao").text(a);
$(".footer span").on("click",function() {
	Notice.message("支付成功");
	setTimeout(function() {
		window.location.replace("/pages/cart/index.html");
	}, 1000);
});

// 切换
$('.zhifubao>.checkbox').click(function() {
	$(this).toggleClass('checked');
	$('.china-unionpay>.checkbox, .weixin>.checkbox').removeClass('checked');
	$('.footer>span').text('支付宝支付');
	$(".content .money,.footer em").text(money);
});
$('.weixin>.checkbox').click(function() {
	$(this).toggleClass('checked');
	$('.zhifubao>.checkbox, .china-unionpay>.checkbox').removeClass('checked');
	$('.footer>span').text('微信支付');
	$(".content .money,.footer em").text(money);
});
$('.china-unionpay>.checkbox').click(function() {
	$(this).toggleClass('checked');
	$('.zhifubao>.checkbox, .weixin>.checkbox').removeClass('checked');
	$('.footer>span').text('银联卡支付');
	$(".content .money,.footer em").text(money);
});