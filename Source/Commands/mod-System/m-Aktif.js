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
      `Wizardry Roleplay Giriş bilgilerimiz ;

* Sunucu Bilgileri *

* Sunucu İP Adresi: 51.77.77.237:27015
* TeamSpeak 3 Adresi: cosmic.tssunucusu.com yurtdışı eu882.tsgiris.com
* Tıkla ve Bağlan! steam://connect/51.77.77.237:27015

Sunucumuz aktif ve roller başlıyor herkesi bekliyoruz ❤️ `
    )
    .setImage("")
    .setColor("RANDOM");

  message.channel.send({ embeds: [embed] });
};
module.exports.conf = {
  name: "aktif",
  aliases: [],
};
