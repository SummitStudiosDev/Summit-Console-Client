var mc = require('minecraft-protocol');
var colors = require('colors');
var ctext = require('./coloredtext.js');
const mchalk = require('minechalk');

const cred = require('./credentials.json');


var client = mc.createClient({
  host: "fastgens.minehut.gg",   
  port: 25565,        
  username: cred.username,
  password: cred.password,
  auth: 'mojang'
});


client.on('chat', function(packet) {
  var jsonMsg = JSON.parse(packet.message);
  //console.log(jsonMsg);

  
  //spigot chat messages
  var msg = "";
	try {
	  extras = jsonMsg.extra;
	  for(i = 0; i<extras.length; i++){
		  var msgc = extras[i].color;
			if (typeof msgc == 'undefined' || msgc == 'undefined'){
				msg += extras[i].text;
			}else{
				msg += ctext.ctext(extras[i].text,msgc, false);
			}
		  
	  }
	}catch(err) {
		//console.log("err: " +err);
	}
	try{
		const t  = (jsonMsg.text);
		if (typeof t !== 'undefined'){
			msg+=" "+t;
		}
	}catch(err){
		//console.log("err: " +err);
	}
	
	console.log(mchalk(msg));
	
	
	//vanilla messages
  if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
	  try{
		var username = jsonMsg.with[0].text;
		var msg = jsonMsg.with[1];
		console.log(username+": "+msg.text);
	}catch(err){
		//console.log();
	}
  }
  
  
  
  //vanilla join messages
  if(jsonMsg.translate == 'multiplayer.player.joined' ) {
	  try{
		var playerjoined = jsonMsg.with[0].text;
		colors.setTheme({
		  msgcolor: ['yellow']
		});		
		//var msg = (playerjoined + " joined the game").msgcolor;
		var msg = ctext.ctext((playerjoined + " joined the game"),"yellow",false);
		console.log(msg);
	}catch(err){
		//console.log();
	}
  }
  
});
