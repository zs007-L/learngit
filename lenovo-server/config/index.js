exports.dbConfig = {
	host: 'localhost',
	database: 'lenovo',
	user: 'root',
	password: '123'
}

exports.httpResult = {
	success: (data = null, message = '') => ({status: 200, data, message}),
	failure: (data = null, message = '') => ({status: 199, data, message}),
	error: (data = null, message = '') => ({status: 500, data, message}),
	untoken: (data = null, message = '') => ({status: 401, data, message}),
	notFound: (data = null, message = '') => ({status: 404, data, message})

}