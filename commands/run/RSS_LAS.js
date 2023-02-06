const Discord = require('discord.js');
const fetch = require('node-fetch');
const RSS = require('./Settings.json')
const parseString = require('xml2js').parseString;
const fs = require('fs');
var new_info = new Array();
var save_info = new Array();
var old_info = new Array();
var Servers = new Array('<ID>');


module.exports.run = async (bot) => {
//RSSFULL();
//setInterval(RSSFULL, 12000);

function RSSFULL() {
fetch(RSS.Feed.Las).then(res => res.text()).then(body => 
parseString(body, function(err, result){
		total = result.rss.channel.map(g => g.item)[0].map(g =>[g.title, g.link, g.pubDate, g.description, g.guid])
 for (var i = 0; i < 4; i++){
			new_info[i] = new Array();
			for (var y = 0; y < 15; y++){
				new_info[i][y] = total[y][i][0]
			};
		};
		
	new_info[4] = new Array();
	
 for (var i = 0; i < 15; i++){
		new_info[4][i] = total[i][4][0]._.slice(0,-35);
		save_info[i] = new Array(new_info[0][i].toLowerCase().replace(/[!¡ &\/\\#,_+()$~%.'":*?<>{}-]/g, ""),new_info[4][i],+ new Date(new_info[2][i]));
	}
	 fs.readFile(__dirname+'/RSS/RSS.txt', function read(err, data){
		if (err){
	fs.writeFile(__dirname+"/RSS/RSS.txt", JSON.stringify(save_info), function(err) {
			return;
			});
		}else{
			fs.readFile(__dirname+'/RSS/RSS_PUBLIC.txt', function read(err, data2){
				if(err){
				fs.writeFile(__dirname+"/RSS/RSS_PUBLIC.txt", JSON.stringify(new Array()), function(err) {
						return;
			});
				}else{
			let Public = JSON.parse(data2)
			let Public_new = JSON.parse(data2)

			old_info[0] = new Array();
			old_info[1] = new Array();
			old_info[2] = new Array();
			for(var i = 0; i < 15; i++){
			old_info[0][i] = JSON.parse(data)[i][0]
			old_info[1][i] = JSON.parse(data)[i][1]
			old_info[2][i] = JSON.parse(data)[i][2]
			}
			for (var i = 0; i < 15; i++){
			 if(!old_info[0].includes(new_info[0][i].toLowerCase().replace(/[!¡ &\/\\#,_+()$~%.'":*?<>{}-]/g, ""))){
				 if(!old_info[1].includes(new_info[4][i]) && +new Date(new_info[2][i]) > old_info[2][10]){
					 if(!Public.includes(new_info[0][i].toLowerCase().replace(/[!¡ &\/\\#,_+()$~%.'":*?<>{}-]/g, ""))){				
				bot.channels.get(`<ID>`).send({embed: {
					color: 3447003,
					 author: {
							  name: new_info[0][i],
							  url: new_info[1][i].substring(0,new_info[1][i].length - 8)
							},
					description:`${new_info[3][i].substring(new_info[3][i].indexOf('hidden">')+8, new_info[3][i].indexOf('</div><div ')).replace(/&quot;/g,'"').replace(/&#039;/g,"'")}`,
					image:{
							url:`https://las.leagueoflegends.com${new_info[3][i].substring(new_info[3][i].indexOf('/sites'),new_info[3][i].indexOf('?itok=')).replace(/large/g, "scale_xlarge")}`
							}
					  }
				});	
	
						Public_new.unshift(new_info[0][i].toLowerCase().replace(/[!¡ &\/\\#,_+()$~%.'":*?<>{}-]/g, ""))
						if(Public_new.length > 30)Public_new.pop();
						};
					};
				};
			};
		if(Public[0] !== Public_new[0]){
			fs.writeFile(__dirname+"/RSS/RSS_PUBLIC.txt", JSON.stringify(Public_new), function(err){
			});
			fs.writeFile(__dirname+"/RSS/RSS.txt", JSON.stringify(save_info), function(err) {
									});
								};
							};
						});
					};
				});
			})
		);
	};

};