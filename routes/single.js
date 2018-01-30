module.exports = (app) => {
	//主页
	app.get('/single',(req, res, next)=>{
		res.render('single', {
			title:"single",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
	app.get('/single.html',(req, res, next)=>{
		res.render('single', {
			title:"single",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
}