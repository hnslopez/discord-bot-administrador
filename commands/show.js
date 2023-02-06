const Discord = require('discord.js')
const hook = new Discord.WebhookClient('<ID>','<KEY>')
module.exports.run = async (bot, message, args) => {
    if(!message.member.permissions.has('ADMINISTRATOR')) return;
hook.send(' ┌───────────────────────────────────────────────┐\n                          Bienvenidos al servidor **BETA** de **------**                              \n                    La idea de este servidor es principalmente ser de utilidad\n                revisar, ver noticias y dar información sobre league of legends.',{embeds:[{
        color:'2407168',
        author:{
            name:`Información`,
            url:'-----------------------------'
        },
        description:'Admin Bot se creó exclusivamente para este servidor y se actualizará según las necesidades de el.',
        fields:[{
            name:'Prefijos',
            value:' : -  !  _  ;  .\n*Cualquiera de estos prefijos es válido para activar los comandos.*'
        },{
            name:'Invitación al Servidor',
            value:'----------------------'
        }]
    
    },{
        color:'4485375',
        title:'Comandos disponibles [En Desarrollo]',
        description:'Los comandos sólo pueden utilizados en el canal '+message.guild.channels.find(channels => channels.id === '<ID>').toString(),
        fields:[{
            name:'info [nombre de campeón]',
            value:'Información básica sobre los campeones dentro del parche actual'
        },{
            name:'loot',
            value:'Simulador de cofre hextech.'
        },{
            name:'canal [SoloQ ,flex, Normal, Aram o General]',
            value:'Crea canales de voz temporales'
        },{
            name:`@------`,
            value:'Tageala '+`[${message.guild.members.find(user => user.user.username === '-----').toString()}]`+' para que Evelynn ingrese al canal de voz que te encuentras.'
        }]
    },{
        color:'15926794',
        title:'Canales de voz',
        fields:[{
            name:'¿No hay canales de voz?',
            value:'En este servidor los canales de voz se crean de forma temporal'
        },{
            name:'¿Como creo uno?',
            value:'con el comando "canal [tipo de canal]", existen 4 tipos de canales [SoloQ ,flex, Normal, Aram y General] y cada uno tiene sus reglas'
        }]
    },{
        color:'11862271',
        title:'Team KDA',
        description:'Está compuesto de 4 Bots de música, Evelynn, Kai’sa, Ahri y Akali, de momento solo está disponible Evelynn.',
        fields:[{
            name:'Invitación',
            value:'Para que ingresen en el canal de voz que te encuentres solo debes ir al canal '+message.guild.channels.find(channels => channels.id === '<ID>').toString()+' y tagearla.'
        },{
            name:'Info',
			value:'-Cuando un bot del Team KDA está disponible tendrá su estado de ”Disponible”.\n-Al estar en un canal de voz reproduciendo música, mostrará qué canción reproduce además de cambiar su estado a “No Molestar”.'
        }]
    }
]});
}

module.exports.help = { 
	name:"run"
	
}