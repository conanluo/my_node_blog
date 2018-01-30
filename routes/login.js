var crypto=require('crypto');
var User=require('../models/user.js');

module.exports = (app) => {
	//登录页
	//先检测是否登陆了
	app.get('/login',checkLogin)
	app.get('/login', (req, res, next) => {
		res.render('login', {
			title:'login',
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
	app.post('/login', checkLogin)
	app.post('/login', (req, res, next) => {
		//密码md5加密
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');
		//检查用户是否存在
		User.get(req.body.name, (err,user)=>{
			if(!user){
				req.flash('error','用户不存在!');
				return res.redirect('/login');//重新登陆
			}
			//检查密码是否正确
			if(user.password != password){
				req.flash('error','密码错误!');
				return res.redirect('/login');//重新登陆
			}
			//用户名密码匹配后,信息写入session
			req.session.user=user;
			req.flash('success','登陆成功!');
//以后修改跳到后台
			res.redirect('/');//到首页
		})
	});
}


function checkLogin(req, res, next){
	if(req.session.user){
		req.flash('error','已经登录,不需要在登陆')
		res.redirect('/')
	}
	next()
}