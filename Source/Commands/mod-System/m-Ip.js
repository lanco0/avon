const { MessageEmbed, Permissions } = require("discord.js");
const config = require("../../Configs/serverConfig");

module.exports.run = async (bot, message, args) => {
  let embed = new MessageEmbed()
    .setDescription(
     `Wizardry Roleplay Giriş bilgilerimiz ;

* Sunucu Bilgileri *

* Sunucu İP Adresi:51.77.77.237:27015 
* TeamSpeak 3 Adresi: cosmic.tssunucusu.com yurtdışı eu882.tsgiris.com
* Tıkla ve Bağlan! steam://connect/51.77.77.237:27015   ` 
    )
    .setImage("")
    .setColor("RANDOM");

  message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
};
module.exports.conf = {
  name: "ip",
  aliases: [],
};
