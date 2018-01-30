/* GET home page. */
var fs = require('fs')

module.exports = (app) => {

	//自动加载路由

	var files = fs.readdirSync('./routes') //获取routes下的所有文件进行遍历
	var ex=/(.*)\.js$/ //匹配所有js文件 的正则

	// for (var i = files.length - 1; i >= 0; i--) {
	// 	
	// 	//console.log(files[i]);
	// 	if(ex.test(files[i])){
	// 		files[i]='./routes/'+files[i].replace('.js','')
	// 		require(files[i])(app)
	// 	}
	// }
var tempArr=[]
	//加载所有路由文件
	files.forEach((val,index,arr) => {
		tempArr.push(val)
		ex.test(val)?(require('./routes/'+val.replace('.js',''))(app)):tempArr.pop()
		// ex.test(val)?require('./routes/'+val.replace('.js',''))(app):''
	})

	console.log("***********************\n\t加载路由\n***********************\n*\t"+tempArr.toString().replace(/\.js(,)?/g,'\n*\t')+'\b\b\b\b\b\b\b\b***********************')
	
	
	

};
