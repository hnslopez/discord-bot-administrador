const Discord = require('discord.js')
const champions = require('./champions.json');
const fetch = require('node-fetch');
const hook = new Discord.WebhookClient('<ID>','<KEY>')

module.exports.run = async (bot, message, args) => {
    
    for( key in champions){
        if(champions[key].name.toLowerCase() === args.join(' ').toLowerCase() || champions[key].alias.toLowerCase() === args.join(' ').toLowerCase()){
                Information(champions[key])
        }
    };
function Information(data){
        fetch(`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/es_mx/v1/champions/${data.id}.json`).then(res => res.text()).then(body => 
            show(JSON.parse(body))
          );
    };

function show(date){
var field = new Array();
//{"name": "Cantidad de Aspectos","value": date.skins.length-1}
    for(var skin = 1; skin < date.skins.length; skin++){
        if(field.length < 25){
            field.push({'name':`${date.skins[skin].name}`, 'value':`${date.skins[skin].description? date.skins[skin].description.replace(/<br>/g,'\n'): 'No existe descripcion'}`})
        }
    };
    console.log(date)
    hook.send('Comando En Desarrollo\n',{embeds: [{
        color: 38179,
             title:`${date.name }`,
             description:`${date.title}`,
             fields:[{
                 name:`Pasiva: ${date.passive['name']}`,
                 value:`${date.passive['description'].replace(/<br>/g,'\n').replace(/<font color='#FFFFFF'>/g,'**').replace('</font>','**')}`,
                 inline: true
             },{
                name:`Q: ${date.spells[0]['name']}`,
                value:`${date.spells[0]['cooldownCoefficients']?'Enfriamiento: '+date.spells[0]['cooldownCoefficients'].join(' / ')+'s\n':''}${date.spells[0]['costCoefficients']?'Costo: '+date.spells[0]['costCoefficients'].join(' / ')+'\n\n':''}${date.spells[0]['description'].replace(/<br>/g,'\n').replace(/<font color='#FFFFFF'>/g,'**').replace('</font>','**')}\n`,
                inline: true
            },{
                name:`W: ${date.spells[1]['name']}`,
                value:`${date.spells[1]['cooldownCoefficients']?'Enfriamiento: '+date.spells[1]['cooldownCoefficients'].join(' / ')+'s\n':''}${date.spells[1]['costCoefficients']?'Costo: '+date.spells[1]['costCoefficients'].join(' / ')+'\n\n':''}${date.spells[1]['description'].replace(/<br>/g,'\n').replace(/<font color='#FFFFFF'>/g,'**').replace('</font>','**')}`,
                inline: true
            },{
                name:`E: ${date.spells[2]['name']}`,
                value:`${date.spells[2]['cooldownCoefficients']?'Enfriamiento: '+date.spells[2]['cooldownCoefficients'].join(' / ')+'s\n':''}${date.spells[2]['costCoefficients']?'Costo: '+date.spells[2]['costCoefficients'].join(' / ')+'\n\n':''}${date.spells[2]['description'].replace(/<br>/g,'\n').replace(/<font color='#FFFFFF'>/g,'**').replace('</font>','**')}`,
                inline: true
            },{
                name:`R: ${date.spells[3]['name']}`,
                value:`${date.spells[3]['cooldownCoefficients']?'Enfriamiento: '+date.spells[3]['cooldownCoefficients'].join(' / ')+'s\n':''}${date.spells[3]['costCoefficients']?'Costo: '+date.spells[3]['costCoefficients'].join(' / ')+'\n\n':''}${date.spells[3]['description'].replace(/<br>/g,'\n').replace(/<font color='#FFFFFF'>/g,'**').replace('</font>','**')}`,
                inline: true
            }]
    },{
        color: 38179,
        title:`${date.alias}`,
        description:`${date.shortBio}`,
           fields:field
    }]})
};
}

module.exports.help = { 
	name:"info"
	
}