var moment=require('moment');

module.exports=function(x){
	return moment().format(x); 
}