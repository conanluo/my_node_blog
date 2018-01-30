//post.js
var Post=require('../models/post.js')
module.exports = (app) => {
	//新闻业
	app.get('/post', (req, res, next) => {
		Post.get(null,(err,posts)=>{
			if(err){
				posts=[];
			}
			res.render('post', {
				title:'post',
				user:req.session.user,
				posts:posts,
				success:req.flash('success').toString(),
				error:req.flash('error').toString()
			});
		})

		
	});
	app.post('/post',checkLogin);
	app.post('/post', (req, res, next) => {
		var user=req.session.user;
		var post=new Post(user.name,req.body.title,req.body.post);
		post.save(err=>{
			if(err){
				req.flash("error",err);
				return res.redirect('/');
			}
			req.flash("success",'发布成功!');
			res.redirect('/');
		})
	});
}

function checkLogin(req, res, next){
	if(!req.session.user){
		req.flash('error','没有登陆!')
		res.redirect('/')

	}
	next()
}