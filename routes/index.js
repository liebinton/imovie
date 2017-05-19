var express = require('express');
var router = express.Router();
var index = require("../controller/index.js");

router.get('/',index.showindex);
router.get('/movie',index.showmovie);
router.get('/login',index.login);
router.get('/signin',index.signin);
router.post('/login_check',index.login_check);
router.post('/signin_check',index.signin_check);
router.get('/list',index.get_list);
router.get('/user',index.user_info);
router.get('/show_change_page',index.show_change_page);
router.post('/userinfo',index.change_userinfo);
router.post('/comments',index.post_comment);

// router.get('/undefined',index.show_err);
module.exports = router;
