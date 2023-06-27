const { SlashCommandBuilder } = require('discord.js')
const { execute } = require('./ping')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('幫你到google找東西')
    .addStringOption(option =>
        option.setName('content')
            .setDescription('請輸入關鍵字')
            .setRequired(true)
        ),
    
    async execute(interaction) {
        const content = interaction.options.getString('content')
        console.log(interaction.user.tag)
        const urlEEEEEEe = 'https://www.google.com/search?q=' + content
        const E = urlEEEEEEe.toString()
        console.log(E)
        interaction.reply({content:'https://www.google.com/search?q='+ content , ephemeral: true})
    }
}