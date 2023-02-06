const Discord = require('discord.js')
const hook = new Discord.WebhookClient('<ID>','<TOKEN>')

module.exports.run = async (bot, message, args) => {
if(!message.member.permissions.has('ADMINISTRATOR')) return;
let rol = message.guild.roles.find(rol => rol.name === 'Notificación')
let users = message.guild.members.filter(member=> member.roles.has(rol.id)).map(g=>[g.user.username,g.user.id, g._roles])

users.forEach((x,i)=>{
	if(x[2].length == 1){
		message.guild.members.get(x[1]).send('Buenas Tardes,\nDebido a un bug has podido seleccionar el rol “Notificación” sin tener un rol de servidor como LAS/LAN, cosa que no debería ser posible al menos que quieras llenarte de spam D: Por este motivo se te eliminó el rol, para volver a tenerlo primero debes elegir un servidor.\nPerdón por las molestias :c').then(()=>{
			message.guild.members.get(x[1]).removeRole(x[2][0]);
		});
	}
})
};



module.exports.help = { 
	name:"_"
	
}