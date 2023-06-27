const { Events } = require('discord.js');
module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			console.error(`我沒u在我的資料庫裡找到${interaction.commandName}這個東東诶.`);
			return;
		}
		try {
			await command.execute(interaction);
            console.log(`${interaction.user.tag}在>>${interaction.channel.name}<<觸發了指令`)
		} catch (error) {
			console.error(`在執行${interaction.commandName}時發生了錯誤:cry:`);
			interaction.reply(`在執行${interaction.commandName}時發生了錯誤:cry:`)
			console.error(error);
		}
	},
};