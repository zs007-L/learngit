function http(custom) {
	var configure =  {
		method: 'post',
		dataType: 'json',
		headers: {
			'Authorization': Cookies.get('token')
		}
	}
	Object.assign(configure, custom);
	return new Promise (resolve => {
		Notice.loading.show();
		setTimeout(() => {
			$.ajax({
				...configure,
				success: result => {
					if(result.message !== '') alert(result.message);
					switch(result.status){
						case 200:
							resolve(result.data);
							break;
						case 401:
							Cookies.remove('token');
							Cookies.set('target', window.location.href);
							window.location.replace('/pages/login/index.html');
						case 199:
						case 500:
						case 404:
							break;
					}
				},
				error: (xhr, textStatus) => alert(textStatus),
				complete: () => Notice.loading.hide()
			});
		},1000);
	});
}