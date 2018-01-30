var mongodb=require("./db");

function User(user){
	this.name=user.name;
	this.password=user.password;
	//this.email=user.email;
}

module.exports = User;

User.prototype.save = function(callback) {
	// 要存入数据库的用户文档
	var user = {
		//email:this.email,
		name:this.name,
		password:this.password
	}
	// 打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取 users 集合
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);//错误,返回err信息	
			}
			//将用户插入数据库的 users 集合
			collection.insert(user,{
				safe:true
			},function(err,user){
				consol.log(user)
				mongodb.close();
				if(err){
					return callback(err);//错误,返回err信息
				}
				callback(null,user[0]);//成功!err=null, 并返回存储后的数据
			});
		});
	});
};

//读取用户信息
User.get=function(name,callback){
	//打开数据库
	mongodb.open(function(err, db){
		if(err){
			mongodb.close()
			return callback(err);//错误,返回err信息
		}
		//读取 users 集合
		db.collection('users',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);//错误,返回err信息
			}
			//查找用户名(name键)为name的一个文档
			collection.findOne({
				name:name
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);//错误,返回err信息
				}
				callback(null,user);//成功, 并返回查询的用户信息
			});

		});
	});
}