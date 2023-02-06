const Discord = require('discord.js')
const hook = new Discord.WebhookClient('<ID>','<KEY>')

module.exports.run = async (bot, message, args) => {
//message.channel.createWebhook(message.author.username, message.author.avatarURL)

hook.send({embeds:[{
color:'2407168',
    author:{
        name:`Bienvenidos al servidor BETA de ------`,
        url:'-----'
    },
    description:'La idea de este servidor es principalmente ser de utilidad, revisar, dar información sobre league of legends\n\nEl servidor se encuentra en estado Beta, es decir, estará constantemente cambiando.',
},{
    color:'2407168',
 fields:[{
    name:'Reglas',
    value:'-Prohibido compartir contenido no apto para todo público.\n-Respeto a los demás.\n-Realizar SPAM de otros servidores de discord está prohibido.\n'
 }]
},{
    color:'2407168',
 author:{
     name:`------`,
     url:'-----'

 },
 title:'Bienvenidos al servidor BETA de ------',
 description:'La idea de este servidor es principalmente ser de utilidad, revisar, dar información sobre league of legends'
}]})
return;
hook.send({
	embeds: [{
		color:'2407168',
	 author:{
		 name:`------`,
		 url:'-----'

	 },
	 title:'Bienvenidos al servidor BETA de ------',
	 description:'La idea de este servidor es principalmente ser de utilidad, revisar, dar información sobre league of legends'
	},{
		color:'2407168',
	 author:{
		 name:`Información`
	 },
	 fields:[{
	   name:'Admin Bot',
	   value:`Admin está desarrollada exclusivamente para este servidor y se actualizará según las necesidades del servidor`
	 },{
		 name:'n',
		 value:'n'
	 }]
	},{
		color:'2407168',
	 author:{
		 name:`Reglas`
	 },
	 title:'SPAM',
	 description:'Realizar SPAM de otros servidores de discord está prohibido',
	 fields:[{
	   name:'x',
	   value:`Admin está desarrollada exclusivamente para este servidor y se actualizará según las necesidades del servidor`
	 },{
		 name:'n',
		 value:'n'
	 }]
	}]
	});
	
}



module.exports.help = { 
	name:"q"
	
}