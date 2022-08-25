const { joinVoiceChannel } = require("@discordjs/voice");
const { playing } = require("../Configs/botConfig");
const config = require("../Configs/serverConfig");
const Gamedig = require("gamedig");
const bot = global.client;

module.exports = async () => {
  Gamedig.query({
    type: "garrysmod",
    host: "51.77.77.237",
    port: 27015
  })
    .then(async (x) => {
      bot.user.setPresence({
        activities: [{ name: `${x.players.length}/${x.maxplayers}` }],
        status: "dnd",
      });
    })
    .catch((e) => {
      bot.user.setPresence({
        activities: [{ name: `0/0` }],
        status: "dnd",
      });
    });

  setInterval(async () => {
    Gamedig.query({
      type: "garrysmod",
      host: "51.77.77.237",
      port: 27015
    })
      .then(async (x) => {
        bot.user.setPresence({
          activities: [{ name: `${x.players.length}/${x.maxplayers}` }],
          status: "dnd",
        });
      })
      .catch((e) => {
        bot.user.setPresence({
          activities: [{ name: `0/0` }],
          status: "dnd",
        });
      });
  }, 300000);

  var channel = bot.channels.cache.get(config.voiceChannelID);
  if (!channel) return;
  
  await joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator, });
  setInterval(async () => await joinVoiceChannel({ channelId: channel.id, guildId: channel.guild.id, adapterCreator: channel.guild.voiceAdapterCreator, }), 3600000);
};
module.exports.conf = {
  name: "ready",
};
