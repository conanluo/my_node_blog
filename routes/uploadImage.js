var multiparty = require('multiparty');//大文件上传中间件
var date = require('../inc/date');//时间格式化中间件
var settings = require("../settings");//导入settings文件
var fs = require('fs')

module.exports = (app) => {

	app.post('/uploadImage',checkLogin);
	app.post('/uploadImage',(req, res, next)=>{
    //生成multiparty对象，并配置上传目标路径
	    var form = new multiparty.Form({uploadDir: './public/'+settings.postsImgUrl});
	    //上传完成后处理
	    form.parse(req, function (err, fields, files) {
	        if (err) {
	            console.log('parse error: ' + err);
	        } else {
	            //注意imageData仍为文件数组类型
	            var imageFile = (files.imageData)[0];
	            var uploadedPath = imageFile.path;
	            //图片名称为上传时间毫秒+随机数
	            //获取文件后缀
	            var filename=imageFile.originalFilename.split('.');
	            var	imgSuffix = '.'+filename[filename.length-1];
	            //获取1000以内的随机数
	            var randomNumber = Math.floor(Math.random() * (1000 + 1))
	            //组合新的文件名
	            var imageName = date('x')+randomNumber+imgSuffix ;
	            var dstPath = './public/'+settings.postsImgUrl + imageName;
	            //重命名为真实文件名
	            fs.rename(uploadedPath, dstPath, function (err) {

	                if (err) {
	                    console.log('rename error: ' + err);
	                } else {
	                    var result = {};
	                    result.status = "success";
	                    result.imageUrl = "./"+settings.postsImgUrl + imageName;
	                    res.status(200).send(result);
	                    res.end();
	                }
	            });
	        }
	    });
    });
}



function checkLogin(req, res, next){
	if(!req.session.user){
		req.flash('error','没有登陆!')
		res.redirect('/')

	}
	next()
}