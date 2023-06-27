const { SlashCommandBuilder, EmbedBuilder} = require('discord.js')
const moewclient = require('nekos.life')
const neko = new moewclient();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('neko')
        .setDescription('隨機的貓娘圖片'),
    async execute(interaction) {
        var is_find = false
        const user_id = interaction.user.id;
        const user_name = interaction.user.tag;
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
                if (user_money >= 50) {
                    var now_money = user_money - 50

                   
                    neko.neko().then((neko) => {
                        let nekoembed = new EmbedBuilder()
                            .setTitle('你的動漫貓貓;D')
                            .setImage(neko.url)
                        interaction.reply({content:`你花了50元買了張很香的圖片，你只剩${now_money}`, embeds: [nekoembed], ephemeral:true })
                        userdb_update(user_id, now_money)
                    })
                    
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