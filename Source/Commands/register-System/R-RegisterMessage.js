const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { developersID } = require("../../Configs/botConfig")
const config = require("../../Configs/serverConfig");

module.exports.run = async (bot, message, args) => {
  
  if (!developersID.includes(message.author.id)) return;
  
 let button = new MessageButton()
    .setLabel("Kayıt Ol")
    .setStyle("PRIMARY")
    .setCustomId("register")
  
 let embed = new MessageEmbed()
    .setTitle("DR Roleplay Kayıt Ol!")
    .setDescription(`Kayıt Olmak için **Butona** Tıklayın!`)
    .setFooter({ text: "Developed by ✩ Nova Td#6486 berke selam ", iconURL: message.guild.iconURL({ dynamic: true }) })
    .setColor("RANDOM")
 
  message.channel.send({ embeds: [embed], components: [new MessageActionRow({ components: [button] })] })
  
};
module.exports.conf = {
  name: "mesaj",
  aliases: [],
};
