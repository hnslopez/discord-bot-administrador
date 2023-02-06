const champions = require('./champions.json');

/**
 * 
 * const { Kayn, REGIONS} = require('kayn')
const kayn = Kayn('-------------------')({
	region:REGIONS.LATIN_AMERICA_SOUTH,
    locale: 'es_AR',
    requestOptions: {
        shouldRetry: true,
        numberOfRetriesBeforeAbort: 3,
        delayBeforeRetry: 1000,
        burst: false,
        shouldExitOn403: false,
    }
})
const regions = {'LAS':REGIONS.LATIN_AMERICA_SOUTH,'LAN':REGIONS.LATIN_AMERICA_NORTH}

 * 
 */

module.exports.run = async (bot, message, args) => {
 let region = regions[args.shift()];

 kayn.SummonerV4.by.name(args.join(' ')).region(region).callback(function(err, summoner) {
    console.log(summoner)
         //message.channel.send(`${summoner.name}\n${new Date(summoner.revisionDate)}\nLevel:${summoner.summonerLevel}\nQueue:${positions[0].queueType}\nTier: ${positions[0].tier} ${positions[0].rank}`)

  });
 
// console.log(kayn.Champion.Rotation) 
/*
var name = args[0][0].toUpperCase()+args[0].slice(1)
if(args[1])name = name+' '+args[1][0].toUpperCase()+args[1].slice(1)
console.log(name)
 */





// for( key in champions){
//     if(champions[key].name.toLowerCase() === args.join(' ').toLowerCase() || champions[key].alias.toLowerCase() === args.join(' ').toLowerCase()){
//     let champion = champions[key].alias;
// kayn.DDragon.Champion.getDataById(champion).callback(function(err, summoner) {
//     console.log(summoner.data[champion])
// });

//     }
// };

}


module.exports.help = { 
	name:"-"
	
}