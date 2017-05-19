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
exports.save_comment =function(username,callback){
	var sql = 'select * from t_users where username=?';
	db.connection.query(sql,[username],function(err,results){
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