var moment=require('moment')
var date=require('../inc/date')
module.exports = (app) => {
	//关于页
	app.get('/test',(req, res, next)=>{
		res.render('test', {
			title:moment('2018-01-31T00:01:05-08:00').format('x'),
			user:req.session.user,
			success:req.flash('success').toString(),
			error:req.flash('error').toString()
		});
	});
}