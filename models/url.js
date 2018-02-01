var mongodb = require('./db');
var date=require('../inc/date');

function Url(id,original,user){
	this.id=id;
	this.original=original;
	this.user=user||'Guest';
}
module.exports=Url;

Url.prototype.save = function(callback) {
	//保存存进数据库的文档
	var url={
		id:this.id,
		original:this.original,
		shortUrl:changeUrl(this.original),
		user:this.user
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取urls集合
		db.collection('urls',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//将文档插入 Urls 集合
			collection.insert(url,{
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

Url.get=(obj,callback,isFindAll)=>{
	//打开数据库
	mongodb.open((err,db)=>{
		if(err){
			return callback(err);
		}
		//读取urls集合
		db.collection("urls",(err,collection)=>{
			if(err){
				mongodb.close();
				return callback(err);
			}
		})
		//根据isFindALL进行查找一个,或者多个查询,默认false
		var findData=isFindAll?collection.find:collection.findOne

		//根据obj的参数进行查询
		if(isFindAll){
			findData(obj,(err,doc)=>{
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,doc);//返回查找的数据
			})
		}else{
			findData(obj).sort({
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
}


//替换网址函数(随机数组代码块)
function changeUrl(orgUrl){
	var newUrl=""
	var keyArr="qweasdzxcrfvtgbyhnuioplkjm7536984120POILKJMNBUHVGYTFDERCXSWQAZ"
	

	return newUrl
}