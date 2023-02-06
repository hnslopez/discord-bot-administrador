const Discord = require('discord.js')
const hook = new Discord.WebhookClient('<ID>','<KEY>')

module.exports.run = async (bot, message, args) => {
//message.channel.createWebhook(message.author.username, message.author.avatarURL)

//var mention = `<@!521118447774597140>`
//message.channel.toString()
hook.send(message.guild.channels.find(channels => channels.id === '<ID>').toString())
hook.send(message.guild.members.find(user => user.user.username === '<BOT-MUSICA>').toString())
//message.channel.send(mentio)

/* 
hook.send({
	embeds: [{
		color:'11862271',
		author:{
			name:'┌──────────────────┤    Parche 0.0.1    ├──────────────────┐'
		}
	},{
		color:'11862271',
	 author:{
		 name:`Evelyn KDA`,
	 },
	 description:'Evelynn ya se encuentra lista para el show!',
	 fields:[{
		 name:'Invitación',
		 value:`Para que ingrese al canal de voz que te encuentras solo debes ir al canal #┃comandos y tagearla @<--------->`
	 },{
		 name:'Comandos y Música',
		 value:`Para evitar spam de canciones y comandos, evelynn cuenta con su propio canal de musica, solo pueden ver el canal aquellos que estén en el mismo canal que eve.`
	 }]
	},{
		color:'11862271',
		author:{
			name:'└────────────────────────────────────────────────┘'
		}
	}]
  });
   */
}



module.exports.help = { 
	name:"_"
	
}