const Discord = require('discord.js');
const Settings = require('./Settings.json');
const bot = new Discord.Client();
const multiprefix = ['-','!','_',';','.'];
const fs = require('fs');
const spam = ['https://discord.gg'];
const badlist = ['']
const CDemoji = new Set();
const ChannelName = ['Clasificatoria Flex','Clasifi... Solo/Duo','Normal','Reclutamiento ','Aram ','General ']
bot.commands = new Discord.Collection();
var user_kick = new Map();
var newChannels = new Map();

fs.readdir(`${__dirname}/commands/`, (err, files) =>{
    if(err) console.error(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <= 0){
        console.log("No hay comandos ");
    }else{
        console.log(`Iniciando ${jsfiles.length} Comandos`)
    };

    jsfiles.forEach((f,i) =>{
        let busq = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} Cargado`);
        bot.commands.set(busq.help.name.toLowerCase(), busq);
    });
});

bot.on('ready', async ()=>{
bot.channels.get('<ID>').bulkDelete(10);
//    console.log(bot.guilds.get('<ID>').emojis.map(g=>[g.name,g.id]))
//   bot.channels.get('<ID>').send('x')
//    .then((r)=>{
//      r.react('482932767504596994');
 //       r.react('482932773951373322');
 //       r.react('482932768200720404');
 //       r.react('482932771971399680');
//        });



    fs.readdir(`${__dirname}/commands/run`, (err, files) =>{
        if(err) console.error(err);
    
        let jsfiles = files.filter(f => f.split('.').pop() === 'js');
        if(jsfiles.length <= 0){
            console.log("\nNo hay comandos automaticos");
        }else{
            console.log(`\nIniciando ${jsfiles.length} Comandos Automaticos`)
        };
    
        jsfiles.forEach((f,i) =>{
            let starts = require(`./commands/run/${f}`);
            console.log(`${i + 1}: ${f} Cargado`);
            starts.run(bot);
        });
        console.log('\nReady');
    });

    let voiceChannel = bot.guilds.get('<ID>').channels.filter(channel => channel.type === 'voice' )
    let VoiceList = voiceChannel.map(g=> [g.name,g.id,g.members.map(g=>g.user.username)])
    for(i in VoiceList){
        for(x in ChannelName){
            if(VoiceList[i][0].includes(ChannelName[x]) && VoiceList[i][2].length === 0 ){
                bot.channels.get(VoiceList[i][1]).delete();
            };
        };
    };


})
/*
 setInterval(() => {
     require(__dirname+'/commands/run/STATUS LAS.js').run(bot)

   require(`${__dirname}/commands/run/STATUS LAN.js`).run(bot)
 },200000)
*/
bot.on('messageReactionAdd', (messageReaction,user)=>{
    if(user.bot) return;
if(messageReaction.message.channel.id == '<ID>'){
    let rol = messageReaction.message.member.guild.roles.find(r => r.name === messageReaction.message.embeds[0].title)
    let usermember = messageReaction.message.guild.members.get(user.id);
    if(!usermember.roles.find(r => r.name === messageReaction.message.embeds[0].title)){
        if(rol.name == 'Notificación'){
            let roles = usermember.roles.map(g=>g.name)
            roles.shift();
            if(roles.length === 0)return messageReaction.message.guild.channels.find(channel => channel.name === 'ayuda').send(`${usermember} Debes tener seleccionar un servidor para poder activar las notificaciones.`);
            usermember.addRole(rol)
        }else{
            usermember.addRole(rol)
        }

        };
    };
});

bot.on('messageReactionRemove',(messageReaction,user)=>{
    if(messageReaction.message.channel.id == '521118447774597140'){
        let rol = messageReaction.message.member.guild.roles.find(r => r.name === messageReaction.message.embeds[0].title)
        let usermember = messageReaction.message.guild.members.get(user.id);
        if(usermember.roles.find(r => r.name === messageReaction.message.embeds[0].title)){
            if(CDemoji.has(user.id)) return user.send('Puedes elegir todos los roles que quieras rapidamente, pero para eliminarlos debes esperar 1 minuto.');
            usermember.removeRole(rol).then(()=>{
                CDemoji.add(user.id)
                setTimeout(()=>{
                    CDemoji.delete(user.id)
                },60000);
            });
        };
        };
});


bot.on('guildMemberAdd',(member)=>{
    member.send('Bienvenidos al servidor BETA de ------\nLa idea de este servidor es principalmente ser de utilidad, revisar,ver noticias y dar información sobre league of legends.\n\nReglas\n-Prohibido compartir contenido no apto para todo público.\n-Respeto a los demás.\n-Realizar SPAM de otros servidores de discord está prohibido.\n\nEl incumplimiento de las reglas puede provocar hasta el baneo del servidor.\n\nSi tienes alguna idea para mejorar el servidor, no dudes en dejarla en “sugerencia”, ¡suerte!')
    bot.channels.get('<ID>').send({
        title:'Nuevo usuario'
    })
    console.log(member)
});

bot.on('guildMemberRemove',(member)=>{
    console.log(member)
});

bot.on('warn', (e)=>{
    console.log(e)
});

bot.on('error', (e)=>{
    console.log(e)
});

bot.on('guildMemberRemove',(member)=>{

});

bot.on('channelCreate',(channel)=>{
    if(channel.type === 'category'|| channel.type === 'text') return;
       let ChannelDelete = setTimeout(()=>{
            channel.delete();
       },60000);
       newChannels.set(channel.id, ChannelDelete);
});

bot.on("voiceStateUpdate", (oldMember, newMember) => {
    if(newChannels.has(newMember.voiceChannelID)){
    clearTimeout(newChannels.get(newMember.voiceChannelID));
     newChannels.delete(newMember.voiceChannelID);
    };

if(oldMember.voiceChannelID){
    if(!oldMember.voiceChannel.name)return;
    if(!ChannelName.some(channel=> oldMember.voiceChannel.name.substr(0,oldMember.voiceChannel.name.indexOf('#')) === channel)) return;
        let Voice = oldMember.voiceChannel
        if(!Voice)return;
        if(Voice.members.map(g=>g.user).length === 0)return Voice.delete();
    };
});

bot.on('message', async message =>{

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(spam.some(p => message.content.toLowerCase().includes(p.toLowerCase())))
    return message.delete().then(()=>{
      let cmd = user_kick.get(message.author.id)
     if(cmd == undefined){
        user_kick.set(message.author.id, 1)
        message.author.send('No esta permitido el SPAM de otros canales de Discord,si sigues publicandolo podrias terminar kickeado.')
        setTimeout(()=>{
            user_kick.delete(message.author.id)
        },86400000);
     }else{
        user_kick.set(message.author.id, cmd+1)
        if(cmd > 1 && cmd < 4){
            message.author.send('Has sido kickeado.').then(()=>{
                message.member.kick();
            })
        }else if (cmd > 3){
            message.author.send('Has sido baneado.').then(()=>{
                message.member.ban({days:1,reason:'SPAM'})
            });
        };
     }
    });

    if(badlist.some(p => message.content.toLowerCase().includes(p.toLowerCase())))
    return message.delete();

    let messageArray = message.content.split(/\s+/g);
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let prefix = multiprefix.find(r => command.startsWith(r));

    if(!prefix) return;
    if(message.channel.id !== '411677487257354242'){
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        };

    
    let cmd = bot.commands.get(command.slice(1))
    if(cmd) cmd.run(bot, message, args);

});

bot.login(Settings.token);