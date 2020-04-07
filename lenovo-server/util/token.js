var httpResult = require('../config').httpResult;
var jwt = require('jsonwebtoken');
var tokenKey = 'asdf';

module.exports = {
	sign: function(name) {
		return jwt.sign({ name }, tokenKey, { expiresIn: '1h' });
	},
	verify: function(req, res, next){
		var token = req.get('Authorization');
		jwt.verify(token, tokenKey, function(err, decoded){
			if(err) res.send(httpResult.untoken());
			else {
				req.token = decoded;
				next();
			}
		});
	}
}