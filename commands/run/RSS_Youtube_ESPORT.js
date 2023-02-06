const fetch = require('node-fetch');
const Riot = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC-I8d_BjKP6MMsYjZhAtjIA';
const parseString = require('xml2js').parseString;
const Discord = require('discord.js')
const hook = new Discord.WebhookClient('<ID>','<API>')
var save = new Array();

module.exports.run = async(bot) =>{
  
  function Youtube(){
  return new Promise(function(resolve,reject){
    fetch(Riot).then(res => res.text()).then(body => 
      parseString(body, function(err, result){
        resolve(result)
        })
      );
  }); 
}

function public(result){
  if(save[0] === undefined) {
    save = result.feed.entry.map(g =>g.id[0])
  };

  for(var i = 0 ;i < 5 ; i++ ){
    if(!save.includes(result.feed.entry.map(g =>g.id[0])[i])){
    hook.send({
      embeds: [{
          title:`${result.feed.entry.map(g =>[g['media:group'][0]['media:title'],g['media:group'][0]['media:description']])[i][0][0]}`,
          url:`${result.feed.entry.map(g=>[g][0])[i].link[0]['$'].href}`,
      description:`${result.feed.entry.map(g =>[g['media:group'][0]['media:title'],g['media:group'][0]['media:description']])[i][1][0]}`,
        image:{
          url:`https://img.youtube.com/vi/${result.feed.entry.map(g =>[g])[i][0]['yt:videoId'][0]}/maxresdefault.jpg`
        },
        timestamp: new Date()
       }]
     });
      save.unshift(result.feed.entry.map(g =>g.id[0])[i]) 
    };
  };
 
};
setInterval(()=>{
  Youtube().then(r=>{
    public(r);
  });
},30000);
}