module.exports = (app) => {
	//contact
	app.get('/contact',(req, res, next)=>{
		res.render('contact', {
			title:"contact",
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
}