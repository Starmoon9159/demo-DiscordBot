const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
	try {
		console.log(`開始加載指令，目前已找到 ${commands.length}個斜線指令.`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`成功加載到 ${data.length}個斜線(/)指令:)`);
	} catch (error) {
		console.error(error);
	}
})();