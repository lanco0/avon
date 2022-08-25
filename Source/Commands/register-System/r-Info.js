const { MessageEmbed } = require("discord.js");
const registerData = require("../../Models/registerData");
const { prefixs } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");
const axios = require("axios");

module.exports.run = async (bot, message, args) => {

  const prefix = prefixs[0];
  
  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.member;

  let memberData = await registerData.findOne({
    guildID: message.guild.id,
    userID: member.id
  });

  let endRegister = memberData && memberData.endRegisterUserID;
  let msg = `> Toplam **[0]** kişi kaydetmiş **[1]** whitelist, **[2]** lady.`
      
  if (endRegister) {
    axios({
      method: "GET",
      url: `https://discord.com/api/v8/users/${memberData.endRegisterUserID}`,
      headers: {
        Authorization: `Bot ${bot.token}`
      }
    }).then(response => {
      let user = response.data; 
      const embed = new MessageEmbed()
        .setColor("#8387DE")
        .setTitle(`${emojiConfig.cupter} Teyit Bilgiler`)
        .setDescription(msg
              .replace("[0]", memberData ? `${(memberData.whitelistRegisterNumber || 0) + (memberData.ladyRegisterNumber || 0)}`: `0`)
              .replace("[1]", memberData ? memberData.whitelistRegisterNumber || 0 : 0)
              .replace("[2]", memberData ? memberData.ladyRegisterNumber || 0 : 0))
        .addField("Son Kaydedilen Üye ↷", `> [${user.username}#${user.discriminator} ( ${user.id} )](https://discord.com/users/${user.id})`);

      message.reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false }
      }).catch((err) => {});
    });
  } else {
    const embed = new MessageEmbed()
      .setColor("#8387DE")
      .setTitle(`${emojiConfig.cupter} Teyit Bilgiler`)
      .setDescription(msg
              .replace("[0]", memberData ? `${(memberData.whitelistRegisterNumber || 0) + (memberData.ladyRegisterNumber || 0)}`: `0`)
              .replace("[1]", memberData ? memberData.whitelistRegisterNumber || 0 : 0)
              .replace("[2]", memberData ? memberData.ladyRegisterNumber || 0 : 0))
      .addField("Son Kaydedilen Üye ↷", "```" + "Bulunamadı!" +"```");

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } }).catch((err) => {});
  }
};

module.exports.conf = {
  name: "teyit-bilgi",
  aliases: ["tb", "info", "information", "kayıtbilgi", "kayıt-bilgi"]
};
