const { MessageEmbed } = require("discord.js");
const config = require("../../Configs/serverConfig");

module.exports.run = async (bot, message, args) => {
  
  let offline = message.guild.members.cache.filter(x => x.presence?.status === "offline").size + message.guild.members.cache.filter(x => !x.presence).size
  
 let embed = new MessageEmbed()
    .setAuthor({ name: `${message.member.nickname || message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })
    .setDescription(`
• Sunucumuzda toplam **${message.guild.memberCount}** kullanıcı bulunmaktadır.
• Aktif **${message.guild.memberCount - offline}** kullanıcı bulunmaktadır.
• Ses Kanallarında **${message.guild.members.cache.filter(x => config.staffRoles.map(z => x.roles.cache.get(z))).filter(x => x.voice.channel).size}** yetkili bulunmaktadır.
• Ses Kanallarında **${message.guild.members.cache.filter(x => x.voice.channel).size}** kullanıcı bulunmaktadır.
• Sunucumuzda toplam **${message.guild.premiumSubscriptionCount}** boost bulunmaktadır.`)
    .setColor("#ff0000")
 
  message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
  
};
module.exports.conf = {
  name: "say",
  aliases: [],
};
