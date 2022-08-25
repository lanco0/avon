const { Permissions, MessageEmbed, Role } = require("discord.js");
const { prefixs } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");
const config = require("../../Configs/serverConfig");
const registerModel = require("../../Models/registerData");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {

  const prefix = prefixs[0];
  var staffRole = config.staffRoles

  let member =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  let isim = args[1];
  let yaş = args[2];


  /* ----- */
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    if (!config.staffRoles.some(x => message.member.roles.cache.has(x)))
      return message
        .reply({
          content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Yönetici** veya **Kayıt Yetkisi** rolüne sahip olman gerekiyor!`,
          allowedMentions: { repliedUser: false }
        })
        .catch(err => {});
  }

  /* ----- */
  if (!member)
    return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Bir üye belirtmelisin!`,
        allowedMentions: { repliedUser: false }
      })
      .catch(err => {});


  let registerData = await registerModel.findOne({ guildID: message.guild.id, userID: member.user.id })
  let data = await registerData && registerData.registerObject
  
  if (!data)
   return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Belirtilen kullanıcı bu sunucuda hiç kayıt edilmemiş!`,
        allowedMentions: { repliedUser: false }
      })
      .catch(err => {});
  
  let staff = message.guild.members.cache.get(data.staffID)
  let aylar = bot.moons
  let kuruluş = `${moment(data.time).format("DD")} ${aylar[moment(data.time).format("MM")]} ${moment(data.time).format("YYYY")} ${moment(data.time).format("HH:mm")}`;
  
  let embed = new MessageEmbed()
     .setTitle(`${emojiConfig.tosun} Kayıt Bilgi`)
     .setDescription(`> ${member} Kullanıcısının son kayıt bilgileri `)
     .addField("Üye ↷", "```" + member.user.username + " | " + member.id + "```")
     .addField("Yetkili ↷", "```" + staff.user.username + " | " + staff.id + "```")
     .addField("Kayıt Tarihi ↷", "```" + kuruluş + "```")
     .addField("Kayıt Cinsiyeti ↷", "```" + data.type + "```", true)
     .addField("Kayıt İsmi ↷", "```" + data.name + "```", true)
     .setColor("#8387DE")
  
  message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
};

module.exports.conf = {
  name: "kayıtbilgi",
  aliases: ["kayıt-bilgi"]
};
