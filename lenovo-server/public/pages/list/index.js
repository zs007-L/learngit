var cid = parseInt(location.search.slice(1).split('=')[1]);

if (isNaN(cid)) {
	window.location.href = "/pages/category/index.html"
}
var name = ''; 
var orderCol = 'price'; 
var orderDir = true; 
var pageSize = 6; 
var isLoading = false; 
var hasMore = true; 
var scroll = null; 
var isTriggerLoading = false; 


function getData() {
	isLoading = true;
	$('p.info').text('加载中...');
	var jsonStr = JSON.stringify({ cid, name, orderCol, orderDir, begin: $('ul.list>li').length, pageSize })
	return http({url: '/product/list', data: { jsonStr} }).then(data => {
		hasMore = data.length === pageSize;
		isLoading = false;
		if (hasMore) $('p.info').text('上拉加载更多...');
		else if ($('ul.list>li').length === 0) $('p.info').text('暂无相关商品，敬请期待..');
		else $('p.info').text('已到达底部..');
		return data;
	});
}

function showData(data) {
	data.forEach(item => {
		$(
			`
			<li class='list-item'>
				<a href='../detail/index.html?id=${ item.id }'>
					<img src='${ item.avatar }' class='avatar' />
					<div class='list-item-detail'>
						<div class='list-item-detail-title'>
							<h4 class='ellipsis'>${ item.name }</h4>
							<p class='ellipsis'>${ item.remark }</p>
						</div>
						<div class='list-item-detail-info'>
							<span class='price'>￥${ item.price }</span><br>
							<span class='rate'>${ item.rate }条评论</span>
						</div>
					</div>
				</a>
			</li>
		`
		).appendTo('ul.list');
	});
	initOrRefreshScroll()
};

function initOrRefreshScroll() {
	imagesLoaded($('.content')[0], function() {
		setTimeout(function() {
			if (scroll) scroll.refresh();
			else {
				scroll = new IScroll($('.content')[0], {
					click: true, //让iscroll区域可以触发事件
					deceleration: 0.003,
					bounce: false, //关闭边界回弹效果
					probeType: 2 //开启滚动监听
				});
				scroll.on('scroll', function() {
					if (hasMore && !isLoading) {
						if (this.y === this.maxScrollY) {
							isTriggerLoading = true;
							$('p.info').text('放手立即加载..');
						} else {
							isTriggerLoading = false;
							$('p.info').text('上拉加载更多..');
						}
					}
				});
				scroll.on('scrollEnd', function() {
					if (isTriggerLoading) {
						isTriggerloading = false;
						getData().then(showData);
					}
				});
			}
		}, 20);
	});
}

$('.login-box .title-box>li').click(function() {
	console.log(111);
	if (isLoading) {
		var $notice = $('<p class="notice">你的操作太频繁了...</p>').appendTo('body');
		setTimeout(() => $notice.remove(), 2000);
		return;
	}
	$("ul.list").empty();
	hasMore = true;
	if (this.dataset.col === orderCol) orderDir = !orderDir;
	else orderCol = this.dataset.col;
	getData().then(showData);
});
getData().then(showData);