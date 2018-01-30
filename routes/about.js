module.exports = (app) => {
	//关于页
	app.get('/about',(req, res, next)=>{
		res.render('about', {
			title:"about",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
}