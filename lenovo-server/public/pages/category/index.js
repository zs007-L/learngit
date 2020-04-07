var defaults = 0;

function getData(fid) {
	return http({
		url: `/category/list/${ fid }`,
		method: 'get'
	});
}

function showData(data) {
	data.forEach(item => {
		$(`<li data-id='${ item.id }'><span>${ item.name }</span></li>`)
			.on('click', function() {
				switchs(item.id, item.avatar);
			})
			.appendTo('ul.list-main');
	})
}

function switchs(id, avatar) {
	if (id === defaults) return;
	$(`li[data-id=${ id }]`).addClass('active').siblings().removeClass('active');
	$('img.avatar').attr('src', avatar);
	$('ul.list-sub-wrapper').empty();
	getData(id).then(data => {
		data.forEach(item => {
			var $listSub = $('<ul class="list-sub clearfix"></ul>');
			getData(item.id).then(data2 => {
				data2.forEach(item2 => {
					$(`
						<li>
							<a href='../list/index.html?cid=${ item2.id }'>
								<img src='${ item2.avatar }' />
								<span>${ item2.name }</span>
							</a>
						</li>
					`).appendTo($listSub);
				});
			});
			// 拼出二级附加三级再将二级附加到指定的ul
			$(`<li><h3>${ item.name }</h3></li>`)
			.append($listSub)
			.appendTo('ul.list-sub-wrapper');
		});
	});
	defaults = id;
}

getData(0).then(data => {
	showData(data);
	switchs(data[0].id, data[0].avatar);
});

$('.open-box').click(function() {
	$('#open').stop().slideToggle(500)
});
