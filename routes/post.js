//post.js
var Post=require('../models/post.js')
module.exports = (app) => {
	//新闻业
	app.get('/post',checkLogin);
	app.get('/post', (req, res, next) => {
		var posts=[]
/*		
		Post.getAll(null,(err,posts)=>{
			if(err){
				posts=[];
			}
*/
			res.render('post', {
				title:'post',
				user:req.session.user,
				posts:posts,
				success:req.flash('success').toString(),
				error:req.flash('error').toString()
			});
/*		})
*/
	});
	app.post('/post',checkLogin);
	app.post('/post', (req, res, next) => {
		var user=req.session.user;
		if(req.body.title==""){//控制标题不能为空
			req.flash("error","标题不能为空!");
			res.redirect('back');
		}else if(req.body.post==""){//控制内容不能为空
			req.flash("error","内容不能为空!");
			res.redirect('back');
		}
		//新建文章post对象
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