const { SlashCommandBuilder, Options, StringSelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const axios = require('axios').default
module.exports = {
    data: new SlashCommandBuilder()
        .setName('hentai')
        .setDescription('獲得一張瑟瑟的油圖(必須在nsfw頻道'),

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
                userdb_insert(user_name, user_id)
                const errembed = new EmbedBuilder()
                    .setTitle('Error 404')
                    .setColor('Red')
                    .setDescription('很抱歉，在我們的數據庫裡沒有找到您的資料，以為您創建新的資料')
                    .setFooter({ text: '．Not_liusha Team', iconURL: 'https://i.ibb.co/WcFP32Q/55-20220726135842.png' });
                interaction.reply({ embeds: [errembed] })
            }
            if (is_find === true) {
                if (user_money >= 100) {
                    var now_money = user_money - 100

                    if (interaction.channel.nsfw) {
                        axios.get('https://api.waifu.pics/nsfw/waifu').then((response) => {
                            let testembed = new EmbedBuilder()
                                .setTitle('你的18禁動漫油圖;D')
                                .setImage(`${response.data.url}`)
                                .setFields(
                                    { name: '來自', value: `${interaction.author}` }
                                )
                            interaction.reply({ content: `你花了100元買了張油圖,你現在只剩${now_money}` , embeds: [testembed], ephemeral: true })
                            userdb_update(user_id, now_money)
                        }
                        )
                    } else {
                        interaction.reply('請在nsfw頻道使用，如果沒有，請向你們的服主申請')
                    }
                } else {
                    interaction.reply('你的錢小於100。不足以使用此指令...')
                }


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