const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const emojiConfig = require("../Configs/emojiConfig")
const config = require("../Configs/serverConfig")
const bot = global.client;

module.exports = async (interaction) => {
  if (!interaction.isModalSubmit()) return;
  
  if (interaction.customId === "register_form") {
    const textInput1 = interaction.fields.getTextInputValue('register_1');
    const textInput2 = interaction.fields.getTextInputValue('register_2');
    const textInput3 = interaction.fields.getTextInputValue('register_3');
    const textInput4 = interaction.fields.getTextInputValue('register_4');
    const textInput5 = interaction.fields.getTextInputValue('register_5');
    
    await interaction.deferReply({ ephemeral: true });  
    
    if (!Number(textInput3)) {
      interaction.followUp({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Yaş kısmında **Sadece Sayı** belirtebilirsin.`,
        ephemeral: true,
      });
      
      return;
    }

    if (!Number(textInput5)) {
      interaction.followUp({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Garrsy Mod Saat kısmında **Sadece Sayı** belirtebilirsin.`,
        ephemeral: true,
      });
      
      return;
    }  
  
    let button1 = new MessageButton()
       .setStyle("PRIMARY")
       .setLabel("whitelist")
       .setCustomId("whitelist_" + interaction.user.id)
    
    let button2 = new MessageButton()
       .setStyle("SECONDARY")
       .setLabel("lady")
       .setCustomId("lady_" + interaction.user.id)
    
    let button3 = new MessageButton()
       .setStyle("DANGER")
       .setLabel("Reddet")
       .setCustomId("reddet_" + interaction.user.id)
    
    let embed = new MessageEmbed()
     .setTitle(emojiConfig.uyarı + " Yeni Form")
     .setDescription(`> ${interaction.user} kullanıcı yeni bir form gönderdi.`)
     .addField("Kullanıcı ↷", "```" + interaction.user.tag + "  |  " + interaction.user.id + "```", false)
     .addField("OOC İsim ↷", "```" + textInput1 + "```", false)
     .addField("IC İsim ↷", "```" + textInput2 + "```", false)
     .addField("Yaş ↷", "```" + textInput3 + "```", false)
     .addField("fivem Mod Saati ↷", "```" + textInput5  + "```", false)
     .addField("Steam Profil Linki ↷", `> [Tıkla!](${textInput4})`, false)
     .setColor("RED")
    
      interaction.followUp({
        content: `> ${emojiConfig.başarılı} **Başarılı!** Kayıt formunuz başarıyla gönderildi.`,
        ephemeral: true,
      });
    
     bot.channels.cache.get(config.formLog)?.send({ content: `<@&${config.staffRoles.join(">, <@&")}>`, embeds: [embed], components: [new MessageActionRow({ components: [ button1, button2, button3 ] })] }).catch((err) => {});
  }
};
module.exports.conf = {
  name: "interactionCreate",
};