var express = require('express');
var query = require('../util/dbHelper.js');
var httpResult = require('../config').httpResult;
var router = express.Router();

router.get('/list/:fid', function(req, res, next) {
	var fid = parseInt(req.params.fid);
	// 命令数据库执行指定的sql语句
	var sql = 'select * from `dt_category` where fid = ?;';
	res.flag = query(sql, [ fid ]).then(results => httpResult.success(results));
	next();//放行
});

module.exports = router;