const { Events } = require('discord.js');
module.exports = {
   name:Events.MessageCreate,
   async execute(msg){
    console.log(`[${msg.guild.name}]${msg.author.username}: ${msg}`)
    if(msg.content ===('Ping')){
        msg.reply('Pong')
    }
   }
   
}