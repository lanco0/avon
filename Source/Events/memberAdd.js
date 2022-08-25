const {
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const config = require("../Configs/serverConfig")
const emojiConfig = require("../Configs/emojiConfig")
const moment = require("moment")
require("moment-duration-format")
const bot = global.client;

module.exports = async member => { 
 if (!member.user.bot) {
  const kurulus = Date.now() - member.user.createdTimestamp
  const gün = moment.duration(kurulus).format("D");
     
  var güvenlik;
  if (gün.replace(/,/g, "") < config.gün) güvenlik = emojiConfig.uyarı + " __Şüphelisin!__";
  if (gün.replace(/,/g, "") > config.gün) güvenlik = emojiConfig.onaylandı + " __Güvenlisin!__";

    await member.setNickname(config.unRegisterName.replace("-name-", member.user.username)).catch(e => {})
    await member.roles.add(config.unRegisterRoles.map(x => x)).catch(e => {})
   
  let gif = config.gifler[Math.floor(Math.random() * config.gifler.length)];
  let kanal = await bot.channels.cache.get(config.joinChannel)
  let aylar = bot.moons

  let kuruluş = `${moment(member.user.createdTimestamp).format("DD")} ${aylar[moment(member.user.createdTimestamp).format("MM")]} ${moment(member.user.createdTimestamp).format("YYYY")}`;
  
  let embed = new MessageEmbed()
   .setTitle(`Welcome To Server`)
   .setDescription(`
${emojiConfig.mkelebek} Sunucumuza Hoş Geldin ${member}!
    
${emojiConfig.dance}  Seninle Birlikte **__${member.guild.memberCount}__** Kişi Olduk!
   
${emojiConfig.safe}  Hesabın **__${kuruluş}__** Tarihinde Kurulmuş! **${güvenlik}**
    
${emojiConfig.ay}  Kaydının Yapılması İçin Sesli Odalara Geçip Ses Vermen Gerekiyor!

${emojiConfig.ünlem} Tagımız (\`${config.tag}\`) ismine alarak bize destek olabilirsin! 
   
${emojiConfig.mbit}  **Kaydının Yapılması İçin __<@&${config.staffRoles.join(">, <@&")}>__ Seninle İlgilencektir!**
`)
   .setImage(gif)
   .setColor("#8387DE")
  

   
  }
};
module.exports.conf = {
  name: "guildMemberAdd"
};
 