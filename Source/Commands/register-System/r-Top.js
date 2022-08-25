const {
  MessageEmbed,
  MessageButton,
  MessageSelectMenu,
  MessageActionRow,
  Permissions
} = require("discord.js");
const registerData = require("../../Models/registerData");
const { prefixs } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");

module.exports.run = async (bot, message, args) => {
  const prefix = prefixs[0];

  const backId = "topBack";
  const forwardId = "topForward";
  const closeBackId = "topCloseBack";
  const closeForwardId = "topCloseForward";
  const deleteButtonId = "deleteButton"

  const backButton = new MessageButton({
    style: "PRIMARY",
    emoji: "928282903694163988",
    customId: backId
  });
  const forwardButton = new MessageButton({
    style: "PRIMARY",
    emoji: "928282844491575296",
    customId: forwardId
  });

  const closeBackButton = new MessageButton({
    style: "PRIMARY",
    emoji: "928282903694163988",
    customId: closeBackId,
    disabled: true
  });
  const closeForwardButton = new MessageButton({
    style: "PRIMARY",
    emoji: "928282844491575296",
    customId: closeForwardId,
    disabled: true
  });

  const deleteButton = new MessageButton({
    style: "DANGER",
    emoji: "928282667273826355",
    customId: deleteButtonId
  });

  const sortData = await registerData
    .find({ guildID: message.guild.id })

  const data = await sortData
      .filter(x => (x.whitelistRegisterNumber || 0) + (x.cadıRegisterNumber || 0) > 0)
      .sort((a, b) => (b.whitelistRegisterNumber || 0) + (b.cadıRegisterNumber || 0) - (a.whitelistRegisterNumber || 0) + (a.ladyRegisterNumber || 0));

   if(!data.join(" ")) return message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Kimsenin bu sunucuda kayıt verisi yok.`, allowedMentions: { repliedUser: false } }).catch((err) => {})

  let kaçtane = 10;
  let page = 1;

  let a = data.length / kaçtane;
  let toplam = Math.ceil(a)

  const generateEmbed = async start => {
    const current = await data
      .slice(start, start + kaçtane)
      .filter(x => (x.whitelistRegisterNumber || 0) + (x.ladyRegisterNumber || 0) > 0)
      .sort((a, b) => (b.whitelistRegisterNumber || 0) + (b.ladyRegisterNumber || 0) - (a.whitelistRegisterNumber || 0) + (a.ladyRegisterNumber || 0));

    let sayı = page === 1 ? 1 : page * kaçtane - kaçtane + 1;

    return new MessageEmbed()
      .setTitle(`Davet Sıralaması`)
      .setFooter({ text: `Sayfa ${page} / ${toplam}` })
      .setDescription(`> Bu sunucuda toplam **${data.length}** yetkilinin bilgisi var.`,)
      .addField("Sıralama ↷", (await Promise.all(
          current.map(async x => {
            return `> **${sayı++}.** ${bot.users.cache.get(x.userID) ? `<@!${bot.users.cache.get(x.userID).id}>` : `<@!${x.userID}>`} ↷
 Toplam **${(x.whitelistRegisterNumber || 0) + (x.whitelistRegisterNumber || 0)}** kişi kaydetmiş **${x.whitelistRegisterNumber}** whitelist, **${x.ladyRegisterNumber}** lady.`;
          })
        ))
          .join("\n\n")
          .toString())
      .setColor("BLUE");
  };

  const canFitOnOnePage = data.length <= kaçtane;
  const embedMessage = await message.channel
    .send({
      content: `${emojiConfig.tosun} Register Top`,
      embeds: [await generateEmbed(0)],
      components: canFitOnOnePage
        ? [new MessageActionRow({ components: [closeBackButton, deleteButton, closeForwardButton] })]
        : [new MessageActionRow({ components: [closeBackButton, deleteButton, forwardButton] })]
    })
    .catch(e => {});

  if (canFitOnOnePage) return;

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user }) => user.id === message.author.id,
    time: 600000
  });

  let currentIndex = 0;
  collector.on("collect", async interaction => {
    if (interaction.customId === deleteButtonId) return interaction.message.delete()
    if (interaction.customId === backId) {
      page--;
    }
    if (interaction.customId === forwardId) {
      page++;
    }

    interaction.customId === backId
      ? (currentIndex -= kaçtane)
      : (currentIndex += kaçtane);

    await interaction
      .update({
        content: `${emojiConfig.tosun} Register Top`,
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [
            ...(currentIndex ? [backButton] : [closeBackButton]), deleteButton,
            ...(currentIndex + kaçtane < data.length ? [forwardButton] : [closeForwardButton])]
           })
        ]
      })
      .catch(e => {});
  });
};

module.exports.conf = {
  name: "top",
  aliases: ["sıralama"]
};