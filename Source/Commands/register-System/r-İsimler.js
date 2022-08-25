const {
  Permissions,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");
const { prefixs } = require("../../Configs/botConfig");
const emojiConfig = require("../../Configs/emojiConfig");
const config = require("../../Configs/serverConfig");
const registerData = require("../../Models/registerData");

module.exports.run = async (bot, message, args) => {

  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    if (!config.staffRoles.some(x => message.member.roles.cache.has(x)))
      return message
        .reply({
          content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Yönetici** veya **Kayıt Yetkisi** rolüne sahip olman gerekiyor!`,
          allowedMentions: { repliedUser: false }
        })
        .catch(err => {});
  }

  var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

  if (!member)
    return message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Bir üye belirtmelisin!`, allowedMentions: { repliedUser: false }});

  let memberData = await registerData.findOne({
    guildID: message.guild.id,
    userID: member.id
  });

  let data = memberData ? memberData.registerNames.map(x => x.isim) || [] : []

  if (!data.join(" ")) return message.reply({ content: `> ${emojiConfig.başarısız} **Başarısız!** Bu üyenin kayıt geçmişi bulunamadı.`, allowedMentions: { repliedUser: false }});

  const backId = "namesTopBack";
  const forwardId = "namesTopForward";
  const closeBackId = "namesTopCloseBack";
  const closeForwardId = "namesTopCloseForward";
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

  const davets = memberData.registerNames;

  let kaçtane = 10;
  let page = 1;

  let a = davets.length / kaçtane;
  let toplam = Math.ceil(a)

  const generateEmbed = async start => {
    let sayı = page === 1 ? 1 : page * kaçtane - kaçtane + 1;
    const current = await davets.slice(start, start + kaçtane);

    return new MessageEmbed()
      .setTitle(`[ ${member.user.username} ] Kayıt Geçmişi`)
      .setFooter(`Page ${page} / ${toplam}`)
      .setDescription(`> Toplam **${davets.length}** Kayıt Geçmişi Bulundu.`)
      .addField("Kayıtlar ↷", (await Promise.all(current.map(async x => `${sayı++}- \`${x.isim}\` ( **${x.rol}** )`)
        ))
          .join("\n")
          .toString())
      .setColor("BLUE");
  };

  const canFitOnOnePage = davets.length <= kaçtane;
  const embedMessage = await message.channel.send({
    content: `[ ${member.user.username} ] Kayıt Geçmişi`,
    embeds: [await generateEmbed(0)],
    components: canFitOnOnePage
        ? [new MessageActionRow({ components: [closeBackButton, deleteButton, closeForwardButton] })]
        : [new MessageActionRow({ components: [closeBackButton, deleteButton, forwardButton] })]
  })
  .catch(e => {});

  const collector = embedMessage.createMessageComponentCollector({
    filter: ({ user }) => user.id === message.author.id,
    time: 600000
  });

  let currentIndex = 0;
  collector.on("collect", async interaction => {
    if (interaction.customId === deleteButtonId) {
      interaction.message.delete().catch(e => {});
    }
      if (canFitOnOnePage) return;
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
        content: `[ ${member.user.username} ] Kayıt Geçmişi`,
        embeds: [await generateEmbed(currentIndex)],
        components: [
          new MessageActionRow({
            components: [...(currentIndex ? [backButton] : [closeBackButton]), deleteButton ,...(currentIndex + kaçtane < davets.length ? [forwardButton] : [closeForwardButton])
            ]
          })
        ]
      })
      .catch(e => {});
  });
};

module.exports.conf = {
  name: "isimler",
  aliases: [
    "isimleri",
    "eskikayıt",
    "names",
    "oldnames",
    "old-names",
    "eski-isimleri"
  ]
};
