var colors = require('colors');

module.exports.ctext = function coloredtext(text, color, italics){
	
	color = color.replace("dark_","");
	color = color.replace("light_","");
	
	//alternate colors
	if(color == "gold")color = "yellow";
	if(color == "purple")color="magenta";
	if(color == "aqua")color="cyan";
	
	//console.log("color: "+color);
	
	//if still not in, just make white
	goodcolors = ["black","red","green","yellow","blue","magenta","cyan","white","gray","grey"]
	if(goodcolors.indexOf(color)==-1)color="white";
	
	
	var l = [];
	l.push(color);
	if(italics == true){
		l.push("italic");
	}
	colors.setTheme({
	  msgcolor: l
	});	
	return text.msgcolor;
}
