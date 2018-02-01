var mongodb = require('./db');
var date=require('../inc/date');

function Post(name, title, post){
	this.name=name;
	this.title=title;
	this.post=post;
	//this.labels=labels;
}
module.exports=Post;

//保存一个文章
Post.prototype.save = function(callback) {
	//保存各种时间格式,以后备用
	var time={
		date:date(),
		year:date('YYYY'),
		month:date('YYYY-MM'),
		day:date('YYYY-MM-DD'),
		minute:date('YYYY-MM-DD HH:mm'),
		second:date('x')
	}
	//存入数据库的文档
	var post={
		id:time.seconds,
		name:this.name,
		time:time,
		title:this.title,
		post:this.post
	};
	//打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取posts集合
		db.collection('posts',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//将文档插入 Posts 集合
			collection.insert(post,{
				safe:true
			},err=>{
				mongodb.close();
				if(err){
					return callback(err);//失败!返回err
				}
				callback(null);//插入成功返回null
			});
		});
	});
};

Post.getAll=function(name,callback){
	//打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		//读取posts集合
		db.collection("posts",(err,collection)=>{
			if(err){
				mongodb.close();
				return callback(err);
			}
			var query={};
			if(name){
				query.name=name;
			}
			//根据query 对象查询文章
			collection.find(query).sort({
				time:-1
			}).toArray((err,docs)=>{
				mongodb.close();
				if(err){
					return callback(err);//失败!返回err
				}
				callback(null,docs);//成功返回数组查询结果
			});
		});
	});
}
/*
Post.get=(obj,callback,isFindAll)=>{
	//打开数据库
	mongodb.open((err,db)=>{
		if(err){
			return callback(err);
		}
		//读取posts集合
		db.collection("posts",(err,collection)=>{
			if(err){
				mongodb.close();
				return callback(err);
			}
		})
		//根据isFindALL进行查找一个,或者多个查询,默认false
		//根据obj的参数进行查询
		if(isFindAll){
			collection.findOne(obj,(err,doc)=>{
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,doc);//返回查找的数据
			})
		}else{
			collection.find(obj).sort({
				time:-1
			}).toArray((err,docs)=>{
				mongodb.close();
				if(err){
					return callback(err);//失败!返回err
				}
				callback(null,docs);//成功返回数组查询结果
			});
		}
	})
}*/