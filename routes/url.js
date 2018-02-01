var Url=require('../models/url.js')
var date=require('../inc/date')
module.exports = (app) => {
	//新建一个url页
	app.get('/url',(req, res, next)=>{
		res.render('url', {
			title:"url",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
	app.get('/s/:code',(req,res,next)=>{

	})

	app.post('/url',(req, res, next)=>{
		var id=date('x');
		var url=req.body.url;
		var user=req.body.user;
		//控制地址不能为空
		if(url==""||url=="https://"||url=="http://"){
			req.flash('error','地址不能为空')
			res.redirect('/url')
		}
		//创建存储 url 文件数据
		var scUrl=new Url(id,url,user);
		scUrl.save(err=>{
			if(err){
				req.flash("error",err);
				return res.redirect('/url')
			}
			req.flash("success","创建成功!");
			res.redirect('/url')
		})
	})
}