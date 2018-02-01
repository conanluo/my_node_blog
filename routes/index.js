// var date=require('../inc/date');
// console.log("\n\n\n************************"+date('YYYY-MM-DD')+"**********************\n\n\n")

var Post=require('../models/post.js')
	
module.exports = (app) => {
	//主页
	app.get('/',(req, res, next)=>{
		Post.getAll(null,(err,posts)=>{
			//console.log(posts)
			if(err){
				posts=[];
			}
			res.render('index', {
				title:"index",
				user:req.session.user,
				posts:posts,
				success:req.flash('success').toString(),
				error:req.flash('error').toString()
			});
		})

			
	});
	app.get('/index.html',(req, res, next)=>{
		res.redirect('/')
	});
}