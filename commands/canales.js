const RomanNumber = {
    '1':'I',
    '2':'II',
    '3':'III',
    '4':'IV',
    '5':'V',
};
const InRoman ={
    'I':'1',
    'II':'2',
    'III':'3',
    'IV':'4',
    'V':'5',
};

const types = {
    'flex':{
        name:`Clasificatoria Flex#`,
        limit:5,
        ch_create:1,
        ch_reserv:[9,10,11,12],
        ch_ready:function(guild){
            return guild.channels.filter(channel=> channel.name.substr(0,channel.name.indexOf('#')+1) === this.name).map(g=> g.name.substr(g.name.indexOf('#')+1, g.name.length))
        },
        fullname:function(Num){
            return this.name + RomanNumber[Num];   
                }
    },'solo':{
        name:`Clasifi... Solo/Duo#`,
        limit:2,
        ch_create:1,
        ch_reserv:[25,26,27,28],
        ch_ready:function(guild){
            return guild.channels.filter(channel=> channel.name.substr(0,channel.name.indexOf('#')+1) === this.name).map(g=> g.name.substr(g.name.indexOf('#')+1, g.name.length))
        },
        fullname:function(Num){
            return this.name + RomanNumber[Num];   
                }
    },'normal':{
        name:`Normal#`,
        limit:5,
        ch_create:1,
        ch_reserv:[13,14,15,16],
        ch_ready:function(guild){
            return guild.channels.filter(channel=> channel.name.substr(0,channel.name.indexOf('#')+1) === this.name).map(g=> g.name.substr(g.name.indexOf('#')+1, g.name.length))
        },
        fullname:function(Num){
            return this.name + RomanNumber[Num];   
                }
    },'reclutamiento':{
        name:`Reclutamiento #`,
        limit:5,
        ch_create:1,
        ch_reserv:[17,18,19,20],
        ch_ready:function(guild){
            return guild.channels.filter(channel=> channel.name.substr(0,channel.name.indexOf('#')+1) === this.name).map(g=> g.name.substr(g.name.indexOf('#')+1, g.name.length))
        },
        fullname:function(Num){
            return this.name + RomanNumber[Num];   
                }
    },'aram':{
        name:`Aram #`,
        limit:5,
        ch_create:1,
        ch_reserv:[21,22,23,24],
        ch_ready:function(guild){
            return guild.channels.filter(channel=> channel.name.substr(0,channel.name.indexOf('#')+1) === this.name).map(g=> g.name.substr(g.name.indexOf('#')+1, g.name.length))
        },
        fullname:function(Num){
            return this.name + RomanNumber[Num];   
                }
    },'general':{
        name:`General #`,
        limit:0,
        ch_create:1,
        ch_reserv:[5,6,7,8],
        ch_ready:function(guild){
            return guild.channels.filter(channel=> channel.name.substr(0,channel.name.indexOf('#')+1) === this.name).map(g=> g.name.substr(g.name.indexOf('#')+1, g.name.length))
        },
        fullname:function(Num){
            return this.name + RomanNumber[Num];   
         }
    }
};
var cooldown = new Set();

module.exports.run = async (bot, message, args) => {
	if(cooldown.has(message.author.id))return message.channel.send(message.author+'Debes esperar 1 minuto para volver a ocupar este comando');
		cooldown.add(message.author.id)
		setTimeout(()=>{
			cooldown.delete(message.author.id);
		},60000);

    let guild = message.guild;
    let category = guild.channels.find(channel => channel.name === 'Canales de voz')
    let user_roles = message.member.roles.map(g=>g.name)
    let channel_type;
    user_roles.shift()  
        
    if(!args[0]){
        if(!message.member.permissions.has('ADMINISTRATOR')){
            return message.channel.send('No existe este tipo de Canal');    
        }else{
        channel_type = 'general';  
        };
    
    }else{
        channel_type = args[0].toLowerCase();
    }
    if(!types[channel_type]) return message.channel.send('No existe este tipo de Canal');

    let ChannelsON = types[channel_type].ch_ready(guild);
    let ChannelChild = category.children;
    let NumberInChannel;

    for(var i = 1; i < 5;i++){
        if(i === 5) types[channel_type].ch_create = 10; 
            if(!ChannelsON.includes(RomanNumber[i])){
                NumberInChannel = i;
                types[channel_type].ch_create = ChannelsON.length
                break;
            };
    };
    
if(types[channel_type].ch_create > 3)return message.channel.send('Se han creado la cantidad maximas de canales de este tipo');  
 guild.createChannel(types[channel_type].fullname(NumberInChannel), 'voice')
     .then(move =>{
        mover(move)
 });

function mover(channel){
 let ChannelFound = ChannelChild.filter(ch => ch.name.substr(0,ch.name.indexOf('#')+1) === types[channel_type].name);
    channel.setParent(category);
    if(ChannelFound.map(g=>g.name).length > 0){
        let channelList = ChannelFound.map(g=>[g.name.substr(g.name.indexOf('#')+1,g.name.length),g.position])
         let channelsName = [];
         channelList.forEach((x,i)=>{
             channelsName.push(x[0]);
     });
     for(i in InRoman){
       
        if(!channelsName.includes((i))){
            switch(i){
                case 'I':
                channel.edit({'position':types[channel_type].ch_reserv[0],
                'userLimit':types[channel_type].limit,
                'permissionOverwrites': permission(channel)});
                break;
                case 'II':

                channel.edit({'position':types[channel_type].ch_reserv[1],
                'userLimit':types[channel_type].limit,
                'permissionOverwrites': permission(channel)});
                break;
                case 'III':
                channel.edit({'position':types[channel_type].ch_reserv[2],
                'userLimit':types[channel_type].limit,
                'permissionOverwrites': permission(channel)});
                break;
                case 'IV':
                channel.edit({'position':types[channel_type].ch_reserv[3],
                'userLimit':types[channel_type].limit,
                'permissionOverwrites': permission(channel)});
                break;
            }
            break;
            };
        };
     }else{
    channel.edit({'position':types[channel_type].ch_reserv[0],
                    'userLimit':types[channel_type].limit,
                    'permissionOverwrites': permission(channel)
                    });
     };

     function permission(channel){
         if(channel_type === 'general'){
        let roles = message.guild.roles.map(rol => rol.name);
        roles.shift();
        roles.forEach((x,i)=>{
            let rol = message.guild.roles.find(channel => channel.name === roles[i])
            channel.overwritePermissions(rol,{ 
            VIEW_CHANNEL:true,
                CONNECT:true,
                SPEAK:true,
            USE_VAD:true
             });
             
        });
         }else{
            user_roles.forEach((x,i)=>{
                let rol = message.member.guild.roles.find(channel => channel.name === user_roles[i])
    
                channel.overwritePermissions(rol,{
                VIEW_CHANNEL:true,
                    CONNECT:true,
                    SPEAK:true,
                USE_VAD:true
                 });
            });
         };

     }

     message.channel.send(` ${message.author}Se ha creado el canal `+ '**'+types[channel_type].fullname(NumberInChannel)+'**')
    types[channel_type].ch_create += 1;
};


}

module.exports.help = {
name:'canal'
}