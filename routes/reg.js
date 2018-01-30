var crypto=require('crypto');
var User=require('../models/user.js');

module.exports = (app) => {
	//注册页
	app.get('/reg', checkLogin)	
	app.get('/reg', (req, res, next) => {
		res.render('reg', {
			title:'register',
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
	app.post('/reg', checkLogin)
	app.post('/reg', (req, res) => {
		var name=req.body.name,
			password=req.body.password,
			re_password=req.body.re_password;
		if(password!=re_password){
			req.flash('error','两次密码不一致!');
			return res.redirect('/reg');//返回注册页
		}
		//生成密码的md5值
		var md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		var newUser=new User({
			name:name,
			password:password
		});

		//检查用户是否存在
		User.get(newUser.name, function(err,user){
			if(err){
				req.flash('error','err');
				return res.redirect('/');
			}
			if(user){
				req.flash('error','用户已存在!');
				return res.redirect('/reg');//返回注册页
			}
			//如果不存在,新增用户
			newUser.save(function(err, user){
				if(err){
					req.flash('error',err);
					return res.redirect('/reg');//注册失败,返回注册页
				}
				req.session.user=user;//用户信息存入session
				req.flash('success','注册成功');
				res.redirect('/');//注册成功,返回首页
			});
		});
	});
}

function checkLogin(req, res, next){
	if(req.session.user){
		req.flash('error','已经登录,不需要在登陆')
		res.redirect('/')
	}
	next()
}