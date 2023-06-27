const { SlashCommandBuilder, Options } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('rps')
        .setDescription('刷爆你的朋友吧!')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('請輸入你想要的內容')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('op')
                .setDescription('請輸入你要刷的次數')
                .setRequired(true)
        ),
    async execute(interaction) {
        const rpscontent = interaction.options.getString('content')
        const E = interaction.options.getString('op')
        for(i=0;i<E;i++){
              interaction.channel.send(rpscontent)
        }
          
    }
};