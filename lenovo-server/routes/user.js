var express = require('express');
var query = require('../util/dbHelper.js');
var Token = require('../util/token.js');
var httpResult = require('../config').httpResult;
var router = express.Router();

router.post('/login/pwd', function(req, res, next){
	var { name, pwd } = req.body;
	var sql = 'select * from `dt_user` where `name` = ? and `pwd` = ?;';
	res.flag = query(sql, [ name, pwd ])
		.then(results => {
			if(results.length > 0) return httpResult.success(Token.sign(name));
			else return httpResult.failure(null, '用户名或密码错误');
		});
	next();
});

router.post('/name', Token.verify, function(req, res, next) {
	var name = req.token.name;
	var sql = 'select * from `dt_user` where `name` = ?;';
	res.flag = query(sql, [ name ])
		.then((results) => httpResult.success(results[0]));
	next();
});

router.post('/register/infor', function(req, res, next) {
	var {name} = req.body;
	var sql = 'select * from `dt_user` where `name` = ?;';
	res.flag = query(sql, [name])
		.then(results => httpResult.success(results));
	next();
});

router.post('/register', function(req, res, next) {
	var { name, pwd } = req.body;
	var sql = 'insert into `dt_user`(`name`,`pwd`) values(?,?);';
	res.flag = query(sql, [ name, pwd ])
		.then(() => httpResult.success() );
	next();
})

module.exports = router;