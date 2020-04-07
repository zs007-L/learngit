	var isRemove = true;

$('.open-box').click(function() {
	$('#open').stop().slideToggle(500)
});
$('.return').click(function() {
	window.history.go(-1);
})


function showData(data) {
	data.forEach(item => {
		$(`
			<li data-id = '${ item.id }'>
				<i class='check-box normal checked'></i>
				<i class='check-box edit'></i>
				<a href='javascript:void(0)'>
					<img src='${ item.avatar }' />
					<div class='prduct-info'>
						<h3 class='ellipsis'>${ item.name }</h3>
						<p>有库存</p>
						<div class='price-wrapper'>￥<em class='price'>${ item.price }</em></div>
					</div>
				</a>
				<div class='count-wrapper clearfix'>
					<span class='decrease ${ item.count !== 1 ? '' : 'disabled'}'>-</span><span class='count'>${ item.count }</span><span class='increase ${ item.count !== 5 ? '' : 'disabled'}'>+</span>
					<div>
						<span class='choice'>选择服务</span>
						<img src='dele.png' class="delt"/>
					</div>
				</div>
			</li>
		`).appendTo('ul.list');
	});
	updateFooter();
}

function addSum() {
	$('.content i.check-box').click(function() {
		$(this).toggleClass('checked');
		var groupName = $(this).hasClass('normal') ? 'normal' : 'edit';
		$(`.content i.check-box.${ groupName }:not('.checked')`).length === 0 ?
			$(`i.check-box.all.${ groupName }`).addClass('checked') :
			$(`i.check-box.all.${ groupName }`).removeClass('checked');
		updateFooter()
	});
	$('.decrease').click(function() {
		var $count = $(this).next();
		var count = parseInt($count.text());
		if (count === 1) {
			Notice.message('已达到购买数量下限..');
			return;
		}
		var id = $(this).closest('li').get(0).dataset.id;
		http({
			url: `/cart/decrease/${ id }`
		}).then(() => {
			count--;
			if (count === 1) $(this).addClass('disabled');
			$count.text(count).next().removeClass('disabled');
			updateFooter();
		});
	});
	$('.increase').click(function() {
		var $count = $(this).prev();
		var count = parseInt($count.text());
		if (count === 5) {
			Notice.message('已达到购买数量上限..');
			return;
		}
		var id = $(this).closest('li').get(0).dataset.id;
		http({
			url: `/cart/increase/${ id }`
		}).then(() => {
			count++;
			if (count === 5) $(this).addClass('disabled');
			$count.text(count).prev().removeClass('disabled');
			updateFooter();
		});
	});
}
//更新总金额
function totalSub() {
	var account = 0;
	$('.content i.check-box.normal.checked').each(function(i, item){
		var price = $(this).parent().find('em.price').text();
		var count = $(this).parent().find('span.count').text();
		console.log(price);
		account += parseInt(price) * parseInt(count);
	});
	$('.set-box .actual,.set-box .total').text(`￥${ account }`);
}
//更新选中的数据
function updateTotal() {
	var total = 0;
	$(`.content i.check-box.normal.checked`).each(function(i, item) {
		var count = $(this).parent().find('span.count').text();
		total += parseInt(count);
	});
	if (total > 0) {
		$(`span.total-normal`).text(`(${ total })`)
			.parent('.btn-set').attr('disabled', false)
	} else {
		$(`span.total-normal`).text('')
			.parent('.btn-set').attr('disabled', true)
	}
}

function updateFooter() {
	updateTotal();
	totalSub();
}

//全选
$('i.check-box.all').click(function() {
	$(this).toggleClass('checked');
	var groupName = $(this).hasClass('normal') ? 'normal' : 'edit';
	$(this).hasClass('checked') ?
		$(`.content i.check-box.${ groupName }`).addClass('checked') :
		$(`.content i.check-box.${ groupName }`).removeClass('checked');
	totalSub();
	updateFooter();
});

 // 删除
$('ul.list').click(function(e){
	if($(e.target).hasClass('delt')){
		var id = parseInt($(e.target).closest('li').get(0).dataset.id);
		Notice.confirm('确定删除吗？').then(() => {
			http({ url: `/cart/remove/${ id }`, method: 'get' }).then(() => {
				Notice.message('商品删除成功');
				$(`li[data-id=${ id }]`).remove();
				if($('ul.list>li').length === 0) {
					$('.footer, ul.list').hide();
					$('.empty').show();
				}
				updateFooter();
			});
		});
	}
});





// 结算按钮点击事件
$('.btn-set').click(function() {
	if('ul.list>li:has(i.check-box.normal.checked)') {
		var ids = [];
		$('ul.list>li:has(i.check-box.normal.checked)').each(function(i, item) {
			ids.push(parseInt(item.dataset.id))
		});
		sessionStorage.setItem('settlementIds', JSON.stringify(ids));
		window.location.href = '/pages/orderconfirm/index.html';
	}
});


if(Cookies.get('token')){
	http({ url: '/cart/list'})
	.then(data => {
		if(data.length > 0){
			$('ul.list').show();
			showData(data);
			addSum();
		} else {
			$('.footer').hide();
			$('.empty').show();
		}
	});
} else {
	$('.no-login').show();
	$('.footer').hide();
}