var db = require("./db.js");
exports.login_user = function(username,callback){
	var sql = "select * from t_users where username=?";
	db.connection.query(sql,[username],function(err,userinfo){
		if(err){
			throw err;
		}else{
			callback&&callback(userinfo);
		}
	});
};
exports.checkindex = function(callback){
	var sql = "select * from t_movie";
	db.connection.query(sql,function(err,result){
		if(err){
			throw err;
		}else{
			callback&&callback(result);
		}
	});
};
exports.checkmovie = function(id,callback){
	var sql = "select * from t_movie where id =?";
	db.connection.query(sql,[id],function(err,result){
		if(err){
			throw err;
		}else{
			callback&&callback(result);
		}
	});
};
exports.check_comments = function(id,callback){
	var sql = "SELECT tc.*,tu.* from t_comments tc,t_users tu where tc.movie_id = ? and tc.user_id = tu.id;";
	db.connection.query(sql,[id],function(err,result){
		if(err){
			throw err;
		}else{
			callback&&callback(result);
		}
	});
};
exports.save_comment =function(movie_id,user_id,new_comment,date,movie_score,callback){
	var sql = 'insert into t_comments (movie_id,user_id,comment_content,comment_time,comment_score) values(?,?,?,?,?)';
	db.connection.query(sql,[movie_id,user_id,new_comment,date,movie_score],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
exports.check_login_data = function(username,password,callback){
	var sql = "select * from t_users where username =? and password=?";
	db.connection.query(sql,[username,password],function(err,result){
		if(err){
			throw err;
		}else{
			callback&&callback(result);
		}
	});
};
exports.check_signin_exist = function(username,callback){
	var sql = "select * from t_users where username =?";
	db.connection.query(sql,[username],function(err,result){
		if(err){
			throw err;
		}else{
			callback&&callback(result);
		}
	});
};
exports.checklist = function(callback){
	var sql = "select * from t_movie";
	db.connection.query(sql,function(err,list_results){
		if(err){
			throw err;
		}else{
			callback&&callback(list_results);
		}
	});
}
exports.do_signin = function(username,password,callback){
	var sql = "insert into t_users (username,password) values (?,?)";
	db.connection.query(sql,[username,password],function(err){
		if(err){
			throw err;
		}else{
			console.log("insert complete");
			callback;
		}
	});
}
exports.do_check_list = function(callback){
	console.log("this function is working");
	var sql = "select movie.id,movie.name,movie.year,movie.language,movie.poster,movie.actor,list.rank,list.score,list.list_time from t_movie movie,t_list list where list.movie_id=movie.id";
	db.connection.query(sql,function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
exports.get_user_info =function(username,callback){
	var sql = 'select * from t_users where username=?';
	db.connection.query(sql,[username],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
exports.do_change_userinfo =function(new_username,new_password,new_sex,new_age,new_job,new_phone,new_personal_sign,username,callback){
	var sql = 'update t_users set username=?,password=?,sex=?,age=?,job=?,phone=?,personal_sign=? where username=?';
	db.connection.query(sql,[new_username,new_password,new_sex,new_age,new_job,new_phone,new_personal_sign,username],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
			console.log("update succeed");
		}
	});
}
exports.get_ticket_list =function(callback){
	var sql = 'select * from t_ticket tk,t_movie tm where tk.ticket_seat=1 and tk.movie_id=tm.id';
	db.connection.query(sql,[],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
exports.get_order_info =function(id,callback){
	var sql = 'select * from t_ticket tk,t_movie tm where tk.ticket_seat=1 and tk.ticket_id=? and tk.movie_id=tm.id';
	db.connection.query(sql,[id],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
exports.get_sold_seat =function(id,callback){
	var sql = 'select ticket_seat from t_ticket where movie_id=? and ticket_status=2';
	db.connection.query(sql,[id],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
exports.save_buy_ticket =function(buyer_id,play,seats,id,callback){
	var sql="update t_ticket set ticket_status = 2,ticket_buyer_id=? where play=? and ticket_seat=?";
	db.connection.query(sql,[buyer_id,play,seats],function(err,results){
		if(err){
			throw err;
		}else{
			callback&&callback(results);
		}
	});
}
