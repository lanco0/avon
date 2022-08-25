const { MessageActionRow, Modal, TextInputComponent, MessageEmbed, Permissions } = require('discord.js');
const registerData = require("../Models/registerData");
const emojiConfig = require("../Configs/emojiConfig")
const config = require("../Configs/serverConfig")
const bot = global.client;

module.exports = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId.split("_")[0] === "whitelist") {
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (!config.staffRoles.some(x => interaction.member.roles.cache.has(x)))
        return interaction
          .reply({
            content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Yönetici** veya **Kayıt Yetkisi** rolüne sahip olman gerekiyor!`,
            ephemeral: true
          })
          .catch(err => {});
    }
   
    await interaction.deferReply({ ephemeral: true });  
    
   let member = interaction.guild.members.cache.get(interaction.customId.split("_")[1])
   var addRoles = config.whitelistRoles
   let data = interaction.message.embeds[0].fields
   
   let ooc = String(data[1].value).slice(3, String(data[1].value).length - 3)
   let ic = String(data[2].value).slice(3, String(data[2].value).length - 3)
   let yaş = String(data[3].value).slice(3, String(data[3].value).length - 3)
   let saat = String(data[4].value).slice(3, String(data[4].value).length - 3)
   let profil = String(data[5].value).slice(11, String(data[5].value).length - 1)
   
   let name = config.name.replace("-isim-", `${ic}`).replace("-ooc-", `${ooc}`).replace("-yaş-", `${yaş}`)
  
    await member.setNickname(name).catch(err => {});
    await member.roles.set(addRoles).catch(err => {});
    await interaction.message.edit({ content: "Kullanıcı whitelist Olarak Kaydedildi!", components: [new MessageActionRow({ components: interaction.message.components[0].components.map(x => x.setDisabled(true)) })] }).catch(err => {});
    
    await registerData.updateOne({ guildID: interaction.guild.id, userID: member.user.id },
      {
        $push: {
          registerNames: 
            {
              yetkili: interaction.user.id,
              tür: "♂️ whitelist",
              rol: "<@&" + addRoles.join(">, <@&") + ">",
              isim: name
            }
        }
      },
      { upsert: true }
    ).then(async () => {
       await registerData.updateOne(
         { guildID: interaction.guild.id, userID: member.user.id },
         { register: true },
         { upsert: true }
       );
      
       await registerData.updateOne({ guildID: interaction.guild.id, userID: member.user.id },
         {
           $set: {
             registerObject: {
               userID: member.user.id,
               staffID: interaction.user.id,
               time: Date.now(),
               type: "♂️ whitelist",
               roles: "<@&" + addRoles.join(">, <@&") + ">",
               name: name 
             }
             }
        },
        { upsert: true }
      );
    })
    
    await registerData
      .findOneAndUpdate(
        {
          guildID: interaction.guild.id,
          userID: interaction.user.id
        },
        { $inc: { whitelistRegisterNumber: 1 } },
        { upsert: true }
      )
      .then(async () => {
        await registerData.findOneAndUpdate(
          {
            guildID: interaction.guild.id,
            userID: interaction.user.id
          },
          { $set: { endRegisterUserID: member.user.id } },
          { upsert: true }
        );
    });
    
    let embed = new MessageEmbed()
      .setTitle("Kayıt sistemi")
      .setDescription(`> ${member.user} aramıza <@&${addRoles.join(">, <@&")}> rolleriyle katıldı.`)
      .setFooter({ text: "Kayıdı gerçekleştiren yetkili: " + interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setColor("64c4e1")
    
    bot.channels.cache.get(config.whitelist)?.send({ embeds: [embed], })
    
    interaction.followUp({
      content: `> ${emojiConfig.başarılı} **Başarılı!** Kullanıcı **whitelist** olarak sunucuda kaydedildi.`,
      ephemeral: true,
    });
  }
  
  if (interaction.customId.split("_")[0] === "lady") {
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (!config.staffRoles.some(x => interaction.member.roles.cache.has(x)))
        return interaction
          .reply({
            content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Yönetici** veya **Kayıt Yetkisi** rolüne sahip olman gerekiyor!`,
            ephemeral: true
          })
          .catch(err => {});
    }
  
    await interaction.deferReply({ ephemeral: true });  
    
   let member = interaction.guild.members.cache.get(interaction.customId.split("_")[1])
   var addRoles = config.ladyRoles
   let data = interaction.message.embeds[0].fields
   
   let ooc = String(data[1].value).slice(3, String(data[1].value).length - 3)
   let ic = String(data[2].value).slice(3, String(data[2].value).length - 3)
   let yaş = String(data[3].value).slice(3, String(data[3].value).length - 3)
   let saat = String(data[4].value).slice(3, String(data[4].value).length - 3)
   let profil = String(data[5].value).slice(11, String(data[5].value).length - 1)

   let name = config.name.replace("-isim-", `${ic}`).replace("-ooc-", `${ooc}`).replace("-yaş-", `${yaş}`)
   
    await member.setNickname(name).catch(err => {});
    await member.roles.set(addRoles).catch(err => {});
    await interaction.message.edit({ content: "Kullanıcı lady Olarak Kaydedildi!", components: [new MessageActionRow({ components: interaction.message.components[0].components.map(x => x.setDisabled(true)) })] }).catch(err => {});
    
    await registerData.updateOne({ guildID: interaction.guild.id, userID: member.user.id },
      {
        $push: {
          registerNames: [
            {
              yetkili: interaction.user.id,
              tür: "♂️ lady",
              rol: "<@&" + addRoles.join(">, <@&") + ">",
              isim: name
            }
          ]
        }
      },
      { upsert: true }
    ).then(async () => {
       await registerData.updateOne(
         { guildID: interaction.guild.id, userID: member.user.id },
         { register: true },
         { upsert: true }
       );
      
       await registerData.updateOne({ guildID: interaction.guild.id, userID: member.user.id },
         {
           $set: {
             registerObject: {
               userID: member.user.id,
               staffID: interaction.user.id,
               time: Date.now(),
               type: "♂️ lady",
               roles: "<@&" + addRoles.join(">, <@&") + ">",
               name: name 
             }
             }
        },
        { upsert: true }
      );
    })
    
    await registerData
      .findOneAndUpdate(
        {
          guildID: interaction.guild.id,
          userID: interaction.user.id
        },
        { $inc: { ladyRegisterNumber: 1 } },
        { upsert: true }
      )
      .then(async () => {
        await registerData.findOneAndUpdate(
          {
            guildID: interaction.guild.id,
            userID: interaction.user.id
          },
          { $set: { endRegisterUserID: member.user.id } },
          { upsert: true }
        );
    });

    let embed = new MessageEmbed()
      .setTitle("kayıt sistemi")
      .setDescription(`> ${member.user} aramıza <@&${addRoles.join(">, <@&")}> rolleriyle katıldı.`)
      .setFooter({ text: "Kayıdı gerçekleştiren yetkili: " + interaction.user.tag, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setColor("64c4e1")
    
    bot.channels.cache.get(config.ladyLog)?.send({ embeds: [embed], })
    
    interaction.followUp({
      content: `> ${emojiConfig.başarılı} **Başarılı!** Kullanıcı **lady** olarak sunucuda kaydedildi.`,
      ephemeral: true,
    });
  }
  
  if (interaction.customId.split("_")[0] === "reddet") {
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (!config.staffRoles.some(x => interaction.member.roles.cache.has(x)))
        return interaction
          .reply({
            content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Yönetici** veya **Kayıt Yetkisi** rolüne sahip olman gerekiyor!`,
            ephemeral: true
          })
          .catch(err => {});
    }
   
    await interaction.deferReply({ ephemeral: true });  
    
   let member = interaction.guild.members.cache.get(interaction.customId.split("_")[1])
   await interaction.message.edit({ content: "Kullanıcının Başvurusu Reddedildi!", components: [new MessageActionRow({ components: interaction.message.components[0].components.map(x => x.setDisabled(true)) })] }).catch(err => {});

   member.user.send({ content: `> ${emojiConfig.uyarı} **Dikkat!** Kayıt olmak için yaptığın başvuru **${interaction.guild.name}** sunucusunda reddedildi. Eksiklerinize çalışıp tekrar başvurun. **Red Sebebi:** \`Eksikleriniz var.\`` }).catch(err => {});
    
    interaction.followUp({
      content: `> ${emojiConfig.başarılı} **Başarılı!** Kullanıcının kayıt başvurusu reddedildi.`,
      ephemeral: true,
    });
  }
};
module.exports.conf = {
  name: "interactionCreate",
};
