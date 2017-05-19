var express = require('express');
var router = express.Router();
var user = require("../controller/user.js");

router.get('/login',function(req,res,next){
	console.log("this is the login router");
});
// router.get('/index',index.showindex);
// router.get('/movie',index.showmovie);
// /* GET users listing. */
// // router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');
// // });
// router.get('/test',function(req,res){
// 	console.log(req.query);
// });
module.exports = router;
