const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { execute } = require('./ping')
const { e } = require('../database')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('領取每日獎勵'),
    async execute(interaction) {
        var is_find = false
        const user_id = interaction.user.id;
        const user_name = interaction.user.tag;
        const guild_id = interaction.guild.id;
        db.users.find({}, function (err, docs) {
            for (var i = 0; i < docs.length; i++) {
                if (docs[i].username === user_name && docs[i].userid === user_id) {
                    var user_money = docs[i].money;
                    is_find = true
                    break;
                }
            }
            if (is_find === false) {
                userdb_insert(user_name, user_id, guild_id)
                const errembed = new EmbedBuilder()
                    .setTitle('Error 404')
                    .setColor('Red')
                    .setDescription('很抱歉，在我們的數據庫裡沒有找到您的資料，以為您創建新的資料')
                    .setFooter({ text: '．Not_liusha Team', iconURL: 'https://i.ibb.co/WcFP32Q/55-20220726135842.png' });
                interaction.reply({ embeds: [errembed] })
            }
            if (is_find === true) {
                var new_moeny = user_money + 100
                userdb_update(user_id, new_moeny)
                var money_embed = new EmbedBuilder()
                    .setTitle(`${user_name}`)
                    .setDescription(`你獲得了**100元**當做獎勵\n你現在有**${new_moeny}元**`)
                    .setColor('Blue')
                interaction.reply({ embeds: [money_embed] })
            }
        });
    }
}
function userdb_update(user_id, option2) {
    db.users.update({
        userid: user_id
    }, {
        $set: {
            money: option2
        }
    }, (err, ret) => { });
}
function userdb_insert(user_name, user_id, guild_id) {
    var doc = {
        giuld_id: guild_id,
        username: user_name,
        userid: user_id,
        money: 100
    }
    db.users.insert(doc, function (err, newDoc) { });
};