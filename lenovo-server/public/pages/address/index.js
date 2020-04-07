var id = 0;
var isAdd = true;

$('.open-box').click(function() {
	$('#open').stop().slideToggle(500)
});

function addressLi(item) {
	$(`
		<li data-id='${ item.id }'>
			<div class='address-list-item'>
				<span class='receive-name'>${ item.receiveName }</span>
				<span class='receive-phone'>${ item.receivePhone }</span>
			</div>
			<div class='receive-address'>
				<span class='receive-regon'>${ item.receiveRegon }</span>
				<span class='receive-detail'>${ item.receiveDetail }</span>
			</div>
			<div class='operation clearfix'>
				<span class='lf default ${ item.isDefault ? "red" : ""}'>${ item.isDefault ? "默认地址" : "设为默认地址"}</span>
				<span class='rt delete'>删除</span>
				<img src='shanchu.png' class='rt delete-t'/>
				<span class='rt edit'>编辑</span>
				<img src='bianji.png' class='rt edit-t'/>
			</div>
		</li>
	`).appendTo('.content>ul');
}

function edit() {
	$('.header>ul').toggle();
	$('.btn-prese').show();
	$('.address').hide();
	$('.content>form').show();
	$('.content>ul').hide();
}

function prese() {
	$('.btn-prese').hide();
	$('.address').show();
	$('.content>form').hide();
	$('.content>ul').show();
}

function switchEdit() {
	$('.content>ul').hide();
	$('.content>form').show();
	$('.address').hide();
	$('.btn-prese').show();
	$('.header>.add').show();
	$('.header>.normal').hide();
}


$('.address').click(function() {
	edit();
})
function increase() {
	$('.btn-prese').click(function() {
		var model = {
			id: isAdd ? 0 : id,
			receiveName: $('.name').val(),
			receivePhone: $('.phone').val(),
			receiveRegon: $('.region').val(),
			receiveDetail: $('.detailed-address').val(),
		};
		if(isAdd){
			http({ url: '/address/add', data: { jsonStr: JSON.stringify(model) }})
				.then(newId => {
					model.id = newId;
					model.isDefault = false;
					addressLi(model);
					Notice.message('增加地址成功');
					edit();
					prese();
					beginEdit();
					btnDelete();
					editStatus();
				});
		} else {
			http({ url: '/address/update', data: { jsonStr: JSON.stringify(model) }})
				.then(() => {
					var $li = $(`.content>ul>li[data-id=${ model.id }]`);
					$li.find('.receive-name').text(model.receiveName);
					$li.find('.receive-phone').text(model.receivePhone);
					$li.find('.receive-regon').text(model.receiveRegon);
					$li.find('.receive-detail').text(model.receiveDetail);
					Notice.message('修改地址成功');
					editStatus();
					edit();
					prese();
				});
		}
			
	});
}


function beginEdit(item) {
	if(item){
		isAdd = false;
		$('.name').val(item.receiveName);
		$('.phone').val(item.receivePhone);
		$('.region').val(item.receiveRegon);
		$('.detailed-address').val(item.receiveDetail);
	} else {
		isAdd = true;
		$('form').get(0).reset();
	}
}
//编辑状态
function editStatus() {
	$('.edit, .edit-t').click(function() {
		var $li = $(this).closest('li');
		id = parseInt($li.get(0).dataset.id);
		beginEdit({
			receiveName: $li.find('.receive-name').text(),
			receivePhone: $li.find('.receive-phone').text(),
			receiveRegon: $li.find('.receive-regon').text(),
			receiveDetail: $li.find('.receive-detail').text()
		});
		switchEdit();
	});
}


//删除地址
function btnDelete() {
	$('.delete, .delete-t').click(function() {
		id = parseInt($(this).closest('li').get(0).dataset.id);
		Notice.confirm('确定删除吗？').then(() => {
			http({ url: `/address/remove/${ id }`, method: 'get' }).then(() => {
				Notice.message('地址删除成功');
				$(`li[data-id=${ id }]`).remove();
			});
		});
	});
}
//设置默认地址
function setDefault() {
	$('.content>ul').click(function(e) {
		if($(e.target).hasClass('default')){
			id = parseInt($(e.target).closest('li').get(0).dataset.id);
			if($(e.target).hasClass('red')) return;
			http({ url: `/address/default/${ id }`, method: 'get' })
				.then(() => {
					Notice.message('设为默认地址成功');
					$('.default').text('设为默认地址').removeClass('red');
					$(e.target).text('默认地址').addClass('red');
				})
		}
		if(window.location.search && window.location.search.slice(1) === 'reference=orderconfirm') {
			var id2 = e.target.tagName === 'LI' ? e.target.dataset.id : $(e.target).closest('li').get(0).dataset.id;
			window.location.replace(`/pages/orderconfirm/index.html?addessId=${ id2 }`);
		}
	});
}

http({ url: '/address/list'}).then(data => {
	if(data.length > 0) data.forEach(item => addressLi(item));
	editStatus();
	btnDelete();
	setDefault();
	increase();
});

function clickEvent(self) {
	Address.show().then(region => $(self).val(region));
}

Address.init();