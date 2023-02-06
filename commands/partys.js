const line ={

}

module.exports.run = async (bot, message, args) => {
	let VoiceChannel = message.member.voiceChannelID
if(VoiceChannel){
	field = new Array();
let users = bot.channels.get(VoiceChannel).members.map(channel => [channel.user.username,channel._roles])
let roles = message.guild.roles.filter(rol => rol.name[0] ==='|')
let Line = new Array(new Array(),new Array(),new Array(),new Array(),new Array());
let PositionSolo = message.guild.roles.filter(rol => rol.name[0] ==='-');
let PositionFlex = message.guild.roles.filter(rol => rol.name[0] ==='_');
let position = new Array();

//busco top jungla 

for(var i =0;i<users.length;i++){
	position[i] = new Array();
	for(var x =0 ; x<users[i][1].length+1;x++){
	if(roles.find(rol => rol.id ===users[i][1][x])){
		let rol = roles.find(rol => rol.id ===users[i][1][x]).name.substr(1)
		Line[i].push(bot.emojis.find(emojis => emojis.name === rol))
	}
	if(PositionSolo.find(rol => rol.id ===users[i][1][x])){
		let league = PositionSolo.find(rol => rol.id ===users[i][1][x]).name.substr(1)
		position[i][0] = bot.emojis.find(emojis => emojis.name === league)
		position[i][1] = league

		};
	};
	if(Line[i].length === 0)Line[i][0] = bot.emojis.find(rol => rol.name === 'Comodin').toString();
	if(position[i].length === 0)Line[i][0] = 'Unranked';
};

//\u203a

for(var i = 0; i < users.length;i++){
	field.push({'name':`${position[i][0]} ${users[i][0]}`,'value':`${Line[i].join(' ')}`});
};

message.channel.send({embed:{
	author:{
		name:'',
		icon_url:message.author.avatarURL
	},
	title:`Gestor de Grupos`,
	description:`${args.join(' ')}`,
	fields:field

}})
}else{
	if(!args[0])return console.log('x')
message.channel.send({embed:{
author:{
	name:'x'
}
}});

};
};



/*
message.channel.sendMessage('What tag would you like to see? This will await will be cancelled in 30 seconds. It will finish when you provide a message that goes through the filter the first time.')
.then(() => {
  message.channel.awaitMessages(response => response.content === "test" || response.content === "wow", {
    max: 2,
    time: 30000,
    errors: ['time'],

  }).then(collected =>{ msg = collected.first() 
if(msg.content === "test"){
msg.channel.sendMessage("hi")
}
if(msg.content === "wow"){
msg.channel.sendMessage("Wew")
}
}).catch(collected=> msg.channel.sendMessage("you've ran out of time"))
 */

module.exports.help = { 
	name:"a"
	
}