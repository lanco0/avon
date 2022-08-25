
const {
  MessageButton,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const emojiConfig = require("../../Configs/emojiConfig");
const config = require("../../Configs/serverConfig");

module.exports.run = async (bot, message, args) => {

 let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
 let istemci = "Ulaşılamıyor."
 let status = "Ulaşılamıyor."
 let presence = "Yok."
 let activities = []
 let number = 1
 
 if (user.presence) {  
  if (user.presence.clientStatus.mobile && user.presence.clientStatus.desktop && user.presence.clientStatus.web) istemci = "🖥️ Masaüstü, 🌐 Tarayıcı, 📱 Telefon"
   if (user.presence.clientStatus.mobile && user.presence.clientStatus.web) istemci = "🌐 Tarayıcı, 📱 Telefon"
    if (user.presence.clientStatus.desktop && user.presence.clientStatus.web) istemci = "🖥️ Masaüstü, 🌐 Tarayıcı"
     if (user.presence.clientStatus.mobile && user.presence.clientStatus.desktop) istemci = "🖥️ Masaüstü, 📱 Telefon"
      if (user.presence.clientStatus.web)  istemci = "🌐 Tarayıcı"
       if (user.presence.clientStatus.mobile)  istemci = "📱 Telefon"
        if (user.presence.clientStatus.desktop) istemci = "🖥️ Masaüstü"

  if (user.presence.status === "dnd") status = "🔴 Rahatsız Etmeyin"
     if (user.presence.status === "idle") status = "🟠 Boşta"
      if (user.presence.status === "online") status = "🟢 Çevrimiçi"
       if (user.presence.status === "offline") status = "🥷 Görünmez"

  if (user.presence.activities.join(" ")) {
   user.presence.activities.map(x => {
     if (x.id === "custom") return presence = x.state
      if (x.id === "spotify:1") return activities.push(`**${number++}.** Spotify'de \` ${x.details} \` Şarkısını dinliyor.`)
       activities.push(`**${number++}.** <t:${Math.floor(x.createdTimestamp / 1000)}:R> süredir \` ${x.name} \` ${(x.type).replace("PLAYING", "oynıyor.").replace("LISTENING", "dinliyor.").replace("STREAMING", "yayında.").replace("WATCHING", "izliyor.")}`)
    })
  }
 }

 let embed = new MessageEmbed()
   .addField("Kullanıcı Bilgisi ↷", `
   \`•>\` **ID:** ${user.id}
   \`•>\` **Kullanıcı Tagı:** ${user.user.tag}
   \`•>\` **Hesabın Açılma Tarihi:** <t:${Math.floor(user.user.createdTimestamp / 1000)}:f>
   \`•>\` **İstemci:** ${istemci}
   \`•>\` **Status:** ${status}  
   \`•>\` **Özel Durumu:** ${presence}
   \`•>\` **Aktiviyeteler:** ${activities.join("\n") ? "" : "Yok."}  
   ${activities.join("\n")}  
   `)
    .addField("Üye Bilgisi ↷", `
   \`•>\` **Sunucu İsmi:** ${user.nickname || "Yok."}
   \`•>\` **Sunucuya Katılma Tarihi:** <t:${Math.floor(user.joinedTimestamp / 1000)}:f>
   \`•>\` **Sunucudaki Rolleri(${user.roles.cache.filter(x => x.name !== "@everyone").size}):** ${user.roles.cache.filter(x => x.name !== "@everyone").sort((a, b) => b.rawPosition - a.rawPosition).map(x => x).slice(0, 5)}
   \`•>\` **Ses Durumu:** ${user.voice.channel ? user.voice.channel.name : "Seste değil."} 
   `)
  .setColor("#8387DE")
 
   message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
 
};
module.exports.conf = {
  name: "kullanıcıbilgi",
  aliases: ["kullanıcı-bilgi", "kb"],
};
