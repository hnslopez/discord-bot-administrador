module.exports.run = async(bot) =>{
 return;
let message = bot.channels.get('<ID>')
message.bulkDelete(10);
var exclusive = new Array(new Array(),new Array(),new Array(),new Array())
let name = new Array(bot.guilds.get('<ID>').channels.map(g=>g.name));

name[0].forEach((x,i)=>{
if(x.indexOf('las') >= 0){
exclusive[0].push(x)
}else if(x.indexOf('latam') >= 0){
exclusive[1].push(x)
}else if(x.indexOf('lan') >= 0){
exclusive[2].push(x)
}else if(x.indexOf('euw') >= 0){
exclusive[3].push(x)
};
});
message.send(`*Bienvenido al gestor de roles*\n`+`\n-Roles disponibles-\n`+'`Coloca un emoji en el rol que quieres tener`',
{embed:{
 
    color:'3447003',
    title:`Latino America Sur` ,
    description:'',
    fields:[{
        name:'Canales exclusivos',
        value: `\`\`\`md\n${exclusive[0].length}\n\`\`\``,
        inline: true
    },{
        name:'Canales compartidos',
        value: `\`\`\`md\n${exclusive[1].length}\n\`\`\``,
        inline: true
    }]
}})
message.send({embed:{

    color:'3447003',
    title:`Latino America Norte` ,
    description:'',
    fields:[{
        name:'Canales exclusivos',
        value: `\`\`\`md\n${exclusive[2].length}\n\`\`\``,
        inline: true
    },{
        name:'Canales compartidos',
        value: `\`\`\`md\n${exclusive[1].length}\n\`\`\``,
        inline: true
    }]
}})

message.send({embed:{
    
    color:'16053486',
    title:`Notificación` ,
    description:'Cada vez que se anuncie un error en los servidores\nde League of Legends recibirás una notificación.',
    fields:[{
        name:'Canales exclusivos',
        value: `\`\`\`md\n0\n\`\`\``,
        inline: true
    },{
        name:'Canales compartidos',
        value: `\`\`\`md\n0\n\`\`\``,
        inline: true
    }]

}})


}