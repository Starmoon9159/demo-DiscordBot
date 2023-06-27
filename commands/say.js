const { SlashCommandBuilder, Options } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('讓機器人說話!')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('要說的內容')
                .setRequired(true)
        ),
    async execute(interaction){
        const saycontent = interaction.options.getString('content')
        interaction.reply(saycontent)
    }

}