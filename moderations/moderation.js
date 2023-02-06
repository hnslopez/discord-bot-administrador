var user_kick = new Map();
var user_mute = new Map();

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
    console.log(cmd)
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
return message.delete().then(()=>{
  let cmd = user_mute.get(message.author.id)
 if(cmd == undefined){
    user_mute.set(message.author.id, 1)
    message.author.send('Este tipo de palabras no estan permitidas, si sigues publicandolas podrias terminar muteado.')
    setTimeout(()=>{
        user_mute.delete(message.author.id)
    },86400000);
 }
});