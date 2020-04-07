var Address = {
	// 当前选择的
	resolve: null,
	province: '',
	city: '',
	area: '',
	street: '',
	toString() {
		return `${this.province}-${this.city}-${this.area}-${this.street}`;
	},
	// 列表当前显示的
	provinces: regions,
	cities: [],
	areas: [],
	streets: [],
	showProvince() {
		this.provinces.forEach(item => {
			$(`<li>${ item.name }</li>`)
			.on('click', e => {
				this.province = $(e.target).text();
				this.cities = this.provinces.find(item => item.name === this.province).childs;
				this.showCity();
				$('.my-address-picker-title>span.region').text(this.toString());
			})
			.appendTo('.my-address-picker-content>ul.province')
		});
	},
	showCity() {
		$('.my-address-picker-content>ul.city').empty();	// 清空原有的
		this.cities.forEach(item => {
			$(`<li>${ item.name }</li>`)
			.on('click', e => {
				this.city = $(e.target).text();
				this.areas = this.cities.find(item => item.name === this.city).childs;
				this.showArea();
				$('.my-address-picker-title>span.region').text(this.toString());
			})
			.appendTo('.my-address-picker-content>ul.city');
		});
		$('.my-address-picker-content>ul.province').hide();
		$('.my-address-picker-content>ul.city').show();
	},
	showArea() {
		$('.my-address-picker-content>ul.area').empty();	// 清空原有的
		this.areas.forEach(item => {
			$(`<li>${ item.name }</li>`)
			.on('click', e => {
				this.area = $(e.target).text();
				this.streets = this.areas.find(item => item.name === this.area).childs;
				this.showStreet();
				$('.my-address-picker-title>span.region').text(this.toString());
			})
			.appendTo('.my-address-picker-content>ul.area');
		});
		$('.my-address-picker-content>ul.city').hide();
		$('.my-address-picker-content>ul.area').show();
	},
	showStreet() {
		$('.my-address-picker-content>ul.street').empty();	// 清空原有的
		this.streets.forEach(item => {
			$(`<li>${ item.name }</li>`)
			.on('click', e => {
				this.street = $(e.target).text();
				// 这个地方要做一件很重要的事情
				this.resolve(this.toString());
				$('.my-address-picker-wrapper').hide();
				this.reset();
			})
			.appendTo('.my-address-picker-content>ul.street');
		});
		$('.my-address-picker-content>ul.area').hide();
		$('.my-address-picker-content>ul.street').show();
	},
	init() {
		$(`
			<div class='my-address-picker-wrapper' style="display: none;">
				<div class='my-address-picker'>
					<div class='my-address-picker-title'>
						<span class='region'>请选择</span>
						<button class='btn-reset'>重置</button>
					</div>
					<div class='my-address-picker-content'>
						<ul class='province'></ul>
						<ul class='city' style="display: none;"></ul>
						<ul class='area' style="display: none;"></ul>
						<ul class='street' style="display: none;"></ul>
					</div>
				</div>
			</div>
		`).appendTo('body');
		$('.my-address-picker-title>button.btn-reset').on('click', this.reset);
		$('.my-address-picker-wrapper').on('click', e => {
			if(e.target === e.currentTarget) {
				$(e.target).hide();
				this.reset();
			}
		});
		this.showProvince();
	},
	reset() {
		this.province = '';
		this.city = '';
		this.area = '';
		this.street = ''
		$('.my-address-picker-title>span.region').text('请选择');
		this.cities = [];
		this.areas = [];
		this.streets = [];
		$('.my-address-picker-content').scrollTop(0)
		.find('ul.province').show().end()
		.find('ul.city').hide().end()
		.find('ul.area').hide().end()
		.find('ul.street').hide();
	},
	show() {
		$('.my-address-picker-wrapper').show();
		return new Promise(resolve => this.resolve = resolve);
	}
}