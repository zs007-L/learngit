var express = require('express');
var query = require('../util/dbHelper.js');
var httpResult = require('../config').httpResult;
var router = express.Router();

router.post('/list', function(req, res, next) {
	var name = req.token.name;
	var sql = 'select T1.id,T1.pid,T1.count,T1.addTime,T2.name,T2.avatar,T2.price,T2.remark from (select * from `dt_cart` where `name` = ?) T1 inner join `dt_product` T2 on T1.pid = T2.id;';
	res.flag = query(sql, [ name ]).then(results => httpResult.success(results));
	next();
});

router.post('/increase/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'update `dt_cart` set `count` = `count` + 1 where `id` = ?;';
	res.flag = query(sql, [ id ])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null, '操作失败');
		});
	next();
});

router.post('/decrease/:id', function(req, res, next) {
	var id = parseInt(req.params.id);
	var sql = 'update `dt_cart` set `count` = `count` - 1 where `id` = ?;';
	res.flag = query(sql, [ id ])
		.then(results => {
			if(results.affectedRows === 1) return httpResult.success();
			else return httpResult.failure(null, '操作失败');
		});
	next();
});
router.get('/remove/:id', function(req, res, next){
	var id = req.params.id;
	var sql = 'delete from `dt_cart` where `id` = ?;';
	res.flag = query(sql, [ id ]).then(results => httpResult.success(results));
	next();
});
router.post('/add', function(req, res, next) {
	var name = req.token.name;
	var { pid, count } =JSON.parse(req.body.jsonStr)
	var addTime = new Date();
	res.flag = query('call p_addProductToCart(?,?,?,?);', [ name, pid, count, addTime ])
		.then(results => {
			if(results[0][0].result === '') return httpResult.success();
			else return httpResult.failure(null, results[0][0].result);
		});
	next();
});

router.get('/total', function(req, res, next){
	var name = req.token.name;
	var sql = 'select sum(`count`) as total from `dt_cart` where `name` =?;';
	res.flag =query(sql, [ name ]).then(results => httpResult.success(results[0].total || 0));
	next();
});

router.post('/infor/', function(req, res, next) {
	var id = JSON.parse(req.body.jsonStr);
	var sql = 'select * from (select * from `dt_cart` where `id` in (?)) T1 inner join `dt_product` on T1.pid = `dt_product`.id;';
	res.flag = query(sql, [ id ]).then(results => httpResult.success(results));
	next();
});


module.exports = router;