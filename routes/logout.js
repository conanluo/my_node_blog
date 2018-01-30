module.exports = (app) => {
	//登出
	app.get('/logout',checkLogin)
	app.get('/logout', (req, res, next) => {
		req.session.user = null;
		req.flash('success','登出成功!');
		res.redirect('/');//回首页
	});
}

function checkLogin(req, res, next){
	if(!req.session.user){
		req.flash('error','没有登陆!')
		res.redirect('/')

	}
	next()
}