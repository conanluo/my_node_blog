var Url=require('../models/url.js')
var date=require('../inc/date')
module.exports = (app) => {
	//新建一个url页
	app.get('/url',(req, res, next)=>{
		res.render('url', {
			title:"url",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString(),
			G:{}
		});
		//next()
	});
	app.get('/url/:code/:org',(req,res,next)=>{//显示网址
		var org=req.params.org.replace('@@',"https://")
							  .replace('@',"http://")
							  .replace(/@\$/g,'/')
		var shortCut='http://'+req.get('host')+'/s/'+req.params.code
		res.render('url', {
			title:"url",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString(),
			G:{
				shortUrlCode:shortCut,
				orgUrl:org
			}
			
		});
	})
	app.get('/s/:code',(req,res,next)=>{//跳转网址
		var code=req.params.code;
		Url.get({'shortUrl':code},(err,url)=>{
			if(err){
				req.flash('error',err)
				return res.redirect('/')
			}
			if(url){
				res.redirect(url.original)
			}else{
				req.flash('error','This short cut is not defined')
				res.redirect('/url')
			}
		},true);
	})

	app.post('/url',(req, res, next)=>{
		var id=date('x');
		var url=req.body.url;
		var user=req.body.user;
		var sUrl=changeUrl();//随机一个url字段
		//控制地址不能为空
		if(url==""||url=="https://"||url=="http://"){
			req.flash('error','地址不能为空')
			res.redirect('/url')
		}
		//创建存储 url 文件数据
		var scUrl=new Url(id,url,sUrl,user);
		/*//判断地址是否存在
		Url.get({'original':url},(err,murl)=>{
			if(err){
				req.flash('error',err);
				return res.redirect('/');
			}
			if(murl){
				req.flash('error','此网址已经存在!');
				return res.redirect('/url/'+murl.shortUrl);//-------看看要返回哪里
			}
		},true);
		*/
		Url.get({'shortUrl':sUrl},function(err2,urls){

			if(err2){
				req.flash('error',err2);
				return res.redirect('/');
			}
			if(urls){
				//如果储存在shortUrl,后面加a
				scUrl.shortUrl=sUrl+'a';
			}
			//如果不存在数据,且short没有被使用,存在入库
			scUrl.save(err=>{
				if(err){
					req.flash("error",err);
					return res.redirect('/url')
				}
				req.flash("success","创建成功!");
				res.redirect('/url/'+scUrl.shortUrl+"/"+scUrl.original.replace("http://","@").replace("https://","@@").replace(/\//g,"@$"))
			})
			
			
		})		
	})
}


//替换网址函数(随机数组代码块)
function changeUrl(){
	var newUrl=""
	var keyArr="qweasdzxcrfvtgbyhnuioplkjm7536984120POILKJMNBUHVGYTFDERCXSWQAZ"
	var flag=true;
		
	for (var i = 7; i >= 0; i--) {
		newUrl+=keyArr.charAt(Math.floor(Math.random()*61))
	}


	

	return newUrl
}