if(Cookies.get('token')) {
	http({ url: '/user/name'})
		.then(data => {
			console.log(data);
			$('.user-name').text(data.name);
		})
}
else {
	window.location.href =' /pages/login/index.html';
}



