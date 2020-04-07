var timer = null;
var index = 1;
var duration = 800; 		//图片切换动画过渡持续时间
var interval = 5000; 		//图片自动切换间隔时间
function bannerToggle(i) {
	var oldIndex = index,
		marginLeft = "",
		resetMarginLeft = "";
	index = i || (index + 1 === $("ul.scroll>li").length - 1 ? 1 : index + 1);
	if (oldIndex === $("ul.scroll>li").length - 2 && index === 1) {
		marginLeft = "-1000%";
		resetMarginLeft = "-100%";
	} else if (oldIndex === 1 && index === $("ul.scroll>li").length - 2) {
		marginLeft = "0%";
		resetMarginLeft = "-900%";
	} else {
		marginLeft = `-${ index }00%`;
		resetMarginLeft = `-${ index }00%`;
	}
	// 控制图片切换
	$("ul.scroll").animate({
		marginLeft: marginLeft
	}, duration, function() {
		$("ul.scroll").css({
			marginLeft: resetMarginLeft
		});
	});
	// 控制indicator切换
	$("ul.indicator>li")
		.eq(index - 1).addClass("active").find("i").animate({
			width: "100%"
		}, duration).end()
		.siblings().removeClass("active").find("i").animate({
			width: "0%"
		}, duration);
}
timer = setInterval(bannerToggle, interval);
//抢购倒计时
function TimeDown(id, endDateStr) {
    //结束时间
    var endDate = new Date(endDateStr);
    //当前时间
    var nowDate = new Date();
    //相差的总秒数
    var totalSeconds = parseInt((endDate - nowDate) / 1000);
    //取模（余数）
    var modulo = totalSeconds % (60 * 60 * 24);
    //小时数
    var hours = Math.floor(modulo / (60 * 60));
    modulo = modulo % (60 * 60);
    //分钟
    var minutes = Math.floor(modulo / 60);
    //秒
    var seconds = modulo % 60;
	console.log(hours);
    //输出到页面
    document.getElementById('hour').innerHTML = hours>9 ? hours : '0' + hours;
	document.getElementById("minute").innerHTML = minutes>9 ? minutes : '0' + minutes;
	document.getElementById("second").innerHTML = seconds>9 ? seconds : '0' + seconds;
    //延迟一秒执行自己
    setTimeout(function () {
        TimeDown(id, endDateStr);
    }, 1000)
}
TimeDown('show', '2019-12-31 00:00:00');