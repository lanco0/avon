const { MessageEmbed, Permissions } = require("discord.js");
const config = require("../../Configs/serverConfig");
const emojiConfig = require("../../Configs/emojiConfig");

module.exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR))
    return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Yönetici** yetkisine sahip olman gerekiyor!`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  let embed = new MessageEmbed()
    .setDescription(
      `Wizardry Hogwarts Roleplay 

Sunucumuz Bakıma Giriyor Sorun Çözülür Çözülmez En Kısa Zamanda Aktif Geçilicektir Anlayışınız İçin Teşşekürler. 

                                                                             Wizardry Yönetim `
    )
    .setImage("")
    .setColor("RANDOM");

  message.channel.send({ embeds: [embed] });
};
module.exports.conf = {
  name: "bakım",
  aliases: [],
};
