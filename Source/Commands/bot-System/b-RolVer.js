const {
  MessageButton,
  MessageSelectMenu,
  MessageActionRow,
  Permissions,
} = require("discord.js");
const emojiConfig = require("../../Configs/emojiConfig");
const { prefixs } = require("../../Configs/botConfig");


module.exports.run = async (bot, message, args) => {
  const prefix = prefixs[0];

  if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
    if (!message.member.roles.cache.has("982277578679255124"))
      return message.reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Bu komutu kullanman için **Rolleri Yönet** yada **Role Hammer** rolüne sahip olman gerekiyor!`,
        allowedMentions: { repliedUser: false },
      });
  }

  let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  let roles = [...message.guild.roles.cache.values()];

  if (!user)
    return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız** Bir üye etiketlemelisin veya ID yazmalısın`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  var rol =
    roles
      .filter((rol) => rol.managed !== true)
      .filter((rol) => rol.name !== "@everyone")
      .find((x) =>
        x.name.toLowerCase().includes(args.slice(1).join(" ").toLowerCase())
      ) ||
    message.mentions.roles.first() ||
    message.guild.roles.cache.get(args.slice(1).join(" "));

  if (!args.slice(1).join(" "))
    return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Lütfen bir rol ismi belirtin.`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  if (!rol)
    return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** **[** \`${args
          .slice(1)
          .join(" ")
          .replace("@", "")}\` **]** rolünü bulamıyorum.`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  if (message.guild.ownerId !== message.author.id) {
    if (rol.position >= message.member.roles.highest.position)
      return message
        .reply({
          content: `> ${emojiConfig.başarısız} **Başarısız!** Kullanıyıca rolü veremem. Bu kullanıcı senin üstünde.`,
          allowedMentions: { repliedUser: false },
        })
        .catch((err) => {});
  }

  if (rol.position >= message.guild.me.roles.highest.position)
    return message
      .reply({
        content: `> ${emojiConfig.başarısız} **Başarısız!** Kullanıyıca rolü veremiyorum. Belirttiğiniz Rol benim üstümde.`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});

  if (user.roles.cache.has(rol.id)) {
    message
      .reply({
        content: `> ❌ **Hata!** Belirtilen rol zaten kullanıcının üstünde.`,
        allowedMentions: { repliedUser: false },
      })
      .catch((err) => {});
  } else {
    user.roles
      .add(rol.id)
      .then((m) => {
        message.reply({
          content: `> ✅ **Başarılı!** Kullanıcıya ** ** \`${rol.name}\` ** ** adlı rol verildi.`,
          allowedMentions: { repliedUser: false },
        });
      })
      .catch((er) =>
        message
          .reply({
            content: `> ⚠️ **Hata!** Kullanıcıya rol verirken bir hata oluştu.\n \`\`\`${er}\`\`\``,
            allowedMentions: { repliedUser: false },
          })
          .catch((err) => {})
      );
  }
};

module.exports.conf = {
  name: "ver",
  aliases: ["rol-ver", "rolver"],
};
