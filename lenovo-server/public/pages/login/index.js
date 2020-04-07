$('.open-box').click(function() {
	$('#open').stop().slideToggle(500)
});
$('.return').click(function() {
	window.history.go(-1);
});

$('.btn-register').click(function() {
	$('.register-title, .register, .login').show();
	$('.login-title, .btn-sign1, .btn-register1, .footer').hide();
});

$('.login').click(function() {
	$('.register-title, .register, .login').hide();
	$('.login-title, .btn-sign1, .btn-register1, .footer').show();
});

$('.btn-sign').click(function() {
	http({
		url: '/user/login/pwd',
		data: {
			name: $('input.name').val(),
			pwd: $('input.pwd').val()
		}
	}).then(token => {
		Cookies.set('token', token);
		window.location.replace(Cookies.get('target') || '/pages/home/index.html');
	});
});

$('.register').click(function() {
	http({ 
		url: '/user/register',
		data: {
			name: $('input.name').val(),
			pwd: $('input.pwd').val()
		}
	}).then(() => {
		Notice.message('注册成功');
		$('.register-title, .register, .login').hide();
		$('.login-title, .btn-sign1, .btn-register1, .footer').show();
	});
});