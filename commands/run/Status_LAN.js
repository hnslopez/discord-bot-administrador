'use strict';
const fetch = require('node-fetch');
const servers = require('./Settings.json')
const status = {"online":"En Linea","offline":"Apagado","warn":"Advertencia","error":"Error","info":"Comunicado","Game":'Game','Store':'Tienda','Website':'Website','Client':'Cliente'}
const channel = '<ID>';
const colores = {"warn":"16725044","error":"16384001","info":"4220372"}
var id_delay,id_delay_all,messsage_delay,server_status_delay;

module.exports.run = async(bot) =>{
    return;
    let alert = bot.channels.get('<ID>');
    let Game = await bot.channels.get(`${channel}`).send(`...`)
    let Store = await bot.channels.get(`${channel}`).send(`...`)
    let Website = await bot.channels.get(`${channel}`).send(`...`)
    let Client =  await bot.channels.get(`${channel}`).send(`...`) 


setTimeout(()=>{
    setTimeout(()=>{
        bot.channels.get(channel).bulkDelete(10);
        clearInterval(restart)
    
    },120000)
    
    var restart = setInterval(()=>{
    RSS(servers.status.Lan).then(info => resolv(info))
    },10*1000)
    
},5000)





function RSS(rss){
        return new Promise(function(resolve,reject){
    fetch(rss).then(res => res.text()).then(body => 
        resolve(JSON.parse(body))
        ).catch(err => console.error(err))
    })
};


function resolv(info){
if(!info)return;
const rol = bot.guilds.get('411677487257354240').roles.find( rol=> rol.name === 'Notificación');
let infor = info.services.map(g=>[g.name,g.status,g.incidents]);
let field_info = new Array(new Array(),new Array(),new Array(),new Array());
let id =  new Array();
let messsage = new Array();
let colors = new Array();
let id_all = new Array();
let server_status = new Array();


for(var i = 0; i < 4;i++){
    messsage[i] = new Array();
          id[i] = new Array();
      colors[i] = new Array('56837');
      server_status[i] = infor[i][1];
    for(var x = 0; x < infor[i][2].length; x++){
        colors[i][x] = colores[infor[i][2][x].updates[0].severity];
        id[i][x] = new Array();
        messsage[i][x] = new Array();
        for(var z = 0; z < infor[i][2][x].updates.length;z++){
            id_all.push(infor[i][2][x].updates[z].id);
            id[i][x][z] = infor[i][2][x].updates[z].id
            messsage[i][x][z] = [infor[i][2][x].updates[z].severity,infor[i][2][x].updates[z].content] 
            if(z == 0){

                field_info[i].push({
                    "name":`Tipo de Notificación: ${status[infor[i][2][x].updates[z].severity]}`,
                    "value":`${infor[i][2][x].updates[z].content}`
                });
            }else{
                field_info[i].push({
                    "name":"```"+`\nAnuncio Anterior `+"```",
                    "value":"```"+`${infor[i][2][x].updates[z].content}`+"```"
            });
        };

    };
};
if(infor[i][1] == 'offline') colors[i].unshift("10485766")
};


    Game.edit({embed:embeds(0)});
    Store.edit({embed:embeds(1)});
    Website.edit({embed:embeds(2)});
    Client.edit({embed:embeds(3)});


function Update(){
    setTimeout(()=>{
        id_delay_all = id_all;
        id_delay = id;
        messsage_delay = messsage;
        server_status_delay = server_status;
    },5000);
};

if(!id_delay){
    id_delay_all = id_all;
    id_delay = id;
    messsage_delay = messsage;
    server_status_delay = server_status;
};

function embeds(n){
    return {
        color: colors[n][0],
        author:{
            name:`${status[infor[n][0]]}`
        },
        title:'Estado: '+'`'+status[infor[n][1]]+'`',
        fields:field_info[n]
    };
};

for (var y = 0;y< id.length; y++){
    for (var x = 0; x< id[y].length; x++){
        for (var z = 0; z< id[y][x].length ;z++){
                if(id_delay_all.includes(id[y][x][z])){
                }else{
                        Update();

                if(!id[y][x][1]){
                        alert.send(`${rol}`,{embed:{
                            color:`${colores[messsage[y][x][z][0]]}`,
                            author:{
                                name:'Nuevo Mensaje'
                            },
                            fields:[{
                                name:'Tipo',
                                value:` ${status[messsage[y][x][z][0]]}`
                            },{
                                name:'Contenido',
                                value:`${messsage[y][x][z][1]}`
                            }]
                        }});

                    }else{
                        Update();

                        alert.send(`${rol}`,{embed:{
                            color:'16744448',
                            author:{
                                name:'Mensaje Actualizado',
                            },
                            fields:[{
                                name:'Tipo',
                                value:`${status[messsage[y][x][z][0]]}`
                            },{
                                name:'Contenido',
                                value:`${messsage[y][x][z][1]}`
                            }]
                        }});
                    };
                }; 
        };
    };

    for (var x = 0; x< id_delay[y].length; x++){
        for (var z = 0; z< id_delay[y][x].length ;z++){
                if(id_all.includes(id_delay[y][x][z])){

                }else{
                    Update();

                alert.send({embed:{
                    color:'16711680',
                    title:'Mensaje Eliminado',
                    fields:[{
                        name:'Tipo',
                        value:` ${status[messsage_delay[y][x][z][0]]}`
                    },{
                        name:'Contenido',
                        value:`${messsage_delay[y][x][z][1]}`
                    }]

                }});

            };
        };
    };   
};

if(server_status[0] !== server_status_delay[0]){
    if(server_status[0] == 'offline' && server_status[1] == 'offline' && server_status[3] == 'offline'){
        alert.send(`${rol}`,{embed:
            {
                color: '16743680',
                         author: {
                                  name: `Mantenimiento en Progreso`
                                },
                        description: `El juego no estará disponible durante un tiempo mientras llevamos a cabo tareas de mantenimiento`,
                        
                            }
                        });
                        server_status_delay = server_status;
    }else if(server_status[0] == 'online' && server_status[1] == 'online' && server_status[3] == 'online'){
                alert.send(`${rol}`,{embed:
                    {
                        color: '327531',
                                 author: {
                                          name: `Mantenimiento Finalizado`
                                        },
                                   description: `¡El servidor ya está en funcionamiento!`
            
                              }});
                        server_status_delay = server_status;

        };
    };
};
}