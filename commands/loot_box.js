const Random = require('random-js');
const Chance = [['Fragmento de Aspecto',50],['Fragmento de Campeón',25],['Gesto permanente',10],['Fragmento de Aspecto de Centinela + 150 de Esencia Naranja adicional',11.5],['Fragmento de Ícono de Invocador + 150 de Esencia Naranja adicional',3.5],['Gema',3.6],['Cofre adicional + Llave',10]]
//esencia azul 200 -150 , champions 1 - 2

module.exports.run = async (bot, message, args) => {
    let num = args[0];
    if(isNaN(num)){
        num = 1;
    };
if(num > 4)num = 3;
for(var m = 0; m < num;m++){
    var loot = new Array()
    for( i in Chance){
        let random = new Random(Random.engines.mt19937().autoSeed());
        let value = random.integer(1, 100);

        if(Chance[i][1] >= value){
            loot.push(Chance[i][0])
        };
    };

if(loot.length == 0){

loot.push(Chance[1][0])
let random = new Random(Random.engines.mt19937().autoSeed());
let value = random.integer(1, 100);
if(Chance[1][1] >= value){
    loot.push(Chance[1][0])
    };

let value2 = random.integer(1,100);
if(50 >= value2){
    if(50 >= value){
        loot.push('Esencia Azul - 200')
    }else{
        loot.push('Esencia Azul - 150')
        };
    };
}

message.channel.send(loot.join(', '))
};
}

module.exports.help = { 
	name:"loot"
	
}