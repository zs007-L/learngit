	var express = require('express');
var query = require('../util/dbHelper.js');
var httpResult = require('../config').httpResult;
var router = express.Router();

router.post('/list', function(req, res, next) {
	var name = req.token.name;
	var sql = 'select * from `dt_address` where `name` = ?;';
	res.flag = query(sql, [name]).then(results => httpResult.success(results));
	next();
});

router.post('/add', function(req, res, next) {
	var name = req.token.name;
	var { receiveName, receivePhone, receiveRegon, receiveDetail } = JSON.parse(req.body.jsonStr);
	var sql = 'insert `dt_address`(`name`, `receiveName`, `receivePhone`, `receiveRegon`, `receiveDetail`) values(?, ?, ?, ?, ?);';
	res.flag = query(sql, [ name, receiveName, receivePhone, receiveRegon, receiveDetail ])
		.then(results => httpResult.success(results.insertId));
	next();
});

router.post('/update', function(req, res, next) {
	var { id, receiveName, receivePhone, receiveRegon, receiveDetail } = JSON.parse(req.body.jsonStr);
	console.log(req.body.jsonStr);
	var sql = 'update `dt_address` set `receiveName` = ?, `receivePhone` = ?, `receiveRegon` = ?, `receiveDetail` = ? where `id` = ?;';
	res.flag = query(sql, [ receiveName, receivePhone, receiveRegon, receiveDetail, id])
		.then(results => httpResult.success());
	next();
});

router.get('/remove/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'delete from `dt_address` where `id` = ?;';
	res.flag = query(sql, [ id ]).then(() => httpResult.success());
	next();
});

router.get('/default/:id', function(req, res, next) {
	var name = req.token.name;
	var id = parseInt(req.params.id);
	var sql = 'call p_setDefaultAddress(?, ?);';
	res.flag = query(sql, [ id, name ])
		.then(() => httpResult.success());
	next();
});

router.get('/getdefault', function(req, res, next) {
	var name = req.token.name;
	var sql = 'select * from `dt_address` where `name` = ? and `isDefault` = 1;';
	res.flag = query(sql, [ name ]).then(results => httpResult.success(results[0]));
	next();
});

router.get('/getmodel/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'select *from `dt_address` where `id` = ?;';
	res.flag = query(sql, [ id ]).then(results => httpResult.success(results[0]));
	next();
});

module.exports = router;