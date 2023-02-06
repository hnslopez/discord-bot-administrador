const Discord = require('discord.js');
const fetch = require('node-fetch');
var channels = [
{stream_name:'carritoskami',stream_type:true,stream_time:+new Date()},
{stream_name:'menostrece',stream_type:true,stream_time:+new Date()},
{stream_name:'manutegaming',stream_type:true,stream_time:+new Date()},
{stream_name:'g4g_revenant',stream_type:true,stream_time:+new Date()},
{stream_name:'cabravoladora',stream_type:true,stream_time:+new Date()},
{stream_name:'lolesportslas',stream_type:true,stream_time:+new Date()},
{stream_name:'lolesportsla',stream_type:true,stream_time:+new Date()},
];
const hook = new Discord.WebhookClient('<ID>','<TOKEN>')
var n = 0;
module.exports.run = async(bot) =>{

    function RSS(rss){
        return new Promise(function(resolve,reject){
    fetch(rss).then(res => res.text()).then(body => 
        resolve(JSON.parse(body))
        ).catch(err => console.error(err))
    })
};

setInterval(()=>{
    RSS(`https://api.twitch.tv/kraken/streams/${channels[n].stream_name}?client_id=1o14l3nu9dw3hs4nm2812kgpx8redx`).then(r=> twitch(r));
},5000)
function twitch(info){
    if(!info.stream && channels[n].stream_type == true){
    if(+new Date() < channels[n].stream_time+60*1000*30){
        channels[n].stream_type = false;
        channels[n].stream_time = +new Date();
    };
}else if(info.stream && channels[n].stream_type == false){
    if(+new Date() < channels[n].stream_time+60*1000*30) return channels[n].stream_type = true;

    channels[n].stream_type = true;
    channels[n].stream_time = +new Date();
    hook.send({embeds:[{
    title:`${info.stream.channel.display_name} ha iniciado su transmision`,
    url:`${info.stream.channel.url}`,
    color:9442302,
    description:`${info.stream.channel.status}`,
    thumbnail:{
        url:info.stream.channel.logo
    },
    fields:[{
        name:`viewers`,
        value:`${info.stream.viewers}`,
        inline:true
    }],
    image:{
        url:` ${info.stream.preview.template.slice(0,-20)}1280x720.jpg`
    }
}]});


};
n+=1
if(n === channels.length){
    n=0;
}

};

}

