var index_model = require('../models/index_model.js');

exports.showindex = function(req,res,next){
	index_model.checkindex(function(results){
		console.log("this is index session");
		var user = req.session.username;
		console.log(user);
		if(user){
			index_model.login_user(user,function(userinfo){
				console.log("this should be right");
				console.log(userinfo);
				res.render('index',{data:results,user:req.session.username,direct:'./user',head:userinfo[0].head});
			});
		}
		else{
			console.log("this should be wrong");
			res.render('index',{data:results,user:"登 陆",direct:'./login',head:'/images/user.png'});
		}
	});
};

exports.show_all_page = function(req,res,next){
	index_model.checkindex(function(results){
	var user = req.session.username;
	console.log(user);
		if(user){
			index_model.login_user(user,function(userinfo){
					console.log("this should be right");
					console.log('this is data:results');
					console.log(results);
					res.render('all_movie',{data:results,user:req.session.username,direct:'./user',head:userinfo[0].head});
			});
		}
		else{
				console.log("this should be wrong");
				console.log('this is data:results');
				console.log(results);
				// var user_id=comment_results[0].user_id;
				// index_model.check_comments_user(user_id,function(comments_user_result){
					res.render('all_movie',{data:results,user:"登 陆",direct:'./login',head:'/images/user.png'});
					// ,comments:comment_results
				// });
		}
	});
}
exports.showmovie = function(req,res,next){
	console.log(req.query.id);
	var id = req.query.id;	
	index_model.checkmovie(id,function(results){
		var user = req.session.username;
		console.log(user);
		if(user){
			index_model.login_user(user,function(userinfo){
				index_model.check_comments(id,function(comment_results){
					console.log("this should be right");
					console.log('this is data:results');
					console.log(results);
					res.render('movie',{data:results[0],user:req.session.username,direct:'./user',head:userinfo[0].head,comments:comment_results,login_status:'#target'});
				});
			});
		}
		else{
			index_model.check_comments(id,function(comment_results){
				console.log("this should be wrong");
				console.log('this is data:results');
				console.log(results);
				// var user_id=comment_results[0].user_id;
				// index_model.check_comments_user(user_id,function(comments_user_result){
					res.render('movie',{data:results[0],user:"登 陆",direct:'./login',head:'/images/user.png',comments:comment_results,login_status:"/login"});
					// ,comments:comment_results
				// });
			});
		}
	});

};
exports.post_comment = function(req,res,next){
	var user_id=req.session.user_id;
	var movie_id =req.body.movie_id;
	var new_comment =req.body.new_comment;
	var movie_score =req.body.movie_score;
	var now = new Date();
	var date = now.getFullYear()+"-"+now.getMonth()+"-"+now.getDay();
	console.log(now.getFullYear());
	console.log("up is get year");
	index_model.save_comment(movie_id,user_id,new_comment,date,movie_score,function(results){
		console.log("insert success");
	});
	console.log("this is req body");
	console.log(req.body);
};
exports.login = function(req,res,next){
	console.log("this is login page");
	res.render('login');
};
exports.signin = function(req,res,next){	
	console.log("this is sign in page");
	res.render('signin');
};
exports.login_check = function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	index_model.check_login_data(username,password,function(results){
		if(results.length!=0){
			if(username == results[0].username&&password==results[0].password){
				console.log("login success");
				console.log(results);
				req.session.username = username;
				req.session.user_id=results[0].id;
				console.log("this is session_username");
				console.log(req.session.username);
				console.log(req.session.user_id);
				res.render("login_success");
			}
			else{
				console.log("username or password is wrong err_code:2");
			}
		}
		else{
			console.log("username or password is wrong err_code:1");
			res.render("login",{data:"用户名或密码错误 请重新输入！"});
		}
	});
};
exports.signin_check = function(req,res,next){	
	console.log("this is sign in check");
	var username = req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;
	console.log(username);
	console.log(password);
	index_model.check_signin_exist(username,function(results){
		if(results.length!=0)
		{
			res.render("signin",{data:"该用户名已被注册 请重新输入！"});
		}
		else if(repassword!=password){
			res.render("signin",{data:"两次输入密码不一致 请重新输入！"});
		}
		else{
			index_model.do_signin(username,password);
			res.render("signin",{success:"用户注册成功 请登录 >"});
		}
	});
};
exports.get_list = function(req,res,next){	
	console.log("this is get_list");
	var user = req.session.username;
	index_model.do_check_list(function(results){
	if(user){
			index_model.login_user(user,function(userinfo){
				console.log("this should be right");
				console.log(userinfo);
				res.render('list',{date:results[0].list_time,data:results,user:req.session.username,direct:'./user',head:userinfo[0].head});
			});
		}
	else{
			console.log("this should be wrong");
			res.render('list',{date:results[0].list_time,data:results,user:"登 陆",direct:'./login',head:'/images/user.png'});
		}
	});
};
exports.user_info = function(req,res,next){	
	console.log("this is get userinfo");
	var username = req.session.username;
	var user = req.session.username;
	console.log(user);
	index_model.get_user_info(username,function(results){
		if(user){
			index_model.login_user(user,function(userinfo){
			console.log("this should be right");
			console.log(userinfo);
			res.render('user',{data:results[0],user:req.session.username,direct:'./user',head:userinfo[0].head});
			});
		}
		else{
			console.log("this should be wrong");
			res.render('user',{data:results[0],user:"登 陆",direct:'./login',head:'/images/user.png'});
		}
	});
};
exports.show_change_page =function(req,res,next){
	console.log("this is change userinfo");
	var username = req.session.username;
	index_model.get_user_info(username,function(results){
	var user = req.session.username;
	console.log(user);
	index_model.get_user_info(username,function(results){
		if(user){
			index_model.login_user(user,function(userinfo){
				console.log("this should be right");
				console.log(userinfo);
				res.render('change_user',{data:results[0],user:req.session.username,direct:'./user',head:userinfo[0].head});
			});
		}
		else{
			console.log("this should be wrong");
			res.render('change_user',{data:results[0],user:"登 陆",direct:'./login',head:'/images/user.png'});
		}
	});
});
}
exports.change_userinfo = function(req,res,next){	
		console.log("this is change userinfo");
		console.log("this is new userinfo");
		console.log(req.body);
		var username = req.session.username;
		var new_username = req.body.username;
		var new_password = req.body.password;
		var new_sex = req.body.sex;
		var new_age = req.body.age;
		var new_job = req.body.job;
		var new_phone = req.body.phone;
		var new_personal_sign = req.body.personal_sign;
		console.log("this is new_personal_sign");
		console.log(new_personal_sign);
		index_model.do_change_userinfo(new_username,new_password,new_sex,new_age,new_job,new_phone,new_personal_sign,username,function(results){
			console.log(results);
			req.session.username=new_username;
			req.session.password=new_password;
		var user = req.session.username;
		console.log(user);
		index_model.get_user_info(username,function(results){
			if(user){
				index_model.login_user(user,function(userinfo){
					console.log("this should be right");
					console.log(userinfo);
					res.render('user',{data:results[0],user:req.session.username,direct:'./user',head:userinfo[0].head});
				});
			}
			else{
				console.log("this should be wrong");
				res.render('user',{data:results[0],user:"登 陆",direct:'./login',head:'/images/user.png'});
			}
		});
	});
};
exports.ticket_list =function(req,res,next){
		var user = req.session.username;
		console.log(user);
		if(user){
			index_model.login_user(user,function(userinfo){ 
				index_model.get_ticket_list(function(results){
						console.log(results);
						res.render('ticket',{data:results,user:req.session.username,direct:'./user',head:userinfo[0].head,order_button:"/order?id=#{item.ticket_id}&movie_id=#{item.movie_id}"});
				});
			});
		}
		else{
			index_model.get_ticket_list(function(results){
				res.render('ticket',{data:results,user:"登 陆",direct:'./login',head:'/images/user.png',order_button:'./login'});
			});
		}
}
exports.order_page =function(req,res,next){
	var user_id = req.session.user_id;
	if(user_id){
		var id = req.query.id;
		var movie_id = req.query.movie_id;
		index_model.get_order_info(id,function(results){
			index_model.get_sold_seat(movie_id,function(sold_seats){
				// console.log(results);
				console.log("______________fucker__________________");
				console.log(sold_seats);
				var sold_seats_array= [];
				for(i=0;i<sold_seats.length;i++){
					sold_seats_array.push(sold_seats[i].ticket_seat);
				}
				console.log("_________________asshole_______________");
				console.log(sold_seats_array);
				var user = req.session.username;
				console.log(user);
					if(user){
						index_model.login_user(user,function(userinfo){
							console.log("this should be right");
							console.log(results[0]);
							res.render('order',{data:results[0],sold:sold_seats_array,user:req.session.username,direct:'./user',head:userinfo[0].head});
						});
					}
					else{
						console.log("this should be wrong");
						res.render('order',{data:results[0],sold:sold_seats_array,user:"登 陆",direct:'./login',head:'/images/user.png'});
					}
			});
		});
	}
	else{
		res.render('login');
	}
}
exports.buy_ticket =function(req,res,next){
	var id=req.body.movie_id;
	var play=req.body.ticket_play;
	var seats=[];
	var choose_seat = req.body.ticket_seat_choose;
	var choose_seat = choose_seat.split(",");
	seats=seats.concat(choose_seat);
	var price=req.body.ticket_seat_price;
	var buyer=req.session.user_id;
	var StringSeats = seats.toString();
	var user = req.session.username;
			console.log(user);
			if(user){
				index_model.login_user(user,function(userinfo){
					console.log("this should be right");
					console.log(userinfo);
					index_model.get_buy_info(id,play,seats[0],function(ticket_buy_info){
						for(var i=0;i<seats.length;i++){
							index_model.save_buy_ticket(buyer,play,seats[i],id,function(results){
								console.log("success"+seats[i]);
								res.render("ticket_buy_success",{data_ticket:ticket_buy_info[0].name,user:req.session.username,direct:'./user',head:userinfo[0].head,play:play,seats:StringSeats,price:price,});
								console.log(ticket_buy_info[0]);
							});
						}
						console.log("ticket_out");	
					});
				});
			}
			else{
				console.log("this should be wrong");
				res.render('index',{data:results,user:"登 陆",direct:'./login',head:'/images/user.png'});
			}
}
exports.admin_login_page = function(req,res,next){
	console.log("this is admin_login page");
	res.render('admin_login');
};
exports.admin_login =function(req,res,next){
	var admin_name = req.body.admin_name;
	var admin_password = req.body.admin_password;
	index_model.check_admin_login_data(admin_name,function(results){
		if(results.length!=0){
			if(admin_name == results[0].admin_name&&admin_password==results[0].admin_password){
				console.log("login success");
				console.log(results);
				req.session.admin_name = admin_name;
				req.session.admin_id=results[0].admin_id;
				console.log("this is session_admin_name");
				console.log(req.session.admin_name);
				console.log(req.session.admin_id);
				res.render("admin_login_success");
			}
			else{
				console.log("username or password is wrong err_code:2");
			}
		}
		else{
			console.log("username or password is wrong err_code:1");
			res.render("admin_login",{data:"用户名或密码错误 请重新输入！"});
		}
	});
}
exports.show_ticket_manage =function(req,res,next){
		var admin = req.session.admin_name;
		console.log(admin);
		if(admin){
				index_model.get_ticket_list(function(results){
						console.log(results);
						res.render('ticket_manage',{data:results});
				});
		}
		else{
			res.render("admin_login");
		}
}
exports.admin_delete_ticket =function(req,res,next){
		var admin = req.session.admin_name;
		var play = req.query.play;
		var movie_id = req.query.movie_id;
		console.log(admin);
		if(admin){
			index_model.do_delete_ticket(play,movie_id,function(){
				index_model.get_ticket_list(function(results){
						console.log(results);
						res.render('ticket_manage',{data:results});
				});
			
			});
		}		
		else{
			res.render("admin_login");
		}
}
exports.admin_add_ticket =function(req,res,next){
		var admin = req.session.admin_name;
		console.log(admin);
		if(admin){
			index_model.checkindex(function(results){
				res.render('add_ticket',{data:results});
			});
		}		
		else{
			res.render("admin_login");
		}
}
exports.do_admin_add_ticket =function(req,res,next){
		var admin = req.session.admin_name;
		var movie_id = req.body.movie_id;
		var play = req.body.play;
		var ticket_time = req.body.ticket_time;
		var ticket_position = req.body.ticket_position;
		var seats=0;
		console.log(admin);
		console.log("inside function");
		if(admin){
			for(var i=0;i<40;i++){
				index_model.do_add_ticket(movie_id,play,i+1,ticket_time,ticket_position,function(){
				});
			}
			index_model.get_ticket_list(function(results){
							console.log(results[0]);
							console.log("________________________________________");
							res.render('ticket_manage',{data:results});
					});
		}		
		else{
			res.render("admin_login");
		}
}