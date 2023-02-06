const Discord = require('discord.js')
const hook = new Discord.WebhookClient('<ID>','<KEY>')

module.exports.run = async (bot, message, args) => {
//message.channel.createWebhook(message.author.username, message.author.avatarURL)

hook.send({
	embeds: [{
		color:'1746717',
		author:{
			name:'┌──────────────────┤   Parche 0.2.4    ├──────────────────┐'
		}
	},{
		color:'1746717',
	 author:{
		 name:`NUEVO CONTENIDO`,
	 },
	 fields:[{
		 name:'Twitch',
		 value:`Desde ahora estará en modo de testing el notificador de Twitch`
	 },{
		 name:'Canales de Twitch',
		 value:`Admin Bot sigue al canal: lolesportsla`
	 }]
	},
	{
		color:'16760064',
		title:'ERRORES CORREGIDOS',
		fields:[{
		  name:`Rol 'Notificacíon'`,
		  value:`Se ha corregido el error que eliminaba el tiempo de espera al eliminar roles.`
		},{
		  name:'Comando info',
		  value:`Se agregó a Sylas.`
		},{
		  name:'Youtube',
		  value:`Se corrigió el error provocaba que se notificara múltiples veces el mismo video.`
		}]
	 },{
		color:'1746717',
		author:{
			name:'└────────────────────────────────────────────────┘'
		}
	}]
  });
}
/*

*/

module.exports.help = { 
	name:""
	
}