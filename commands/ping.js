const { SlashCommandBuilder, Options, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('回復Pong!'),

    async execute(interaction) {

        const sent = await interaction.reply({ content: '正在用我的小腦袋運算中...', fetchReply: true });
        wait(2000)
        interaction.editReply(`機器人延遲: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    }
};